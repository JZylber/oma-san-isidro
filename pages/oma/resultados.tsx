import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Results from "../../components/ResultsPage/results";
import { School, yearTests } from "../../components/ResultsPage/resultsTypes";
import {getAvailableResults, getSchools} from "../../lib/aux_db_calls";
import styles from "./resultados.module.scss"
import Layout from "../../components/Layout/Layout";

export const getServerSideProps: GetServerSideProps= async ({ params }) => {
    const available = await getAvailableResults("OMA");
    const schools = await getSchools();
    const newProps = {results: available.results,schools: schools.results}
    return {
      props: newProps,
    };     
  };


const OMAResults : NextPage<{results : Array<yearTests>,schools: Array<School>}> = ({results,schools}) => {
    return(
        <>
        <Head>
            <title>Resultados OMA</title>
        </Head>
        <Layout>
            <Results competition="OMA" availableResults={results} schools={schools}/>
        </Layout>
        </>)
}

export default OMAResults