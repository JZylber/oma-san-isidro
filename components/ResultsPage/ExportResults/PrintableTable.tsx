import { TestQueryResults } from "../resultsTypes"
import { extractResults } from "./CreateFiles"

const PrintableTable = ({results,testInfo}:{results: TestQueryResults[], testInfo: string}) => {
    const {data,columns} = extractResults(results)
    return( 
        <>
            <h1>Resultados {testInfo}</h1>
            <table>
                <thead>
                    <tr>
                        {columns.map((name,idx) => <td key={idx}>{name}</td>)}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row,idx) => {
                        return(
                        <tr key={idx}>
                            {row.map((value,r_idx) => <td key={`${idx}-${r_idx}`}>{value}</td>)}
                        </tr>)
                    })}
                </tbody>
            </table>
        </>)
}

export default PrintableTable