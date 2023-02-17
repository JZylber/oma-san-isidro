import { useRouter } from "next/router"
import {useCallback, useEffect, useState } from "react"
import ResultFinderForm from "./resultFinderForm"
import styles from "./results.module.scss"
import {ResultProps,TestQueryResults } from "./resultsTypes"
import ResultTable from "./ResultTable"

const Results = ({competition,availableResults} : ResultProps) => {
    const router = useRouter()
    const query = router.query
    const [isLoading,setIsLoading] = useState(false)
    const [results,setResults] = useState<Array<TestQueryResults>>()
    const nameAsDB = (name: string) => {
        if(name == "Ñandú"){
            return("ÑANDÚ")
        } else {
            return("OMA")
        }
    }
    const getResults = async (year : number,instance : string, type: string)=> {
        try {
            let searchedResults = await fetch(`/api/results?ano=${year}&instancia=${instance}&competencia=${type}`).then((response) => response.json());
            setIsLoading(false)
            setResults(searchedResults)
        } catch (error) {
            console.error(error);
        }
    }
    const searchResults = useCallback((year : number, instance: string) => {
        getResults(year,instance,nameAsDB(competition))
        setIsLoading(true)
    },[competition])
    
    useEffect(() => {
        if(query["año"] && query["instancia"]){
            const instance = query["instancia"] as string;
            searchResults(Number(query["año"]),instance)
        }
      }, [query,searchResults])
    
    return(
        <>
        <h1 className={styles.title}>Resultados {competition}</h1>
        <ResultFinderForm availableResults={availableResults} searchResults={searchResults}/>
        {isLoading ? "Buscando resultados...": (results?<ResultTable results={results}/>:"¡Elegí un año y una instancia y hacé click en buscar resultados!")}
        </>
    )
}

export default Results