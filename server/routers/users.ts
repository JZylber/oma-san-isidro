import { z } from "zod";
import { prisma } from "../db";
import { protectedProcedure, router } from "../trpc";

export const userRouter = router({
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
