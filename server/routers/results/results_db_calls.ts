import { INSTANCIA } from "@prisma/client";
import { prisma } from "../../db";

export const getPreviousInstance =  (competition: string,instance: INSTANCIA) => {
    if(instance === 'NACIONAL') return 'REGIONAL' as INSTANCIA;
    if(instance === 'REGIONAL') return 'ZONAL' as INSTANCIA;
    if(instance === 'ZONAL'){
      if(competition === "OMA") return 'INTERCOLEGIAL' as INSTANCIA;
      else return 'INTERESCOLAR' as INSTANCIA;
    };
    return undefined;
  }

  export const getParticipants = async (competition: string,year: number) => {
    const query = await prisma.participacion.findMany({
      where: {
        competencia: {
          tipo: competition,
          ano: year
        }
      },
      orderBy: [
        {nivel: 'asc'},
        {
          participante: {
            apellido: 'asc'
          }
        },
        {
          participante: {
            nombre: 'asc'
          }
        }
      ],
      select: {
        id_participacion: true,
        participante: {
          select: {
            nombre: true,
            apellido: true,
            dni: true
          }
        },
        colegio: {
          select: {
            nombre: true,
            sede: true
          }
        },
        nivel: true
      }
    });
    const results = query;
    return (results);
  };
  
  export const passingParticipants = async (type: string, year: number, instance: INSTANCIA) => {
    const query = await prisma.prueba.findFirst({
    where: {
      competencia: {
        tipo: type,
        ano: year
      },
      instancia: instance,
    },
    select: {
      rinden: {
        where: {
          aprobado: true
        },
        orderBy: [
        {participacion: {
          nivel: 'asc'
        }},  
        {
          participacion: {
            participante: {
              apellido: 'asc'
            }
          }
        },
        {
          participacion: {
            participante: {
              nombre: 'asc'
            }
          }
        }],
        select: {
          participacion: {
            select: {
              id_participacion: true,
              participante: {
                select: {
                  nombre: true,
                  apellido: true,
                    dni: true
                }
              },
              colegio: {
                select: {
                  nombre: true,
                  sede: true
                }
              },
              nivel: true
            }
          }
        }
      }
    }
    });
    const results = query?query.rinden.map((participation) => participation.participacion):[];
    return (results);
  };

export const  getResults = async (competition: string, year: number, instance: INSTANCIA) => {
    const results = await prisma.rinde.findMany(
        {   
            where : {
                    prueba : {
                        AND : [
                            {instancia : instance},
                            {competencia : {
                                AND : [
                                    {ano : year},
                                    {tipo: competition},
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
                id_rinde: true,
                presente: true,
                aprobado: true,
                aclaracion: true,
                resultados: true,
                participacion : {
                    select : {
                        id_participacion: true,
                    }
                }
            },
        })
    return results;
  }

export const modifyResult = async (id_rinde: number, score: string[], approved: boolean, present: boolean, clarification: string | null) => {
    const result = await prisma.rinde.update({
        where: {
            id_rinde: id_rinde
        },
        data: {
            resultados: score,
            aprobado: approved,
            presente: present,
            aclaracion: clarification
        }
    });
    return result;
}

export const newResult = async (id_participation: number, id_test: number, score: string[], approved: boolean, present: boolean, clarification: string | null) => {
    const result = await prisma.rinde.create({
        data: {
            id_participacion: id_participation,
            id_prueba: id_test,
            resultados: score,
            aprobado: approved,
            presente: present,
            aclaracion: clarification
        }
    });
    return result;
}

export const deleteResult = async (id_rinde: number) => {
    const result = await prisma.rinde.delete({
        where: {
            id_rinde: id_rinde
        }
    });
    return result;
};