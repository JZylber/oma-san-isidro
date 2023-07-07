import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { INSTANCIA } from "@prisma/client";

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
  return ({results});
  };

const getParticipants = async (competition: string,year: number) => {
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
  });
  const results = query;
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
  const results = query?query.rinden.map((participation) => participation.participacion):[];
  return ({results});
};

const passingParticipantsWScore = async (type: string, year: number, instance: string) => {
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
  return ({results});
};

const getAuthMaxDate = async (year: number,competition: string, instance: string) => {
  let ins = instance as INSTANCIA;
  const query = await prisma.prueba.findFirst({
    where: {
      competencia: {
        tipo : competition,
        ano: year
      },
      instancia: ins
      
  },
  select: {
    fecha_limite_autorizacion: true
  }  
  })
  return ({query});
}

const getPreviousInstance =  (competition: string,instance: string) => {
  if(instance === 'NACIONAL') return 'REGIONAL';
  if(instance === 'REGIONAL') return 'ZONAL';
  if(instance === 'ZONAL'){
    if(competition === "OMA") return 'INTERCOLEGIAL'
    else return 'INTERESCOLAR'
  };
  return undefined;
}

const venueDataGenerator = async (competition: string, instance: string) => {
  const date = new Date();
  const year = date.getFullYear();
  const previous_instance = getPreviousInstance(competition,instance);
  const {dropPoints,venues,participants,auth_max_date} = await Promise.all([getInstanceDropPoints(competition,year,instance),getInstanceVenues(competition,year,instance),previous_instance?passingParticipants(competition,year,previous_instance):getParticipants(competition,year),getAuthMaxDate(year,competition,instance)])
      .then(([dropPoints,venues,participants,auth_max_date]) => {
        return ({dropPoints:dropPoints.results,venues:venues.results,participants:participants.results,auth_max_date:auth_max_date.query?.fecha_limite_autorizacion})
      });
  const participant_venues = participants.map((participant) => {
        let venue = venues.find((venue) => 
          {let isVenue = venue.colegio.nombre === participant.colegio.nombre && venue.colegio.sede === participant.colegio.sede
           if(venue.niveles.length > 0){
              return isVenue && venue.niveles.includes(participant.nivel)
           } else if(venue.participantes.length > 0) {
              return isVenue && venue.participantes.some((participante) => participante.id_participacion === participant.id_participacion)
           } else
              return isVenue
          }
        );
        return({...participant,venue: venue?.nombre});
      });
  const flat_participant_venues = participant_venues.map((participant) => {return({nombre: participant.participante.nombre, apellido: participant.participante.apellido ,colegio: participant.colegio, sede: participant.venue, nivel: participant.nivel})});
  return({venues: venues,dropPoints: dropPoints,auth_max_date: JSON.parse(JSON.stringify(auth_max_date)),participants: flat_participant_venues})
}

const provincialDataGenerator = async (competition: string, instance: string) => {
  const date = new Date();
  const year = date.getFullYear();
  const {interescolar,zonal} = await Promise.all([passingParticipantsWScore(competition,year,competition === "OMA"?'INTERCOLEGIAL':'INTERESCOLAR'),passingParticipantsWScore(competition,year,'ZONAL')]).then(([interescolar, zonal]) => {return({interescolar: interescolar.results,zonal: zonal.results})});
  let provincialParticipants = zonal.map((participant) => {
    let interescolar_participant = interescolar.find((interescolar_participant) => interescolar_participant.id_participacion === participant.id_participacion);
    let interescolar_points = interescolar_participant?.resultados?Number((interescolar_participant.resultados as string[])[3]):0;
    return({...participant,puntos: interescolar_points + Number((participant.resultados as string[])[3])});
  });
  provincialParticipants = provincialParticipants.filter((participant) => participant.puntos >= 5);
  const provincialParticipantsNames = provincialParticipants.map((participant) => {return({nombre: participant.participante.nombre, apellido: participant.participante.apellido ,colegio: participant.colegio, nivel: participant.nivel})});	
  return({participants: provincialParticipantsNames});
}

export default async function handle(req : NextApiRequest, res : NextApiResponse) {
    let {instanceData} = req.query
    instanceData = instanceData as string[]
    const [competition,instance] = instanceData;
    if(instance != "PROVINCIAL"){
      try{
        const data = await venueDataGenerator(competition,instance);
        res.status(200).json(data);
      } catch (error) {
        let message = 'Error al obtener los datos de la competencia'
        if (error instanceof Error) message = error.message
        res.status(500).json({message:message});
      }
    }else if(instance === "PROVINCIAL"){
      try{
        const data = await provincialDataGenerator(competition,instance);
        res.status(200).json(data);
      } catch (error) {
        let message = 'Error al obtener los datos de la competencia'
        if (error instanceof Error) message = error.message
        res.status(500).json({message:message});
      }
    }else{
      res.status(200).json({});
    }
  }