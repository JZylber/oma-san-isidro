import prisma from "./prisma";
import { INSTANCIA } from "@prisma/client";

export const getAvailableResults = async (type: string) => {
    const query = await prisma.prueba.findMany({
      where: {
        AND: [
        {competencia: {
          tipo: type
        }},
        {fecha: {
          gte: new Date(2022,0,1),
          lt: new Date()}
        },
        {NOT: {
          rinden: {
            none: {}
          }
        }}
      ]},
      select: {
        instancia: true,
        competencia: {
          select: {
            ano: true
         },
        },
        resultados_disponibles: true
      }});
    let years = Array.from(new Set(query.map((prueba) => prueba.competencia.ano))).map((ano : number): {ano:number,pruebas:{nombre: string, disponible: boolean}[]} => {return({ano:ano,pruebas:[]})});
    query.forEach((prueba) => {years.find((year) => year.ano === prueba.competencia.ano)!.pruebas.push({nombre: prueba.instancia,disponible: prueba.resultados_disponibles})});
    return ({years});
    };

export const getSchools = async () => {
  const query = await prisma.colegio.findMany({
  select : {
    nombre: true,
    sede: true,
    localidad: true
  }
  })
  const results = query
  return ({results});
  };

export const getNews = async () => {
  const query = await prisma.noticias.findMany(
    {
      orderBy: [
        {agregado: 'desc'}
      ],
      select: {
        titulo: true,
        link: true,
        visible: true,
      }
    } 
    )
    const results = query
    return ({results});
  };

export const getCalendarEvents = async (year:number,type?: string) => {
    let query = []; 
    if(type){
      query = await prisma.fechas.findMany({
        where: {
          fecha_inicio: {
            gte: new Date(year,0,1),
            lt:  new Date(year,11,31)
          },
          tipo: type
        },
        orderBy: [{
          fecha_inicio : 'asc'
        }],
        select: {
          fecha_inicio: true,
          fecha_fin: true,
          tipo: true,
          texto: true
        }
      })
      const results = query
      return ({results});
    } else {
     query = await prisma.fechas.findMany({
      where: {
        fecha_inicio: {
          gte: new Date(year,0,1),
          lt:  new Date(year,11,31)
        }
      },
      orderBy: [{
        fecha_inicio : 'asc'
      }],
      select: {
        fecha_inicio: true,
        fecha_fin: true,
        tipo: true,
        texto: true
      }
    })}
    const results = query
    return ({results});
    };

export const getInstances = async (type: string, year: number) => {
    const query = await prisma.prueba.findMany({
      where: {
        competencia: {
          tipo: type,
          ano: year
        }
      },
      orderBy: [{
        fecha : 'asc'
      }],
      select: {
        instancia: true,
        fecha: true,
        fecha_limite_autorizacion: true,
      }
    });
    const results = query
    return ({results});
};

const getInstanceDropPoints = async (type: string, year: number, instance: string) => {
      let ins = instance as INSTANCIA;
      const query = await prisma.prueba.findFirst({
        where: {
          competencia: {
            tipo: type,
            ano: year
          },
          instancia: ins
        },
        select: {
            puntoinstancia: {
              select: {
                punto: {
                  select: {
                    nombre: true,
                    direccion: true,
                    localidad: true,
                    aclaracion: true
                  }
                }
              }
            }
        } 
    });
      const dropPoints = query?query.puntoinstancia:[];
      const results = dropPoints.map((punto) => {return({...punto.punto})}); 
      return ({results});
    };

const getInstanceVenues = async (type: string, year: number, instance: string) => {
  let ins = instance as INSTANCIA;
  const query = await prisma.prueba.findFirst({
    where: {
      competencia: {
        tipo: type,
        ano: year
      },
      instancia: ins
    },
    select: {
      sedeinstancia: {
        orderBy: [{
          sede: {
            localidad: 'asc'
          }
        },
        {
          sede: {
            nombre: 'asc'
          }
        },
        {
          colegio: {
            nombre: 'asc'
          }
        }],
        select: {
          colegio: {
            select: {
              nombre: true,
              sede: true
          }},
          sede: {
            select: {
              nombre: true,
              direccion: true,
              localidad: true
            }
          },
          aclaracion: true,
          niveles: true,
          ParticipacionSedeInstancia: {
            select: {
              participacion: {
                select: {
                  nivel: true,
                  participante: {
                    select: {
                      nombre: true,
                      apellido: true
                    }
                  }
                }
              }
            }
          }
        }}}});
  const venues = query?query.sedeinstancia:[];
  const results = venues.map((sede) => {return(
    {
      colegio: sede.colegio,
      ...sede.sede,
      aclaracion: sede.aclaracion
    }
  )});
  return ({results});
};

export const getInscriptionData = async (type: string, year: number) => {
  const query = await prisma.competencia.findFirst({
    where: {
      tipo: type,
      ano: year
    },
    select: {
      fecha_inscripcion_nacional: true,
      fecha_inscripcion_regional: true,
      link_inscripcion: true
    }
  });
  const results = query
  return ({results});
};

const passingParticipants = async (type: string, year: number, instance: string) => {
  let ins = instance as INSTANCIA;
  const query = await prisma.prueba.findFirst({
    where: {
      competencia: {
        tipo: type,
        ano: year
      },
      instancia: ins,
    },
    select: {
      rinden: {
        where: {
          aprobado: true
        },
        select: {
          participacion: {
            select: {
              participante: {
                select: {
                  nombre: true,
                  apellido: true
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
  const results = query?query.rinden:[];
  return ({results});
};

//Complex calls
export const venueDataGenerator = async (competition: string, instance_hierarchy: string[]) => {
  const date= new Date();
  const year = date.getFullYear();
  const newProps = await getInstances(competition,year).then(async (instances) => {
      const {instancia,fecha_limite_autorizacion} = instances.results.filter(instance => instance.fecha > date)[0];
      const next_instance = instancia;
      const auth_max_date = fecha_limite_autorizacion;
      const dropPoints = (await getInstanceDropPoints(competition,year,next_instance)).results;
      const venues = (await getInstanceVenues(competition,year,next_instance)).results;
      const previous_instance = instance_hierarchy[instance_hierarchy.indexOf(next_instance)-1];
      const participants = (await passingParticipants(competition,year,previous_instance)).results;
      const participant_venues = participants.map((participant) => {
        let venue = venues.find((venue) => venue.colegio.nombre === participant.participacion.colegio.nombre && venue.colegio.sede === participant.participacion.colegio.sede);
        return({...participant,venue: venue?.nombre});
      });
      const flat_participant_venues = participant_venues.map((participant) => {return({nombre: participant.participacion.participante.nombre, apellido: participant.participacion.participante.apellido ,colegio: participant.participacion.colegio, sede: participant.venue, nivel: participant.participacion.nivel})});
      return({next_instance: next_instance,venues: venues,dropPoints: dropPoints,auth_max_date: JSON.parse(JSON.stringify(auth_max_date)),participants: flat_participant_venues})
  });
  return {
      props: newProps,
  };
}