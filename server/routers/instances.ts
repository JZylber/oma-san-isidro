import { router, publicProcedure } from '../trpc';
import { z } from 'zod';
import { INSTANCIA } from "@prisma/client";
import { prisma } from '../db';
import { getParticipants, getPreviousInstance, passingParticipants } from './results/results_db_calls';

export const getInstanceDropPoints = async (type: string, year: number, instance: INSTANCIA) => {
  const query = await prisma.prueba.findFirst({
    where: {
      competencia: {
        tipo: type,
        ano: year
      },
      instancia: instance
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
  return (results);
};

const getInstanceVenues = async (type: string, year: number, instance: INSTANCIA) => {
  const query = await prisma.prueba.findFirst({
  where: {
    competencia: {
      tipo: type,
      ano: year
    },
    instancia: instance
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
            id_participacion: true,
          }
        }
      }}}});
  const venues = query?query.sedeinstancia:[];
  const results = venues.map((sede) => {return(
  {
    colegio: sede.colegio,
    ...sede.sede,
    aclaracion: sede.aclaracion,
    niveles: sede.niveles,
    participantes: sede.ParticipacionSedeInstancia
  }
  )});
  return (results);
  };



const passingParticipantsWScore = async (type: string, year: number, instance: INSTANCIA) => {
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
        resultados: true,
        participacion: {
          select: {
            id_participacion: true,
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
  const results = query?query.rinden.map((participation) => {return{...participation.participacion,resultados: participation.resultados}}):[];
  return (results);
};

const getInstanceData = async (year: number,competition: string, instance: INSTANCIA) => {
  const query = await prisma.prueba.findFirst({
    where: {
      competencia: {
        tipo : competition,
        ano: year
      },
      instancia: instance
      
  },
  select: {
    fecha_limite_autorizacion: true,
    hora_ingreso: true,
    duracion: true,
    criterio_habilitacion: true
  }  
  })
  return (query);
}




const venueDataGenerator = async (competition: string, instance: INSTANCIA) => {
  const date = new Date();
  const year = date.getFullYear();
  const previous_instance = getPreviousInstance(competition,instance);
  const {dropPoints,venues,participants,auth_max_date,time,duration} = await Promise.all([getInstanceDropPoints(competition,year,instance),getInstanceVenues(competition,year,instance),previous_instance?passingParticipants(competition,year,previous_instance):getParticipants(competition,year),getInstanceData(year,competition,instance)])
      .then(([dropPoints,venues,participants,instance_data]) => {
        return ({dropPoints:dropPoints,venues:venues,participants:participants,auth_max_date:instance_data?.fecha_limite_autorizacion,time:instance_data!.hora_ingreso,duration:instance_data!.duracion})
      });
  const participant_venues = participants.map((participant) => {
        let possibleVenues = venues.filter((venue) => venue.colegio.nombre === participant.colegio.nombre && venue.colegio.sede === participant.colegio.sede)
        let venue;
        if(possibleVenues.length === 1){
          venue = possibleVenues[0];
        } else {
          let byLevels = possibleVenues.some((ven) => ven.niveles.length > 0);
          let byParticipations = possibleVenues.some((ven) => ven.participantes.length > 0);
          if(byParticipations){
            let possibleVenue = possibleVenues.find((ven) => ven.participantes.some((par) => par.id_participacion === participant.id_participacion));
            if(possibleVenue){
              venue = possibleVenue;
            } else {
              venue = possibleVenues.find((ven) => ven.participantes.length === 0);
            }
          } else if(byLevels){
            venue = possibleVenues.find((ven) => ven.niveles.includes(participant.nivel));
          }
        }
        return({...participant,venue: venue?.nombre});
      });
  const venueData = venues.map((venue) => {
    return({
      nombre: venue.nombre,
      direccion: venue.direccion,
      localidad: venue.localidad,
      colegio: venue.colegio,
      aclaracion: venue.aclaracion?venue.aclaracion:"",
    })
  });
  const flat_participant_venues = participant_venues.map((participant) => {return({nombre: participant.participante.nombre, apellido: participant.participante.apellido ,colegio: participant.colegio, sede: participant.venue, nivel: participant.nivel})});
  return({
    venues: venueData,
    dropPoints: dropPoints.map((dropPoint) => {return({...dropPoint,aclaracion: dropPoint.aclaracion?dropPoint.aclaracion:undefined,nombre: dropPoint.nombre?dropPoint.nombre:undefined})}),
    auth_max_date: auth_max_date === null?undefined:auth_max_date,
    time: time,
    participants: flat_participant_venues,
    duration: duration});
}

const getDisabled = async (competition: string, year: number, instance: string) => {
  const query = await prisma.inhabilitado.findMany({
    where: {
      Prueba: {
        competencia: {
          tipo: competition,
          ano: year
        },
        instancia: instance as INSTANCIA
    }
    },
    select: {
      id_participacion: true
    }
  })
  return (query);
}

const provincialDataGenerator = async (competition: string, instance: INSTANCIA) => {
  const date = new Date();
  const year = date.getFullYear();
  const {interescolar,zonal,data} = await Promise.all([passingParticipantsWScore(competition,year,competition === "OMA"?'INTERCOLEGIAL':'INTERESCOLAR'),passingParticipantsWScore(competition,year,'ZONAL'),getInstanceData(year,competition,instance)]).then(([interescolar, zonal, data]) => {return({interescolar: interescolar,zonal: zonal, data: data})});
  let provincialParticipants = zonal.map((participant) => {
    let interescolar_participant = interescolar.find((interescolar_participant) => interescolar_participant.id_participacion === participant.id_participacion);
    let interescolar_points = interescolar_participant?.resultados?Number((interescolar_participant.resultados as string[])[3]):0;
    return({...participant,puntos: interescolar_points + Number((participant.resultados as string[])[3])});
  });
  const criteria = data?.criterio_habilitacion?data.criterio_habilitacion as number[]:[5,5,5];
  provincialParticipants = provincialParticipants.filter((participant) => participant.puntos >= criteria[participant.nivel - 1]);
  const disabled = await getDisabled(competition,year,instance);
  provincialParticipants = provincialParticipants.filter((participant) => !disabled.some((disabled_participant) => disabled_participant.id_participacion === participant.id_participacion));
  const provincialParticipantsNames = provincialParticipants.map((participant) => {return({nombre: participant.participante.nombre, apellido: participant.participante.apellido ,colegio: participant.colegio, nivel: participant.nivel})});
  const auth_max_date = data?.fecha_limite_autorizacion;
  return({participants: provincialParticipantsNames,auth_max_date: auth_max_date?auth_max_date:undefined});
}

const nationalDataGenerator = async (competition: string, instance: INSTANCIA) => {
  const date = new Date();
  const year = date.getFullYear();
  const {passing,disabled,data} = await Promise.all([passingParticipants(competition,year,'REGIONAL'),getDisabled(competition,year,instance),getInstanceData(year,competition,instance)]).then(([passing,disabled,data]) => {return({passing: passing,disabled: disabled,data: data})});
  const nationalParticipants = passing.filter((participant) => !disabled.some((disabled_participant) => disabled_participant.id_participacion === participant.id_participacion));
  const nationalParticipantsNames = nationalParticipants.map((participant) => {return({nombre: participant.participante.nombre, apellido: participant.participante.apellido ,colegio: participant.colegio, nivel: participant.nivel})});
  const auth_max_date = data?.fecha_limite_autorizacion;
  return({participants: nationalParticipantsNames,auth_max_date: auth_max_date?auth_max_date:undefined});
}
const INSTANCE = z.nativeEnum(INSTANCIA);

export const instanceRouter = router({
  regionalInstance: publicProcedure
    .input(
      z.object({
        competition: z.string(),
        instance: INSTANCE,
      }),
    )
    .query(({input}) => {
      const {competition,instance} = input;
      return venueDataGenerator(competition,instance);
    }),     
  provincialInstance: publicProcedure
    .input(
      z.object({
        competition: z.string(),
        instance: INSTANCE,
      }),
    )
    .query(({input}) => {
      const {competition,instance} = input;
      return provincialDataGenerator(competition,instance);
    }),
  nationalInstance: publicProcedure
  .input(
    z.object({
      competition: z.string(),
      instance: INSTANCE,
    }),
  )
  .query(({input}) => {
    const {competition,instance} = input;
    return nationalDataGenerator(competition,instance);
  }),
});