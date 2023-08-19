import { router, publicProcedure } from '../trpc';
import { z } from 'zod';
import { INSTANCIA } from "@prisma/client";
import { prisma } from '../db';

const INSTANCE = z.nativeEnum(INSTANCIA);

export const resultRouter = router({
    getResults: publicProcedure
        .input(z.object({
            año: z.number(),
            instancia: INSTANCE,
            competencia: z.string(),
        }),
        )
        .query(async ({input}) => {
            const {año,instancia,competencia} = input;
            const results = await prisma.rinde.findMany(
                {   
                    where : {
                            prueba : {
                                AND : [
                                    {instancia : instancia},
                                    {competencia : {
                                        AND : [
                                            {ano : año},
                                            {tipo: competencia},
                                    ]}},
                                ],
                            },
                    },
                    orderBy: [
                        {participacion:{
                            nivel: 'asc'
                            }
                        },
                        {participacion:{
                            participante: {
                                apellido: 'asc'
                            }}
                        }
                    ],
                    select : {
                        prueba: {
                            select : {
                                cantidad_problemas: true,
                            }
                        },
                        presente: true,
                        aprobado: true,
                        aclaracion: true,
                        resultados: true,
                        participacion : {
                            select : {
                                nivel: true,
                                colegio : {
                                    select : {
                                        nombre: true,
                                        sede: true,
                                    }
                                },
                                participante : {
                                    select: {
                                        nombre: true,
                                        apellido: true
                                    }
                                }
                            }
                        }
                    },
                })
            const cleanedResults = results.map((result) => {
                return {
                    ...result,
                    aclaracion: result.aclaracion ? result.aclaracion : undefined,
                    resultados: result.resultados as string[],
                    participacion: {
                        ...result.participacion,
                        colegio: {
                            ...result.participacion.colegio,
                            sede: result.participacion.colegio.sede ? result.participacion.colegio.sede : "",
                        }
                    }
                }
            })
            return cleanedResults;
          }),
});