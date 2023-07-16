import { Metadata } from "next";
import NanduResultsPage from "./resultados";
import { yearTests } from "../../../components/ResultsPage/resultsTypes";
import { getAvailableResults } from "../../../lib/app-router-db-calls";

export const metadata : Metadata = {
    title: 'Resultados Ñandú',
    description: 'Resultados de las participaciones en pruebas de Ñandú',
}

export default async function NanduResults() {
    let available = await getAvailableResults("ÑANDÚ");
    const env = process.env.NODE_ENV;
    const vercel_env = process.env.VERCEL_ENV;
    if(env === "production" && (vercel_env?vercel_env === "production":true)){
      available = available.map((item:yearTests) => {
        item.pruebas = item.pruebas.filter((test) => test.disponible)
        return item;
      });
      available = available.filter((item:yearTests) => item.pruebas.length > 0);
    }
    return <NanduResultsPage results={available}/>
}