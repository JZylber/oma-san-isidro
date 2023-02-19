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
