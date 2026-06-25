import { router, publicProcedure } from '../trpc';
import { z } from 'zod';
import { prisma } from '../db';

export const problemsRouter = router({
  getProblems: publicProcedure
    .input(z.object({ competencia: z.enum(['OMA', 'ÑANDÚ']) }))
    .query(async ({ input }) => {
      return prisma.problema.findMany({
        where: { Prueba: { competencia: { tipo: input.competencia } } },
        orderBy: [
          { Prueba: { competencia: { ano: 'desc' } } },
          { Prueba: { instancia: 'asc' } },
          { nivel: 'asc' },
        ],
        select: {
          id_problema: true,
          nivel: true,
          link: true,
          links_foro: true,
          Prueba: {
            select: {
              instancia: true,
              fecha: true,
              competencia: { select: { ano: true } },
            },
          },
        },
      });
    }),
});
