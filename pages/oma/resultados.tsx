import {GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Results from "../../components/ResultsPage/results";
import {yearTests } from "../../components/ResultsPage/resultsTypes";
import {getAvailableResults} from "../../lib/aux_db_calls";
import styles from "./resultados.module.scss"
import Layout from "../../components/Layout/Layout";

export const getStaticProps: GetStaticProps= async ({ params }) => {
    const available = await getAvailableResults("OMA");
    const env = process.env.NODE_ENV;
    const vercel_env = process.env.VERCEL_ENV;
    if(env === "production" && (vercel_env?vercel_env === "production":true)){
      available.years = available.years.map((item:yearTests) => {
        item.pruebas = item.pruebas.filter((test) => test.disponible)
        return item;
      });
      available.years = available.years.filter((item:yearTests) => item.pruebas.length > 0);
    }
    const newProps = {results: available.years}
    return {
      props: newProps,
    };     
  };


const OMAResults : NextPage<{results : Array<yearTests>}> = ({results}) => {
    return(
        <>
        <Head>
            <title>Resultados OMA</title>
            <meta   name="description"
                content="Resultados de las participaciones en pruebas de OMA"></meta>
        </Head>
        <Layout>
            <Results competition="OMA" availableResults={results}/>
        </Layout>
        </>)
}

export default OMAResults