import { INSTANCIA } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma"

export default async function handle(req : NextApiRequest, res : NextApiResponse) {
    if (req.query.secret !== process.env.API_TOKEN) {
        return res.status(401).json({ message: 'Invalid token' })
    }
    try {
    let {ano,instancia,competencia} = req.query;
    if(ano && instancia && competencia){
        const year = Number(ano as string)
        const instance = instancia as INSTANCIA
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
                                        {tipo: type},
                                ]}},
                            ],
                        },
                },
                orderBy: [
                    {participacion:{
                        nivel: 'asc'
                        }
                    },
                    {participacion:{
                        participante: {
                            apellido: 'asc'
                        }}
                    }
                ],
                select : {
                    prueba: {
                        select : {
                            cantidad_problemas: true,
                        }
                    },
                    presente: true,
                    aprobado: true,
                    aclaracion: true,
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
                },
            })
        res.status(200).json(result);}}
    catch (error) {
        res.status(503).json( {message: error})
    }
}