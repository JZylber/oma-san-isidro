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
      },
    });
  }),
  getUserCredentials: protectedProcedure.query(async ({ ctx }) => {
    return ctx.user;
  }),
});
