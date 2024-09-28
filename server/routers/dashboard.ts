import { protectedProcedure, router } from "../trpc";
import { z } from 'zod';
import { INSTANCE } from "../types";
import { getPreviousInstance, getResults, passingParticipants } from "./results/results_db_calls";
import { INSTANCIA } from "@prisma/client";

export const dashboardRouter = router({
    getResults: protectedProcedure.input(z.object({
        año: z.number(),
        instancia: INSTANCE,
        competencia: z.string(),
    }),
    ).query(async ({ctx,input}) => {
        const { año, instancia, competencia } = input;
        const prevInstance = getPreviousInstance(competencia,instancia) as INSTANCIA;
        const participants = await passingParticipants(competencia,año,prevInstance);
        const results = await getResults(competencia,año,instancia);
        const participantsWithResults = participants.map(participant => {
            const result = results.find(result => result.participacion.id_participacion === participant.id_participacion);
            if (result) {
                return {
                    ...participant,
                    resultados: {
                        puntaje: result.resultados as string[],
                        aprobado: result.aprobado,
                        presente: result.presente,
                        aclaracion: result.aclaracion,
                    }
                };
            } else {
                return {
                    ...participant,
                    resultados: null,
                };
            }
        })
        return participantsWithResults;
    }),
});