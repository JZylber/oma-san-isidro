import { INSTANCIA } from "@prisma/client";
import { prisma } from "./db";

export type Competition = "OMA" | "ÑANDÚ"

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
      return (results);
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
    return (results);
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
    return (results);
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
    }
  });
  return (query);
};

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
  return (years);
};

export const getAuthMaxDate = async (type: string, year: number, instance: INSTANCIA) => {
  const query = await prisma.prueba.findFirst({
    where: {
      competencia: {
        tipo: type,
        ano: year
      },
      instancia: instance
    },
    select: {
      fecha_limite_autorizacion: true
    }
  });
  return (query);
}