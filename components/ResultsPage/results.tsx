import {useReducer} from "react"
import ResultFinderForm from "./resultFinderForm"
import styles from "./results.module.scss"
import {ResultProps,TestInfo} from "./resultsTypes"
import LoadResults from "./loadResults"

const reducer = (state: Partial<TestInfo>, action: Partial<TestInfo>) => {
    return {...state, ...action}
}

const nameAsDB = (name: string) => {
    if(name == "Ñandú"){
        return("ÑANDÚ")
    } else {
        return("OMA")
    }
};


const Results = ({competition,availableResults} : ResultProps) => {
    const [testInfo, dispatch] = useReducer(reducer,{competencia: nameAsDB(competition)});
    const displayResults = () => {
        if(testInfo.año && testInfo.instancia){
            return(<LoadResults {...testInfo as TestInfo}/>)
        } else if(testInfo.año && !testInfo.instancia){
            return(<span className={styles.infoText}>Selecciona una instancia para ver resultados.</span>)
        } else {
            return(<span className={styles.infoText}>Selecciona año e instancia para poder ejecutar una búsqueda.</span>)
        }
    };

    return(
        <>
        <p className={styles.competition}>{competition.toLocaleLowerCase()}</p>
        <h1 className={styles.title}>Resultados</h1>
        <ResultFinderForm availableResults={availableResults} data={testInfo} setData={dispatch}/>
        {displayResults()}
        </>
    );
}

export default Results