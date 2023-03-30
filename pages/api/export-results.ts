import { NextApiRequest, NextApiResponse } from "next";
import { TestQueryResults } from "../../components/ResultsPage/resultsTypes";

export default async function handle(req : NextApiRequest, res : NextApiResponse) {
    if (req.query.secret !== process.env.API_TOKEN) {
        return res.status(401).json({ message: 'Invalid token' })
    }
    try{
        //MODULES
        const fs = require("fs");
        const { stringify } = require("csv-stringify");

        //DATA
        const {fileFormat,results}:{fileFormat : string , results : TestQueryResults[] }= req.body;
        const fileName = `resultados.${fileFormat}`
        let columns = [
            "Nombre",
            "Apellido",
            "Nivel",
            "Colegio",
        ].concat(results[0].prueba.cantidad_problemas>0?Array.from({length: results[0].prueba.cantidad_problemas}, (_, i) => `P${i + 1}`).concat(["Total"]):[]).concat(
            ["Aprobado"]
        );
        const data : Array<Array<string | number>> = results.map((result : TestQueryResults) => {
            return([
                result.participacion.participante.nombre,
                result.participacion.participante.apellido,
                result.participacion.nivel,
                `${result.participacion.colegio.nombre}${result.participacion.colegio.sede?"-"+result.participacion.colegio.sede:""}`
            ].concat(result.prueba.cantidad_problemas>0?result.resultados:[]).concat([result.aprobado?"Si":"No"])
        )});
        res.setHeader('Content-Type', 'file/csv');
        stringify(data,{header:true,columns:columns}, (error : any, output : any) => res.send(output));
    }
    catch (error) {
        res.status(500).json( {message: {error}})
    }
}