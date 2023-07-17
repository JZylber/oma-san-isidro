'use client'
import Results from "../../../../components/ResultsPage/results"
import { yearTests } from "../../../../components/ResultsPage/resultsTypes"

const OMAResultsPage = ({results}:{results: Array<yearTests>}) => {
    return(<Results competition="OMA" availableResults={results}/>)
}

export default OMAResultsPage