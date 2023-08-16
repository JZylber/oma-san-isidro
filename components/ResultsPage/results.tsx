import {useCallback, useState } from "react"
import Loader from "../Loader/Loader"
import ErrorMessage from "./ErrorMessage"
import ResultFinderForm from "./resultFinderForm"
import styles from "./results.module.scss"
import {ResultProps,TestInfo,TestQueryResults } from "./resultsTypes"
import { INSTANCIA } from "@prisma/client"
import LoadResults from "./loadResults"

const Results = ({competition,availableResults} : ResultProps) => {
    const [testInfo,setTestInfo] = useState<TestInfo | null>(null);
    const nameAsDB = (name: string) => {
        if(name == "Ñandú"){
            return("ÑANDÚ")
        } else {
            return("OMA")
        }
    };
    const searchResults = useCallback((year : number, instance: string) => {
        setTestInfo({competencia: nameAsDB(competition), año: year, instancia: instance as INSTANCIA});
    },[competition,setTestInfo]);

    const clearResults = () => {
        setTestInfo(null);
    };
    const displayResults = () => {
        if(testInfo){
            return(<LoadResults {...testInfo}/>)
        } else{
            return(<span className={styles.infoText}>Selecciona año e instancia para poder ejecutar una búsqueda.</span>)
        }
    };

    return(
        <>
        <p className={styles.competition}>{competition.toLocaleLowerCase()}</p>
        <h1 className={styles.title}>Resultados</h1>
        <ResultFinderForm availableResults={availableResults} searchResults={searchResults} clearResults={clearResults}/>
        {displayResults()}
        </>
    );
}

export default Results