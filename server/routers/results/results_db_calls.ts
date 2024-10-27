import { INSTANCIA } from "@prisma/client";
import { prisma } from "../../db";

export const getPreviousInstance = (
  competition: string,
  instance: INSTANCIA
) => {
  if (instance === "NACIONAL") return "REGIONAL" as INSTANCIA;
  if (instance === "REGIONAL") return "ZONAL" as INSTANCIA;
  if (instance === "ZONAL") {
    if (competition === "OMA") return "INTERCOLEGIAL" as INSTANCIA;
    else return "INTERESCOLAR" as INSTANCIA;
  }
  return undefined;
};

export const getParticipants = async (competition: string, year: number) => {
  const query = await prisma.participacion.findMany({
    where: {
      competencia: {
        tipo: competition,
        ano: year,
      },
    },
    orderBy: [
      { nivel: "asc" },
      {
        participante: {
          apellido: "asc",
        },
      },
      {
        participante: {
          nombre: "asc",
        },
      },
    ],
    select: {
      id_participacion: true,
      participante: {
        select: {
          nombre: true,
          apellido: true,
          dni: true,
        },
      },
      colegio: {
        select: {
          nombre: true,
          sede: true,
        },
      },
      nivel: true,
    },
  });
  const results = query;
  return results;
};

export const getPassingParticipants = async (
  type: string,
  year: number,
  instance: INSTANCIA
) => {
  const query = await prisma.prueba.findFirst({
    where: {
      competencia: {
        tipo: type,
        ano: year,
      },
      instancia: instance,
    },
    select: {
      rinden: {
        where: {
          aprobado: true,
        },
        orderBy: [
          {
            participacion: {
              nivel: "asc",
            },
          },
          {
            participacion: {
              participante: {
                apellido: "asc",
              },
            },
          },
          {
            participacion: {
              participante: {
                nombre: "asc",
              },
            },
          },
        ],
        select: {
          participacion: {
            select: {
              id_participacion: true,
              participante: {
                select: {
                  nombre: true,
                  apellido: true,
                  dni: true,
                },
              },
              colegio: {
                select: {
                  nombre: true,
                  sede: true,
                },
              },
              nivel: true,
            },
          },
        },
      },
    },
  });
  const results = query
    ? query.rinden.map((participation) => participation.participacion)
    : [];
  return results;
};

export const getInstanceData = async (
  year: number,
  competition: string,
  instance: INSTANCIA
) => {
  const query = await prisma.prueba.findFirst({
    where: {
      competencia: {
        tipo: competition,
        ano: year,
      },
      instancia: instance,
    },
    select: {
      fecha_limite_autorizacion: true,
      hora_ingreso: true,
      duracion: true,
      criterio_habilitacion: true,
    },
  });
  return query;
};

const getPassingParticipantsWithScore = async (
  type: string,
  year: number,
  instance: INSTANCIA
) => {
  const query = await prisma.prueba.findFirst({
    where: {
      competencia: {
        tipo: type,
        ano: year,
      },
      instancia: instance,
    },
    select: {
      rinden: {
        where: {
          aprobado: true,
        },
        orderBy: [
          {
            participacion: {
              nivel: "asc",
            },
          },
          {
            participacion: {
              participante: {
                apellido: "asc",
              },
            },
          },
          {
            participacion: {
              participante: {
                nombre: "asc",
              },
            },
          },
        ],
        select: {
          resultados: true,
          participacion: {
            select: {
              id_participacion: true,
              participante: {
                select: {
                  nombre: true,
                  apellido: true,
                  dni: true,
                },
              },
              colegio: {
                select: {
                  nombre: true,
                  sede: true,
                },
              },
              nivel: true,
            },
          },
        },
      },
    },
  });
  const results = query
    ? query.rinden.map((participation) => {
        return {
          ...participation.participacion,
          resultados: participation.resultados,
        };
      })
    : [];
  return results;
};

export const getDisabled = async (
  competition: string,
  year: number,
  instance: string
) => {
  const query = await prisma.inhabilitado.findMany({
    where: {
      Prueba: {
        competencia: {
          tipo: competition,
          ano: year,
        },
        instancia: instance as INSTANCIA,
      },
    },
    select: {
      id_participacion: true,
    },
  });
  return query;
};

export const getProvincialParticipants = async (
  competition: string,
  year: number
) => {
  const { interescolar, zonal, data } = await Promise.all([
    getPassingParticipantsWithScore(
      competition,
      year,
      competition === "OMA" ? "INTERCOLEGIAL" : "INTERESCOLAR"
    ),
    getPassingParticipantsWithScore(competition, year, "ZONAL"),
    getInstanceData(year, competition, "PROVINCIAL"),
  ]).then(([interescolar, zonal, data]) => {
    return { interescolar: interescolar, zonal: zonal, data: data };
  });
  let provincialParticipants = zonal.map((participant) => {
    let interescolar_participant = interescolar.find(
      (interescolar_participant) =>
        interescolar_participant.id_participacion ===
        participant.id_participacion
    );
    let interescolar_points = interescolar_participant?.resultados
      ? Number((interescolar_participant.resultados as string[])[3])
      : 0;
    return {
      ...participant,
      puntos:
        interescolar_points + Number((participant.resultados as string[])[3]),
    };
  });
  const criteria = data?.criterio_habilitacion
    ? (data.criterio_habilitacion as number[])
    : [5, 5, 5];
  provincialParticipants = provincialParticipants.filter(
    (participant) => participant.puntos >= criteria[participant.nivel - 1]
  );
  const disabled = await getDisabled(competition, year, "PROVINCIAL");
  provincialParticipants = provincialParticipants.filter(
    (participant) =>
      !disabled.some(
        (disabled_participant) =>
          disabled_participant.id_participacion === participant.id_participacion
      )
  );
  return provincialParticipants;
};

export const getResults = async (
  competition: string,
  year: number,
  instance: INSTANCIA
) => {
  const results = await prisma.rinde.findMany({
    where: {
      prueba: {
        AND: [
          { instancia: instance },
          {
            competencia: {
              AND: [{ ano: year }, { tipo: competition }],
            },
          },
        ],
      },
    },
    orderBy: [
      {
        participacion: {
          nivel: "asc",
        },
      },
      {
        participacion: {
          participante: {
            apellido: "asc",
          },
        },
      },
    ],
    select: {
      prueba: {
        select: {
          cantidad_problemas: true,
        },
      },
      id_rinde: true,
      presente: true,
      aprobado: true,
      aclaracion: true,
      resultados: true,
      participacion: {
        select: {
          id_participacion: true,
        },
      },
    },
  });
  return results;
};

export const modifyResult = async (
  id_rinde: number,
  score: string[],
  approved: boolean,
  present: boolean,
  clarification: string | null
) => {
  const result = await prisma.rinde.update({
    where: {
      id_rinde: id_rinde,
    },
    data: {
      resultados: score,
      aprobado: approved,
      presente: present,
      aclaracion: clarification,
    },
  });
  return result;
};

export const newResult = async (
  id_participation: number,
  id_test: number,
  score: string[],
  approved: boolean,
  present: boolean,
  clarification: string | null
) => {
  const result = await prisma.rinde.create({
    data: {
      id_participacion: id_participation,
      id_prueba: id_test,
      resultados: score,
      aprobado: approved,
      presente: present,
      aclaracion: clarification,
    },
  });
  return result;
};

export const deleteResult = async (id_rinde: number) => {
  const result = await prisma.rinde.delete({
    where: {
      id_rinde: id_rinde,
    },
  });
  return result;
};

export const updateResults = async (
  results: {
    id_rinde: number;
    resultados: string[];
    aprobado: boolean;
    presente: boolean;
    aclaracion: string | null;
  }[]
) => {
  if (results.length === 0) return [];
  const updatedResults = results.map((result) => {
    return modifyResult(
      result.id_rinde,
      result.resultados,
      result.aprobado,
      result.presente,
      result.aclaracion
    );
  });
  return await Promise.all(updatedResults);
};

export const createResults = async (
  results: {
    id_participacion: number;
    resultados: string[];
    aprobado: boolean;
    presente: boolean;
    aclaracion: string | null;
  }[],
  id_prueba: number
) => {
  if (results.length === 0) return [];
  return await prisma.rinde.createMany({
    data: results.map((result) => {
      return {
        ...result,
        id_prueba: id_prueba,
      };
    }),
  });
};

export const setShowResults = async (show: boolean, id_prueba: number) => {
  return await prisma.prueba.update({
    where: {
      id_prueba: id_prueba,
    },
    data: {
      resultados_disponibles: show,
    },
  });
};

export type Participant = Awaited<ReturnType<typeof getParticipants>>[0];
