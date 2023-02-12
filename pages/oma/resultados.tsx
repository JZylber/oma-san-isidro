import { GetServerSideProps, NextPage } from "next";
import NavBar from "../../components/NavBar/Navbar";
import Results from "../../components/ResultsPage/results";
import { School, yearTests } from "../../components/ResultsPage/resultsTypes";
import {getAvailableResults, getSchools} from "../../lib/aux_db_calls";
import styles from "./resultados.module.scss"

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
        <div className={styles.wrapper}> 
        <main className={styles.main}>
        <NavBar/>
        <Results competition="OMA" availableResults={results} schools={schools}/>
        </main>
        </div>
        )
}

export default OMAResults