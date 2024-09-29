import { protectedProcedure, router } from "../trpc";
import { z } from 'zod';
import { INSTANCE } from "../types";
import { deleteResult, getPreviousInstance, getResults, modifyResult, newResult, passingParticipants } from "./results/results_db_calls";
import { INSTANCIA } from "@prisma/client";

const getEditableResults = async (competencia: string, año: number, instancia: INSTANCIA) => {
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
                    },
                    id_rinde: result.id_rinde,
                };
            } else {
                return {
                    ...participant,
                    resultados: null,
                    id_rinde: null,
                };
            }
        })
        return participantsWithResults;
}

export type EditableResult =  Awaited<ReturnType<typeof getEditableResults>>[0];


export const dashboardRouter = router({
    getResults: protectedProcedure.input(z.object({
        año: z.number(),
        instancia: INSTANCE,
        competencia: z.string(),
    }),
    ).query(async ({ctx,input}) => {
        const {año, instancia, competencia} = input;
        return getEditableResults(competencia,año,instancia);
}),
    editResult: protectedProcedure.input(z.object({
        id_rinde: z.number(),
        puntaje: z.array(z.string()),
        aprobado: z.boolean(),
        presente: z.boolean(),
        aclaracion: z.string().nullable(),
    })).mutation(async ({ctx,input}) => {
        const {id_rinde, puntaje, aprobado, presente, aclaracion} = input;
        return await modifyResult(id_rinde, puntaje, aprobado, presente, aclaracion);
    }),
    newResult: protectedProcedure.input(z.object({
        id_participacion: z.number(),
        id_prueba: z.number(),
        puntaje: z.array(z.string()),
        aprobado: z.boolean(),
        presente: z.boolean(),
        aclaracion: z.string().nullable(),
    })).mutation(async ({ctx,input}) => {
        const {id_participacion, id_prueba, puntaje, aprobado, presente, aclaracion} = input;
        return await newResult(id_participacion, id_prueba, puntaje, aprobado, presente, aclaracion);
    }),
    deleteResult: protectedProcedure.input(z.number()).mutation(async ({ctx,input}) => {
        return await deleteResult(input);
    }),
});