import { GetServerSideProps, NextPage } from "next";
import NavBar from "../../components/NavBar/Navbar";
import Results from "../../components/ResultsPage/results";
import { ResultProps } from "../../components/ResultsPage/resultsTypes";
import getAvailableResults from "../../lib/aux_db_calls";
import styles from "./resultados.module.scss"

export const getServerSideProps: GetServerSideProps= async ({ params }) => {
    const available = getAvailableResults("ÑANDÚ");
    return {
      props: available,
    };      
  };

const NanduResults : NextPage = (props) => {
    return(
        <div className={styles.wrapper}>
        <main className={styles.main}>
        <NavBar/>
        <Results competition="Ñandú" availableResults={props.results}/>
        </main>
        </div>
        )
}

export default NanduResults