import { NextPage } from "next";
import NavBar from "../../components/NavBar/Navbar";
import Results from "../../components/ResultsPage/results";
import styles from "./resultados.module.scss"

const OMAResults : NextPage = () => {
    return(
        <div className={styles.wrapper}> 
        <main className={styles.main}>
        <NavBar/>
        <Results competition="OMA"/>
        </main>
        </div>
        )
}

export default OMAResults