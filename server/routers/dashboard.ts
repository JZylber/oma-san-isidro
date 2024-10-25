import { protectedProcedure, router } from "../trpc";
import { z } from "zod";
import { INSTANCE } from "../types";
import {
  createResults,
  deleteResult,
  getParticipants,
  getPassingParticipants,
  getPreviousInstance,
  getProvincialParticipants,
  getResults,
  modifyResult,
  newResult,
  Participant,
  updateResults,
} from "./results/results_db_calls";
import { INSTANCIA } from "@prisma/client";
import { create } from "domain";

const getEditableResults = async (
  competencia: string,
  año: number,
  instancia: INSTANCIA
) => {
  const prevInstance = getPreviousInstance(competencia, instancia) as INSTANCIA;
  let participants: Participant[];
  if (prevInstance)
    participants = await getPassingParticipants(competencia, año, prevInstance);
  if (
    !prevInstance &&
    (instancia === "INTERCOLEGIAL" || instancia === "INTERESCOLAR")
  ) {
    participants = await getParticipants(competencia, año);
  }
  if (!prevInstance && instancia === "PROVINCIAL") {
    participants = await getProvincialParticipants(competencia, año);
  }
  const results = await getResults(competencia, año, instancia);
  const participantsWithResults = participants!.map((participant) => {
    const result = results.find(
      (result) =>
        result.participacion.id_participacion === participant.id_participacion
    );
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
  });
  return participantsWithResults;
};

export type EditableResult = Awaited<ReturnType<typeof getEditableResults>>[0];

export const dashboardRouter = router({
  getResults: protectedProcedure
    .input(
      z.object({
        año: z.number(),
        instancia: INSTANCE,
        competencia: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { año, instancia, competencia } = input;
      return getEditableResults(competencia, año, instancia);
    }),
  editResult: protectedProcedure
    .input(
      z.object({
        id_rinde: z.number(),
        puntaje: z.array(z.string()),
        aprobado: z.boolean(),
        presente: z.boolean(),
        aclaracion: z.string().nullable(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id_rinde, puntaje, aprobado, presente, aclaracion } = input;
      return await modifyResult(
        id_rinde,
        puntaje,
        aprobado,
        presente,
        aclaracion
      );
    }),
  newResult: protectedProcedure
    .input(
      z.object({
        id_participacion: z.number(),
        id_prueba: z.number(),
        puntaje: z.array(z.string()),
        aprobado: z.boolean(),
        presente: z.boolean(),
        aclaracion: z.string().nullable(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const {
        id_participacion,
        id_prueba,
        puntaje,
        aprobado,
        presente,
        aclaracion,
      } = input;
      return await newResult(
        id_participacion,
        id_prueba,
        puntaje,
        aprobado,
        presente,
        aclaracion
      );
    }),
  deleteResult: protectedProcedure
    .input(z.number())
    .mutation(async ({ ctx, input }) => {
      return await deleteResult(input);
    }),
  updateResults: protectedProcedure
    .input(
      z.object({
        id_prueba: z.number(),
        Results2Update: z.array(
          z.object({
            id_rinde: z.number(),
            resultados: z.array(z.string()),
            aprobado: z.boolean(),
            presente: z.boolean(),
            aclaracion: z.string().nullable(),
          })
        ),
        Results2Add: z.array(
          z.object({
            dni: z.number(),
            resultados: z.array(z.string()),
            aprobado: z.boolean(),
            presente: z.boolean(),
            aclaracion: z.string().nullable(),
          })
        ),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id_prueba, Results2Update, Results2Add } = input;
      const updatePromise = updateResults(Results2Update);
      const addPromise = createResults(Results2Add, id_prueba);
      await Promise.all([updatePromise, addPromise]);
    }),
});
