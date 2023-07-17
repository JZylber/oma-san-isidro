import { Metadata } from "next";
import OMAResultsPage from "./resultados";
import { yearTests } from "../../../components/ResultsPage/resultsTypes";
import { getAvailableResults } from "../../../lib/app-router-db-calls";

export const metadata : Metadata = {
    title: 'Resultados OMA',
    description: 'Resultados de las participaciones en pruebas de OMA',
}

export default async function NanduResults() {
    let available = await getAvailableResults("OMA");
    const env = process.env.NODE_ENV;
    const vercel_env = process.env.VERCEL_ENV;
    if(env === "production" && (vercel_env?vercel_env === "production":true)){
      available = available.map((item:yearTests) => {
        item.pruebas = item.pruebas.filter((test) => test.disponible)
        return item;
      });
      available = available.filter((item:yearTests) => item.pruebas.length > 0);
    }
    return <OMAResultsPage results={available}/>
}