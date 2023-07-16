'use client'
import Layout from "../../../components/Layout/Layout"
import Results from "../../../components/ResultsPage/results"
import { yearTests } from "../../../components/ResultsPage/resultsTypes"

const NanduResultsPage = ({results}:{results: Array<yearTests>}) => {
    return(
        <Layout>
            <Results competition="Ñandú" availableResults={results}/>
        </Layout>
        )
}

export default NanduResultsPage