import {GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Results from "../../components/ResultsPage/results";
import {yearTests } from "../../components/ResultsPage/resultsTypes";
import {getAvailableResults, getSchools} from "../../lib/aux_db_calls";
import styles from "./resultados.module.scss"
import Layout from "../../components/Layout/Layout";

export const getStaticProps: GetStaticProps= async ({ params }) => {
    const available = await getAvailableResults("ÑANDÚ");
    const newProps = {results: available.results}
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