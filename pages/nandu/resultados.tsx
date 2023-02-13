import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Results from "../../components/ResultsPage/results";
import {School, yearTests } from "../../components/ResultsPage/resultsTypes";
import {getAvailableResults, getSchools} from "../../lib/aux_db_calls";
import styles from "./resultados.module.scss"
import Layout from "../../components/Layout/Layout";

export const getServerSideProps: GetServerSideProps= async ({ params }) => {
    const available = await getAvailableResults("ÑANDÚ");
    const newProps = {results: available.results}
    return {
      props: newProps,
    };      
  };

const NanduResults : NextPage<{results: Array<yearTests>,schools: Array<School>}> = ({results,schools}) => {
    return(
        <>
        <Head>
          <title>Resultados Ñandú</title>
        </Head>
        <Layout>
            <Results competition="Ñandú" availableResults={results}/>
        </Layout>
        </>
        )
}

export default NanduResults