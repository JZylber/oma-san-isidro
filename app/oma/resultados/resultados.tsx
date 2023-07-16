'use client'
import Layout from "../../../components/Layout/Layout"
import Results from "../../../components/ResultsPage/results"
import { yearTests } from "../../../components/ResultsPage/resultsTypes"

const OMAResultsPage = ({results}:{results: Array<yearTests>}) => {
    return(
        <Layout>
            <Results competition="OMA" availableResults={results}/>
        </Layout>
        )
}

export default OMAResultsPage