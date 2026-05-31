import { TestQueryResults } from "../resultsTypes"
import { extractResults } from "./CreateFiles"

const PrintableTable = ({results,testInfo}:{results: TestQueryResults[], testInfo: string}) => {
    const {data,columns} = extractResults(results)
    return(
        <div className="box-border w-[210mm] m-[5mm]">
            <h1 className="font-unbounded font-medium text-[10mm]">Resultados {testInfo}</h1>
            <table className="w-full border-collapse text-[4mm] [&_thead]:bg-primary-light-blue [&_thead]:border-b-2 [&_thead]:border-primary-black [&_thead]:font-unbounded [&_thead]:font-medium [&_tbody]:font-montserrat [&_tbody]:font-medium [&_tbody_tr]:border-b [&_tbody_tr]:border-[grey] [&_td]:p-[1.3mm] [&_td]:pr-[2.6mm]">
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
        </div>)
}

export default PrintableTable