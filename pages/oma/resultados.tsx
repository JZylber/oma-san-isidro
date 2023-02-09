import { GetServerSideProps, NextPage } from "next";
import NavBar from "../../components/NavBar/Navbar";
import Results from "../../components/ResultsPage/results";
import getAvailableResults from "../../lib/aux_db_calls";
import styles from "./resultados.module.scss"

export const getServerSideProps: GetServerSideProps= async ({ params }) => {
    const available = getAvailableResults("OMA");
    return {
      props: available,
    };      
  };


const OMAResults : NextPage = (props) => {
    return(
        <div className={styles.wrapper}> 
        <main className={styles.main}>
        <NavBar/>
        <Results competition="OMA" availableResults={props.results}/>
        </main>
        </div>
        )
}

export default OMAResults