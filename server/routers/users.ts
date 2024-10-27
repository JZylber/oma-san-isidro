import { z } from "zod";
import { prisma } from "../db";
import { protectedProcedure, publicProcedure, router } from "../trpc";
import login from "utils/login";
import { TRPCError } from "@trpc/server";

export const userRouter = router({
  loginUser: publicProcedure
    .input(z.object({ email: z.string().min(1), password: z.string().min(1) }))
    .mutation(async ({ input }) => {
      const { email, password } = input;
      const status = await login(email, password);
      if (!status.success) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: status.statusText,
        });
      }
      return { token: status.token, user: status.usuario };
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
