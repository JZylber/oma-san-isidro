import prisma from "./prisma";

export const getAvailableResults = async (type: string) => {
    const query = await prisma.competencia.findMany({
    where : {
      tipo : type
    },
    select : {
      ano : true,
      pruebas : {
          select : {
              instancia: true
          }
      }
    }
    })
    const results = query.map((year) => {return({...year,pruebas:year.pruebas.map((prueba) => prueba.instancia)})})
    return ({results});
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

  export const getCalendarEvents = async (year:number) => {
    const query = await prisma.fechas.findMany({
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
    })
    const results = query
    return ({results});
    };
