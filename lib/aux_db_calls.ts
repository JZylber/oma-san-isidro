import prisma from "./prisma";

const getAvailableResults = async (type: string) => {
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

export default getAvailableResults 