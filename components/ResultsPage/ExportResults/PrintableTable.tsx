import { TestQueryResults } from "../resultsTypes"
import { extractResults } from "./CreateFiles"
import styles from './PrintableTable.module.scss';

const PrintableTable = ({results,testInfo}:{results: TestQueryResults[], testInfo: string}) => {
    const {data,columns} = extractResults(results)
    return( 
        <div className={styles.container}>
            <h1 className={styles.title}>Resultados {testInfo}</h1>
            <table className={styles.result_table}>
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