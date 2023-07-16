import { INSTANCIA } from "@prisma/client";
import prisma from "../../../lib/prisma";
import {NextResponse } from "next/server";

export async function GET(request: Request) {
    const url = new URL(request.url);
    const params = url.searchParams;
    if (params.get("secret") !== process.env.API_TOKEN) {
        return NextResponse.json({message: 'Invalid token' },{status: 401})
    }
    try {
        const ano = params.get("ano");
        const instancia = params.get("instancia");
        const competencia = params.get("competencia");
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
            NextResponse.json(result, {status: 200})}
        else{
            NextResponse.json({message: 'Invalid parameters' },{status: 400})
        }
    } catch (error) {
        NextResponse.json({message: error},{status: 503});
    }
}