const getAvailableResults = async (type: string) => {
    const results = await prisma.competencia.findMany({
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
    return ({results});
    };

export default getAvailableResults 