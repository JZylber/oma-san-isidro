import {Result, TestQueryResults } from "./resultsTypes";
import styles from "./ResultTable.module.scss"
import ErrorMessage from "./ErrorMessage";
import { FilterableObject, Participant, School } from "../../hooks/types";
import useFilter from "../../hooks/useFilter";
import Table from "../Table/Table";
import { TestInfo } from "./results";
import SelectResultCategory from "./SelectResultCategory";
import ProvincialResultCard from "./Mobile/ProvincialCard";

export interface ProvincialResult extends FilterableObject{
    participante: Participant,
    colegio: School,
    nivel: number,
    resultado: string
}

const make_element = (result : ProvincialResult,index : number) => {
    const participant = result.participante.toString();
    const school = result.colegio.toString();
    const level = result.nivel;
    const price = result.resultado;
    return(
        <tr key={index}>
            <td>{participant}</td>
            <td className={styles.center_align}>{level}</td>
            <td>{school}</td>
            <td className={styles.center_align}>{price}</td>
        </tr>)
}



const make_download_element = (result : ProvincialResult) => {
    const name = result.participante.name;
    const surname = result.participante.surname;
    const school = result.colegio.toString();
    const level = result.nivel.toString();
    const price = result.resultado;
    return([level,name,surname,school,price])
}

const ProvincialResultTable = ({results,testInfo}:{results : Array<TestQueryResults>, testInfo: TestInfo}) => {
    const{competition,instance,year} = testInfo;
    const strTestInfo = `${competition} ${testInfo.instance.slice(0,1)}${instance.slice(1).toLocaleLowerCase()} ${year}`
    const filterableResults : Array<ProvincialResult> = results.map((result) => {return({
        resultado: result.resultados[0],
        nivel: result.participacion.nivel,
        colegio: new School(result.participacion.colegio.nombre,result.participacion.colegio.sede),
        participante: new Participant(result.participacion.participante.nombre,result.participacion.participante.apellido)
        });
    })

    let headers =  ["Participante","Nivel","Colegio","Premio"]
    
    const downloadHeaders = ["Nivel","Nombre","Apellido","Colegio","Premio"]
    //FILTERING
    const [resultFilter,updateFilter,filtered_results,options] = useFilter(filterableResults)
    
    return(
        <>
            <form className={styles.form}>
                <SelectResultCategory category="Participante" value={resultFilter.participante} setValue={(option?: Participant) => updateFilter({participante: option})} options={options.participante} input/>
                <SelectResultCategory category="Colegio" value={resultFilter.colegio} setValue={(option?: School) => updateFilter({colegio: option})} options={options.colegio} input/>
                <SelectResultCategory category="Nivel" value={resultFilter.nivel} setValue={(option?: number) => updateFilter({nivel: option})} options={options.nivel} clear/>
                <SelectResultCategory category="Premio" value={resultFilter.resultado} setValue={(option?: string) => updateFilter({resultado: option})} options={options.resultado} clear/>
            </form>
            {filtered_results.length > 0?
                <Table 
                    values={filtered_results} 
                    allValues={filterableResults} 
                    headers={headers} 
                    Card={ProvincialResultCard} 
                    elements_per_page={50} 
                    download={true}
                    downloadHeaders={downloadHeaders}
                    process_data={make_download_element}
                    make_element={make_element}
                    testInfo={strTestInfo}
                    center_columns={[1]}
                />:
                <ErrorMessage status={400}/>}
            <p className={styles.disclaimer}>Si hay algún error en el nombre/apellido de algún participante, o algún error en el nombre de algún colegio, por favor mandar un mail a: <a href="mailto:omasanisidro.devs@gmail.com">omasanisidro.devs@gmail.com</a></p>
        </>
    )
}

export default ProvincialResultTable