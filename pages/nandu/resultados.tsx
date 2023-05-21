import {GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Results from "../../components/ResultsPage/results";
import {yearTests } from "../../components/ResultsPage/resultsTypes";
import {getAvailableResults, getSchools} from "../../lib/aux_db_calls";
import Layout from "../../components/Layout/Layout";

export const getStaticProps: GetStaticProps= async ({ params }) => {
    const available = await getAvailableResults("ÑANDÚ");
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

const NanduResults : NextPage<{results: Array<yearTests>}> = ({results}) => {
    return(
        <>
        <Head>
          <title>Resultados Ñandú</title>
          <meta   name="description"
                content="Resultados de las participaciones en pruebas de Ñandú"></meta>
        </Head>
        <Layout>
            <Results competition="Ñandú" availableResults={results}/>
        </Layout>
        </>
        )
}

export default NanduResults