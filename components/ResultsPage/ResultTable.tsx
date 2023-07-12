import {Result, TestQueryResults } from "./resultsTypes";
import styles from "./ResultTable.module.scss"
import ErrorMessage from "./ErrorMessage";
import ResultFilterForm from "./resultFilterForm";
import { Participant, Problem, Problems, School } from "../../hooks/types";
import useFilter from "../../hooks/useFilter";
import Table from "../Table/Table";
import ResultCard from "./Mobile/ResultCard";

const make_element = (result : Result,index : number) => {
    const participant = result.participante.toString();
    const school = result.colegio.toString();
    const level = result.nivel;
    const points = result.resultados.problems;
    const total = result.resultados.total;
    const passed = result.aprobado;
    const present = result.presente;
    const clarification = result.aclaracion;
    const hasPoints = present && !clarification;
    return(
        <tr key={index}>
            <td>{participant}</td>
            <td className={styles.center_align}>{level}</td>
            <td>{school}</td>
            {result.cantidad_problemas>0 && (hasPoints ? 
                <>
                {points.map((point,index) => <td key={index} className={styles.center_align}>{point.toString()}</td>)}
                <td className={styles.center_align}>{total}</td>
                </>:
                <td colSpan={result.cantidad_problemas + 1} className={styles.center_align}>{present?clarification:"Ausente"}</td>)}
            <td className={styles.center_align}>{passed?"Si":"No"}</td>
        </tr>)
}

const make_download_element = (result : Result) => {
    const name = result.participante.name;
    const surname = result.participante.surname;
    const school = result.colegio.toString();
    const level = result.nivel.toString();
    const points = result.resultados.problems;
    const total = result.resultados.total.toString();
    const passed = result.aprobado;
    const present = result.presente;
    const clarification = result.aclaracion;
    const hasPoints = present && !clarification;
    return([level,name,surname,school].concat(hasPoints?points.map((point) => point.toString()):[],[total,passed?"Si":(!present?"Ausente":(clarification?clarification:"No"))]))
}

const ResultTable = ({results,testInfo}:{results : Array<TestQueryResults>, testInfo: string}) => {
    const filterableResults : Array<Result> = results.map((result) => {return({
        cantidad_problemas: result.prueba.cantidad_problemas,
        presente: result.presente,
        aclaracion: result.aclaracion?result.aclaracion:"",
        aprobado: result.aprobado,
        resultados: new Problems(
            result.resultados.slice(0,-1).map((result) => new Problem(Number(result[0]),(result.match(/-/g)||[]).length)),
            Number(result.resultados[-1])),
        nivel: result.participacion.nivel,
        colegio: new School(result.participacion.colegio.nombre,result.participacion.colegio.sede),
        participante: new Participant(result.participacion.participante.nombre,result.participacion.participante.apellido)
        });
    })
    const headers = ["Nivel","Participante","Colegio"].concat(Array.from({ length: filterableResults[0].cantidad_problemas }, (value, index) => `P${index + 1}`),["Total","Aprobado"])
    const downloadHeaders = ["Nivel","Nombre","Apellido","Colegio"].concat(Array.from({ length: filterableResults[0].cantidad_problemas }, (value, index) => `P${index + 1}`),["Total","Aprobado"])
    //FILTERING
    const [resultFilter,updateFilter,filtered_results,options] = useFilter(filterableResults)
    
    return(
        <>
            <ResultFilterForm filters={resultFilter} updateFilter={updateFilter} schools={options.colegio} names={options.participante} levels={options.nivel} passed={options.aprobado}/>
            {filtered_results.length > 0?
                <Table 
                    values={filtered_results} 
                    allValues={filterableResults} 
                    headers={headers} 
                    Card={ResultCard} 
                    elements_per_page={50} 
                    download={true}
                    downloadHeaders={downloadHeaders}
                    process_data={make_download_element}
                    make_element={make_element}
                    testInfo={testInfo}
                />:
                <ErrorMessage status={400}/>}
            <p className={styles.disclaimer}>Si hay algún error en el nombre/apellido de algún participante, o algún error en el nombre de algún colegio, por favor mandar un mail a: <a href="mailto:omasanisidro.devs@gmail.com">omasanisidro.devs@gmail.com</a></p>
        </>
    )
}

export default ResultTable