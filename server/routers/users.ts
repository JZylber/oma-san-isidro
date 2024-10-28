import { z } from "zod";
import { prisma } from "../db";
import { protectedProcedure, publicProcedure, router } from "../trpc";
import login from "utils/login";
import { TRPCError } from "@trpc/server";
import { User } from "contexts/UserContext";

export const userRouter = router({
  loginUser: publicProcedure
    .input(
      z
        .object({
          email: z.string(),
          password: z.string(),
        })
        .optional()
    )
    .mutation(async ({ ctx, input }) => {
      const { user, setHTTPOnlyCookie } = ctx;
      if (user) return { token: "", user: user };
      if (!input) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Email y contraseña son requeridos",
        });
      }
      const { email, password } = input;
      const response = await login(email, password);
      if (!response.success) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: response.statusText,
        });
      }
      const refreshToken = response.refreshToken!;
      setHTTPOnlyCookie("refreshToken", refreshToken);
      await prisma.usuario.update({
        where: { id_usuario: response.usuario!.id },
        data: { token: refreshToken },
      });
      return { token: response.accessToken, user: response.usuario! };
    }),
  logoutUser: protectedProcedure.mutation(async ({ ctx }) => {
    const { user, setHTTPOnlyCookie } = ctx;
    if (!user) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "No hay usuario logueado",
      });
    }
    setHTTPOnlyCookie("refreshToken", "");
    await prisma.usuario.update({
      where: { id_usuario: user.id },
      data: { token: "" },
    });
    return true;
  }),

  getUsers: protectedProcedure.query(async () => {
    return prisma.usuario.findMany({
      select: {
        id_usuario: true,
        nombre: true,
        apellido: true,
        email: true,
        rol: true,
      },
    });
  }),
  registerUser: protectedProcedure
    .input(
      z.object({
        nombre: z.string(),
        apellido: z.string(),
        email: z.string(),
        password: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const user = await prisma.usuario.create({
        data: {
          nombre: input.nombre,
          apellido: input.apellido,
          email: input.email,
          password: input.password,
        },
      });
      return user;
    }),
  getUserCredentials: protectedProcedure.query(async ({ ctx }) => {
    return ctx.user;
  }),
});
