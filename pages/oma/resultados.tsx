import {GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Results from "../../components/ResultsPage/results";
import { School, yearTests } from "../../components/ResultsPage/resultsTypes";
import {getAvailableResults, getSchools} from "../../lib/aux_db_calls";
import styles from "./resultados.module.scss"
import Layout from "../../components/Layout/Layout";

export const getStaticProps: GetStaticProps= async ({ params }) => {
    const available = await getAvailableResults("OMA");
    const newProps = {results: available.results}
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