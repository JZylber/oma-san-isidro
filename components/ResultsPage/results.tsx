import {useReducer} from "react"
import ResultFinderForm from "./resultFinderForm"
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
            return(<span className="font-montserrat font-normal text-[1.6rem]">Selecciona una instancia para ver resultados.</span>)
        } else {
            return(<span className="font-montserrat font-normal text-[1.6rem]">Selecciona año e instancia para poder ejecutar una búsqueda.</span>)
        }
    };

    return(
        <>
        <p className="tablet:hidden font-unbounded font-light text-[2rem] mt-[3.6rem]">{competition.toLocaleLowerCase()}</p>
        <h1 className="font-unbounded font-medium max-tablet:text-[2.9rem] max-tablet:mt-[.8rem] max-tablet:mb-[4rem] tablet:max-desktop:text-[3.7rem] tablet:max-desktop:mb-[3.2rem] desktop:text-[6rem] desktop:mb-[5.6rem] tablet:col-span-full">Resultados</h1>
        <ResultFinderForm availableResults={availableResults} data={testInfo} setData={dispatch}/>
        {displayResults()}
        </>
    );
}

export default Results