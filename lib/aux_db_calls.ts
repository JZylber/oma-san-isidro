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
          lt: new Date()}
        }
      ]},
      select: {
        instancia: true,
        competencia: {
          select: {
            ano: true
         }
        }
      }});
    let years = Array.from(new Set(query.map((prueba) => prueba.competencia.ano))).map((ano : number): {ano:number,pruebas:string[]} => {return({ano:ano,pruebas:[]})});
    query.forEach((prueba) => {years.find((year) => year.ano === prueba.competencia.ano)!.pruebas.push(prueba.instancia)});
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
        link: true
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

    export const getInstanceDropPoints = async (type: string, year: number, instance: string) => {
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
      }});
      const results = query?query.puntoinstancia:[];
      return ({results});
    };

export const getInstanceVenues = async (type: string, year: number, instance: string) => {
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
        select: {
          colegio: {
            select: {
              nombre: true,
              sede: true
          }},
          sede: true,
          aclaracion: true
        }
      }
    }
  });
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