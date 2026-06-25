import { z } from "zod";
import bcrypt from "bcryptjs";
import { prisma } from "../db";
import { protectedProcedure, publicProcedure, router } from "../trpc";
import login from "utils/login";
import { TRPCError } from "@trpc/server";
import { ROLE } from "server/types";

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
      if (user) return { user };
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
      setHTTPOnlyCookie("accessToken", response.accessToken!, 60);
      await prisma.usuario.update({
        where: { id_usuario: response.usuario!.id },
        data: { token: refreshToken },
      });
      return { user: response.usuario! };
    }),

  logoutUser: protectedProcedure.mutation(async ({ ctx }) => {
    const { user, setHTTPOnlyCookie } = ctx;
    setHTTPOnlyCookie("refreshToken", "", 0);
    setHTTPOnlyCookie("accessToken", "", 0);
    await prisma.usuario.update({
      where: { id_usuario: user.id },
      data: { token: "" },
    });
    return true;
  }),

  getSession: publicProcedure.query(({ ctx }) => ctx.user ?? null),

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
    .mutation(async ({ input }) => {
      const hashedPassword = await bcrypt.hash(input.password, 10);
      const user = await prisma.usuario.create({
        data: {
          nombre: input.nombre,
          apellido: input.apellido,
          email: input.email,
          password: hashedPassword,
        },
      });
      return user;
    }),

  updateUser: protectedProcedure
    .input(
      z.object({
        id_usuario: z.number(),
        nombre: z.string(),
        apellido: z.string(),
        email: z.string(),
        password: z.string(),
        rol: ROLE,
      })
    )
    .mutation(async ({ input }) => {
      const { id_usuario, nombre, apellido, email, password, rol } = input;
      const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;
      const user = await prisma.usuario.update({
        where: { id_usuario },
        data: {
          nombre,
          apellido,
          email,
          rol,
          ...(hashedPassword && { password: hashedPassword }),
        },
      });
      return user;
    }),

  getUserCredentials: protectedProcedure.query(async ({ ctx }) => {
    return ctx.user;
  }),
});
