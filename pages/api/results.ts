import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma"

export default async function handle(req : NextApiRequest, res : NextApiResponse) {
    try {
    let {ano,instancia,competencia} = req.query;
    if(ano && instancia && competencia){
        const year = Number(ano as string)
        const instance = instancia as string
        const type = competencia as string
        const result = await prisma.rinde.findMany(
            {   
                where : {
                        prueba : {
                            AND : [
                                {instancia : instance},
                                {competencia : {
                                    AND : [
                                        {ano : year},
                                        {tipo: type}
                                ]}}
                            ]
                        }
                },
                select : {
                    presente: true,
                    aprobado: true,
                    resultados: true,
                    participacion : {
                        select : {
                            nivel: true,
                            colegio : {
                                select : {
                                    nombre: true,
                                    sede: true,
                                }
                            },
                            participante : {
                                select: {
                                    nombre: true,
                                    apellido: true
                                }
                            }
                        }
                    }
                }   
            })
        res.status(200).json(result);}}
    catch (error) {
        res.status(503).json(error)
    }
}