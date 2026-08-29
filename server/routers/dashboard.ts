import { protectedProcedure, publicProcedure, router } from "../trpc";
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
  setShowResults,
  updateResults,
} from "./results/results_db_calls";
import { INSTANCIA, Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { revalidateTag } from "next/cache";
import { prisma } from "server/db";
import { describeTestDependencies } from "utils/testDependencies";
import {
  describeParticipationDependencies,
  mergeParticipationDependencies,
} from "utils/participantDependencies";
import { describeSchoolDependencies } from "utils/schoolDependencies";
import { CRITERION_TYPES, LEVELS } from "./results/qualification";

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

// Todo lo que apunta a una Prueba. Se pide junto con la prueba para poder
// avisar en el dashboard, antes de intentar el borrado, qué lo bloquea.
const TEST_COUNTS = {
  rinden: true,
  problemas: true,
  sedeinstancia: true,
  puntoinstancia: true,
  inhabilitados: true,
} as const;

const TEST = z.object({
  // -1 significa "prueba nueva": el where del upsert no matchea y Prisma crea.
  id_prueba: z.number(),
  fecha: z.date(),
  instancia: INSTANCE,
  id_competencia: z.number(),
  // Hay pruebas cargadas en cero, para instancias cuyo temario todavía no se
  // definió; el formulario tiene que poder editarlas sin tocar ese valor.
  cantidad_problemas: z.number().int().min(0),
  fecha_limite_autorizacion: z.date().nullable(),
  resultados_disponibles: z.boolean(),
  hora_ingreso: z.date(),
  duracion: z.number().int().min(1),
  criterio_habilitacion: z
    .array(
      z.object({
        tipo: z.enum(CRITERION_TYPES),
        puntos: z.number().int().min(0),
      })
    )
    .nullable(),
});

// Todo lo que apunta a una Participacion. Mismo criterio que TEST_COUNTS: se
// pide junto con la fila para poder avisar qué bloquea el borrado.
const PARTICIPATION_COUNTS = {
  rinde: true,
  inhabilitaciones: true,
  ParticipacionSedeInstancia: true,
} as const;

const PARTICIPANT = z.object({
  // -1 significa "participante nuevo": el where del upsert no matchea y Prisma
  // crea. Lo mismo para id_participacion.
  id_participante: z.number(),
  dni: z.number().int().positive(),
  nombre: z.string().trim().min(1),
  apellido: z.string().trim().min(1),
  email: z.string().trim().email().nullable(),
  ano: z.number().int(),
  participacion: z.object({
    id_participacion: z.number(),
    id_competencia: z.number(),
    id_colegio: z.number(),
    nivel: z.number().int().min(1).max(LEVELS),
  }),
});

// Todo lo que apunta a un Colegio. Mismo criterio que TEST_COUNTS: se pide
// junto con la fila para poder avisar qué bloquea el borrado.
const SCHOOL_COUNTS = {
  participaciones: true,
  sede_instancia: true,
} as const;

// Participacion.id_colegio tiene @default(1): el colegio 1 es el destino de
// cualquier participación que se cree sin colegio explícito, así que borrarlo
// dejaría esas altas apuntando a una fila inexistente.
const DEFAULT_SCHOOL_ID = 1;

const SCHOOL = z.object({
  // -1 significa "colegio nuevo": el where del upsert no matchea y Prisma crea.
  id_colegio: z.number(),
  nombre: z.string().trim().min(1),
  sede: z.string().trim().min(1).nullable(),
  localidad: z.string().trim().min(1).nullable(),
  acr_nimo: z.string().trim().min(1),
});

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
            id_participacion: z.number(),
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
      const [update, add] = await Promise.all([updatePromise, addPromise]);
      return { update, add };
    }),
  showResults: protectedProcedure
    .input(z.object({ show: z.boolean(), id_prueba: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const setResults = await setShowResults(input.show, input.id_prueba);
      revalidateTag("results");
      return setResults;
    }),
  getNews: publicProcedure.query(async ({ ctx }) => {
    const query = await prisma.noticias.findMany({
      orderBy: [{ agregado: "desc" }],
      select: {
        id_noticia: true,
        titulo: true,
        link: true,
        visible: true,
        agregado: true,
      },
    });
    return query;
  }),
  setNews: protectedProcedure
    .input(
      z.object({
        id_noticia: z.number(),
        titulo: z.string(),
        link: z.string(),
        visible: z.boolean(),
        agregado: z.date(),
      })
    )
    .mutation(async ({ input }) => {
      const { id_noticia, titulo, link, visible, agregado } = input;
      const query = await prisma.noticias.upsert({
        where: { id_noticia },
        update: { titulo, link, visible, agregado },
        create: { titulo, link, visible, agregado },
      });
      revalidateTag("news");
      return query;
    }),
  deleteNews: protectedProcedure
    .input(z.number())
    .mutation(async ({ input }) => {
      const query = await prisma.noticias.delete({
        where: { id_noticia: input },
      });
      revalidateTag("news");
      return query;
    }),
  getDates: publicProcedure.input(z.number()).query(async ({ input }) => {
    const year = input;
    const query = await prisma.fechas.findMany({
      orderBy: [{ fecha_inicio: "asc" }],
      where: {
        fecha_inicio: {
          gte: new Date(year, 0, 1),
        },
      },
    });
    return query;
  }),
  setDate: protectedProcedure
    .input(
      z.object({
        id_fecha: z.number(),
        fecha_inicio: z.date(),
        fecha_fin: z.date().nullable(),
        texto: z.string(),
        tipo: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { id_fecha, fecha_inicio, fecha_fin, texto, tipo } = input;
      const query = await prisma.fechas.upsert({
        where: { id_fecha },
        update: { fecha_inicio, fecha_fin, texto, tipo },
        create: { fecha_inicio, fecha_fin, texto, tipo },
      });
      revalidateTag("dates");
      return query;
    }),
  deleteDate: protectedProcedure
    .input(z.number())
    .mutation(async ({ input }) => {
      const query = await prisma.fechas.delete({
        where: { id_fecha: input },
      });
      revalidateTag("dates");
      return query;
    }),
  revalidate: protectedProcedure
    .input(
      z.object({
        type: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      revalidateTag(input.type);
    }),
  getTests: protectedProcedure.query(async ({ ctx }) => {
    const query = await prisma.prueba.findMany({
      orderBy: [{ fecha: "desc" }],
      select: {
        id_prueba: true,
        fecha: true,
        instancia: true,
        id_competencia: true,
        competencia: {
          select: { ano: true, tipo: true },
        },
        cantidad_problemas: true,
        fecha_limite_autorizacion: true,
        resultados_disponibles: true,
        hora_ingreso: true,
        duracion: true,
        criterio_habilitacion: true,
        _count: { select: TEST_COUNTS },
      },
    });
    return query;
  }),
  getCompetitions: protectedProcedure.query(async ({ ctx }) => {
    const query = await prisma.competencia.findMany({
      orderBy: [{ ano: "desc" }, { tipo: "asc" }],
      select: {
        id_competencia: true,
        numero: true,
        ano: true,
        tipo: true,
      },
    });
    return query;
  }),
  setTest: protectedProcedure.input(TEST).mutation(async ({ input }) => {
    const { id_prueba, criterio_habilitacion, ...fields } = input;
    // No hay unique en (id_competencia, instancia) pero todos los lectores
    // usan findFirst, así que una prueba repetida taparía a la otra en
    // silencio.
    const duplicate = await prisma.prueba.findFirst({
      where: {
        id_competencia: fields.id_competencia,
        instancia: fields.instancia,
        NOT: { id_prueba },
      },
      select: { id_prueba: true },
    });
    if (duplicate) {
      throw new TRPCError({
        code: "CONFLICT",
        message: "Ya existe una prueba de esa instancia para esa competencia.",
      });
    }
    const data = {
      ...fields,
      // En un campo Json? de Prisma un null pelado significa "no tocar"; para
      // guardar NULL hay que pasar DbNull.
      criterio_habilitacion: criterio_habilitacion
        ? (criterio_habilitacion as Prisma.InputJsonValue)
        : Prisma.DbNull,
    };
    const query = await prisma.prueba.upsert({
      where: { id_prueba },
      update: data,
      create: data,
    });
    revalidateTag("results");
    return query;
  }),
  deleteTest: protectedProcedure
    .input(z.number())
    .mutation(async ({ input }) => {
      const prueba = await prisma.prueba.findUnique({
        where: { id_prueba: input },
        select: { _count: { select: TEST_COUNTS } },
      });
      if (!prueba) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "La prueba no existe.",
        });
      }
      const blockers = describeTestDependencies(prueba._count);
      if (blockers) {
        throw new TRPCError({
          code: "PRECONDITION_FAILED",
          message: `No se puede eliminar: la prueba tiene ${blockers}.`,
        });
      }
      const query = await prisma.prueba.delete({
        where: { id_prueba: input },
      });
      revalidateTag("results");
      return query;
    }),
  getParticipations: protectedProcedure
    .input(z.number())
    .query(async ({ input }) => {
      const query = await prisma.participacion.findMany({
        where: { competencia: { ano: input } },
        orderBy: [
          { participante: { apellido: "asc" } },
          { participante: { nombre: "asc" } },
        ],
        select: {
          id_participacion: true,
          nivel: true,
          id_colegio: true,
          id_competencia: true,
          participante: {
            select: {
              id_participante: true,
              dni: true,
              nombre: true,
              apellido: true,
              email: true,
            },
          },
          colegio: { select: { nombre: true, sede: true } },
          competencia: { select: { tipo: true, ano: true } },
          _count: { select: PARTICIPATION_COUNTS },
        },
      });
      return query;
    }),
  getSchools: protectedProcedure.query(async () => {
    const query = await prisma.colegio.findMany({
      orderBy: [{ nombre: "asc" }, { sede: "asc" }],
      select: {
        id_colegio: true,
        nombre: true,
        sede: true,
        localidad: true,
        acr_nimo: true,
        _count: { select: SCHOOL_COUNTS },
      },
    });
    return query;
  }),
  setSchool: protectedProcedure.input(SCHOOL).mutation(async ({ input }) => {
    const { id_colegio, ...fields } = input;
    // acrónimo es @unique en la base; se pre-chequea para devolver un mensaje
    // en castellano en vez del P2002 pelado de Prisma.
    const sameAcronym = await prisma.colegio.findFirst({
      where: { acr_nimo: fields.acr_nimo, NOT: { id_colegio } },
      select: { id_colegio: true },
    });
    if (sameAcronym) {
      throw new TRPCError({
        code: "CONFLICT",
        message: "Ya existe un colegio con ese acrónimo.",
      });
    }
    // No hay unique en (nombre, sede), pero getInstanceVenues cruza
    // participantes con sedes comparando nombre y sede como texto: dos colegios
    // con el mismo par harían ambigua esa asignación.
    const duplicate = await prisma.colegio.findFirst({
      where: { nombre: fields.nombre, sede: fields.sede, NOT: { id_colegio } },
      select: { id_colegio: true },
    });
    if (duplicate) {
      throw new TRPCError({
        code: "CONFLICT",
        message: "Ya existe un colegio con ese nombre y esa sede.",
      });
    }
    const query = await prisma.colegio.upsert({
      where: { id_colegio },
      update: fields,
      create: fields,
    });
    revalidateTag("results");
    return query;
  }),
  deleteSchool: protectedProcedure
    .input(z.number())
    .mutation(async ({ input }) => {
      if (input === DEFAULT_SCHOOL_ID) {
        throw new TRPCError({
          code: "PRECONDITION_FAILED",
          message:
            "No se puede eliminar: es el colegio por defecto de las participaciones.",
        });
      }
      const colegio = await prisma.colegio.findUnique({
        where: { id_colegio: input },
        select: { _count: { select: SCHOOL_COUNTS } },
      });
      if (!colegio) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "El colegio no existe.",
        });
      }
      const blockers = describeSchoolDependencies(colegio._count);
      if (blockers) {
        throw new TRPCError({
          code: "PRECONDITION_FAILED",
          message: `No se puede eliminar: el colegio tiene ${blockers}.`,
        });
      }
      const query = await prisma.colegio.delete({
        where: { id_colegio: input },
      });
      revalidateTag("results");
      return query;
    }),
  setParticipant: protectedProcedure
    .input(PARTICIPANT)
    .mutation(async ({ input }) => {
      const { id_participante, dni, nombre, apellido, email, ano } = input;
      const { id_participacion, id_competencia, id_colegio, nivel } =
        input.participacion;

      // El mismo chico vuelve todos los años, así que un DNI ya cargado no es
      // un error en un alta: se reutiliza la ficha y se le agrega la
      // participación del año. En una edición sí es un choque real.
      const sameDni = await prisma.participante.findUnique({
        where: { dni },
        select: { id_participante: true },
      });
      if (
        sameDni &&
        id_participante !== -1 &&
        sameDni.id_participante !== id_participante
      ) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Ya existe otro participante con ese DNI.",
        });
      }
      const participantId = sameDni
        ? sameDni.id_participante
        : id_participante;

      // El panel edita sólo el año en curso; una competencia de otro año acá
      // sólo puede venir de un select desincronizado.
      const competencia = await prisma.competencia.findUnique({
        where: { id_competencia },
        select: { ano: true, tipo: true },
      });
      if (!competencia) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "La competencia no existe.",
        });
      }
      if (competencia.ano !== ano) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `La competencia elegida no es de ${ano}.`,
        });
      }

      // No hay unique en (id_participante, id_competencia), así que la
      // invariante se sostiene acá. Es por competencia y no por año a
      // propósito: hay chicos anotados en OMA y en ÑANDÚ el mismo año, y eso
      // es válido; lo que no puede haber son dos filas de la misma competencia.
      if (participantId !== -1) {
        const duplicate = await prisma.participacion.findFirst({
          where: {
            id_participante: participantId,
            id_competencia,
            NOT: { id_participacion },
          },
          select: { id_participacion: true },
        });
        if (duplicate) {
          throw new TRPCError({
            code: "CONFLICT",
            message: `El participante ya tiene una participación cargada en ${competencia.tipo} ${ano}.`,
          });
        }
      }

      const query = await prisma.$transaction(async (tx) => {
        const participante = await tx.participante.upsert({
          where: { id_participante: participantId },
          update: { dni, nombre, apellido, email },
          create: { dni, nombre, apellido, email },
        });
        const participacion = await tx.participacion.upsert({
          where: { id_participacion },
          update: {
            id_participante: participante.id_participante,
            id_competencia,
            id_colegio,
            nivel,
          },
          create: {
            id_participante: participante.id_participante,
            id_competencia,
            id_colegio,
            nivel,
          },
        });
        return { participante, participacion };
      });
      revalidateTag("results");
      return query;
    }),
  deleteParticipant: protectedProcedure
    .input(z.number())
    .mutation(async ({ input }) => {
      const participante = await prisma.participante.findUnique({
        where: { id_participante: input },
        select: {
          participaciones: {
            select: { _count: { select: PARTICIPATION_COUNTS } },
          },
        },
      });
      if (!participante) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "El participante no existe.",
        });
      }
      const blockers = describeParticipationDependencies(
        mergeParticipationDependencies(
          participante.participaciones.map(({ _count }) => _count)
        )
      );
      if (blockers) {
        throw new TRPCError({
          code: "PRECONDITION_FAILED",
          message: `No se puede eliminar: el participante tiene ${blockers}.`,
        });
      }
      const query = await prisma.$transaction(async (tx) => {
        await tx.participacion.deleteMany({
          where: { id_participante: input },
        });
        return tx.participante.delete({ where: { id_participante: input } });
      });
      revalidateTag("results");
      return query;
    }),
  deleteParticipation: protectedProcedure
    .input(z.number())
    .mutation(async ({ input }) => {
      const participacion = await prisma.participacion.findUnique({
        where: { id_participacion: input },
        select: { _count: { select: PARTICIPATION_COUNTS } },
      });
      if (!participacion) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "La participación no existe.",
        });
      }
      const blockers = describeParticipationDependencies(participacion._count);
      if (blockers) {
        throw new TRPCError({
          code: "PRECONDITION_FAILED",
          message: `No se puede quitar: la participación tiene ${blockers}.`,
        });
      }
      const query = await prisma.participacion.delete({
        where: { id_participacion: input },
      });
      revalidateTag("results");
      return query;
    }),
});
