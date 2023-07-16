import prisma from "./prisma";

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