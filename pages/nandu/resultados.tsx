import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import NavBar from "../../components/NavBar/Navbar";
import Results from "../../components/ResultsPage/results";
import {School, yearTests } from "../../components/ResultsPage/resultsTypes";
import {getAvailableResults, getSchools} from "../../lib/aux_db_calls";
import styles from "./resultados.module.scss"

export const getServerSideProps: GetServerSideProps= async ({ params }) => {
    const available = await getAvailableResults("ÑANDÚ");
    const schools = await getSchools();
    const newProps = {results: available.results,schools: schools.results}
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
        <div className={styles.wrapper}>
        <main className={styles.main}>
        <NavBar/>
        <Results competition="Ñandú" availableResults={results} schools={schools}/>
        </main>
        </div>
        </>
        )
}

export default NanduResults