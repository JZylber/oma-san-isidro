import {useCallback, useState } from "react"
import Loader from "../Loader/Loader"
import ErrorMessage from "./ErrorMessage"
import ResultFinderForm from "./resultFinderForm"
import styles from "./results.module.scss"
import {ResultProps,TestQueryResults } from "./resultsTypes"
import ResultTable from "./ResultTable"

interface NetworkError extends Error {
    status: number;
}

const normalizeString = (str: string) => {  
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

const Results = ({competition,availableResults} : ResultProps) => {
    const [isLoading,setIsLoading] = useState(false);
    const [results,setResults] = useState<Array<TestQueryResults> | undefined>();
    const [testInfo,setTestInfo] = useState<string>("");
    const [status,setStatus] = useState(200);
    const nameAsDB = (name: string) => {
        if(name == "Ñandú"){
            return("ÑANDÚ")
        } else {
            return("OMA")
        }
    };
    const getResults = useCallback(async (year : number,instance : string, type: string)=> {
        try {
            let searchedResults = await fetch(`/api/results?secret=${process.env.API_TOKEN}&ano=${year}&instancia=${instance}&competencia=${type}`)
                .then((response) => {
                    if(response.ok){
                        return(response.json())}
                    else{
                        throw {name: "NetworkError", message: "No se encontraron resultados",status: response.status};  
                    }})
                .catch((error) => {throw error});
            setTestInfo(`${competition} ${instance.slice(0,1)}${instance.slice(1).toLocaleLowerCase()} ${year}`)
            setStatus(200);
            //searchedResults.sort(sortByNames);
            setResults(searchedResults);
        } catch (error) {
            let networkError = error as NetworkError;
            if(networkError){
                setStatus(networkError.status);
            } else{
                setStatus(600);
            }
        } finally {
            setIsLoading(false);
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
        if(results !== undefined && status === 200){
            if(results.length > 0){
                return(<ResultTable results={results} testInfo={testInfo}/>);
            } else {
                return(<ErrorMessage status={400}/>)
            }
           
        } else if(status !== 200){
            return(<ErrorMessage status={status}/>)
        }
        else{
            return(<span className={styles.infoText}>Selecciona año e instancia para poder ejecutar una búsqueda.</span>)
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