import {useCallback, useState } from "react"
import Loader from "../Loader/Loader"
import ErrorMessage from "./ErrorMessage"
import ResultFinderForm from "./resultFinderForm"
import styles from "./results.module.scss"
import {ResultProps,TestQueryResults } from "./resultsTypes"
import ResultTable from "./ResultTable"

const Results = ({competition,availableResults} : ResultProps) => {
    const [isLoading,setIsLoading] = useState(false);
    const [results,setResults] = useState<Array<TestQueryResults> | undefined>();
    const [testInfo,setTestInfo] = useState<string>("");
    const nameAsDB = (name: string) => {
        if(name == "Ñandú"){
            return("ÑANDÚ")
        } else {
            return("OMA")
        }
    };
    const getResults = useCallback(async (year : number,instance : string, type: string)=> {
        try {
            let searchedResults = await fetch(`/api/results?secret=${process.env.API_TOKEN}&ano=${year}&instancia=${instance}&competencia=${type}`).then((response) => response.json());
            setIsLoading(false);
            setTestInfo(`${competition} ${instance.slice(0,1)}${instance.slice(1).toLocaleLowerCase()} ${year}`)
            setResults(searchedResults);
        } catch (error) {
            console.error(error);
        }
    },[competition,setIsLoading,setTestInfo,setResults]);
    const searchResults = useCallback((year : number, instance: string) => {
        getResults(year,instance,nameAsDB(competition));
        setIsLoading(true);
    },[competition,getResults]);

    const clearResults = () => {
        setResults(undefined);
    };
    const displayResults = (results?: TestQueryResults[]) => {
        if(results === undefined){
            return(<span className={styles.infoText}>Selecciona año e instancia para poder ejecutar una búsqueda.</span>)
        }else if(results.length === 0){
            return(<ErrorMessage/>)
        }else{
            return(<ResultTable results={results} testInfo={testInfo}/>)
        }
    };

    return(
        <>
        <p className={styles.competition}>{competition.toLocaleLowerCase()}</p>
        <h1 className={styles.title}>Resultados</h1>
        <ResultFinderForm availableResults={availableResults} searchResults={searchResults} clearResults={clearResults}/>
        {isLoading ? <Loader/> : displayResults(results)}
        </>
    );
}

export default Results