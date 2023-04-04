import { useState } from "react";
import { ResultFilter, School, TestQueryResults } from "./resultsTypes";
import styles from "./ResultTable.module.scss"
import SelectIcon from "../../public/images/menuSelectIcon.svg";
import Arrow from "../../public/images/newsArrow.svg"
import NoResults from "./NoResults";
import ResultFilterForm from "./resultFilterForm";
import DownloadPopup from "./ExportResults/DownloadModal";
import ResultCard from "./Mobile/ResultCard";

export const participantName = (result: TestQueryResults) => {
    return(`${result.participacion.participante.nombre} ${result.participacion.participante.apellido}`)
}

const removeRepeatedSchools = (schools : School []) => {
    return schools.filter((value, index, self) =>
        index === self.findIndex((t) => (
            t.nombre === value.nombre && t.sede === value.sede && t.localidad === value.localidad
  ))
)
}

const ResultTable = ({results,testInfo}:{results : Array<TestQueryResults>, testInfo: string}) => {
    const numberOfProblems = results[0].prueba.cantidad_problemas;
    const starting_filters : ResultFilter = {participante: undefined,colegio: undefined,nivel: undefined,aprobado: undefined}
    const [filters,setFilters] = useState<ResultFilter>(starting_filters)

    const updateFilter = (category: string, newValue: undefined | string | boolean | number | School) => {
        setFilters({...filters,[category]:newValue})
        setPage(0);
    }

    const isFilterCompliant = (result: TestQueryResults) => {
        const name = !filters.participante || participantName(result) === (filters.participante)
        const school = !filters.colegio || ((filters.colegio.nombre === result.participacion.colegio.nombre) && (!filters.colegio.sede || filters.colegio.sede === result.participacion.colegio.sede))
        const level = !filters.nivel || filters.nivel === result.participacion.nivel
        const passed = filters.aprobado === undefined || filters.aprobado === result.aprobado
        return(name && school && level && passed) 
    }

    const make_element = (result : TestQueryResults,index : number) => {
        const participant = participantName(result)
        const school = result.participacion.colegio.nombre + (result.participacion.colegio.sede?`-${result.participacion.colegio.sede}`:"") 
        const level = result.participacion.nivel
        const points = result.resultados
        const passed = result.aprobado
        const present = result.presente
        return(
            <tr key={index}>
                <td>{participant}</td>
                <td className={styles.center_align}>{level}</td>
                <td>{school}</td>
                {numberOfProblems>0 && (present ? points.map((point,index) => <td key={index} className={styles.center_align}>{point}</td>): <td colSpan={numberOfProblems + 1} className={styles.center_align}>Ausente</td>)}
                <td className={styles.center_align}>{passed?"Si":"No"}</td>
            </tr>)
    }
    //FILTERING
    let filtered_results = results.filter(isFilterCompliant);
    let filterData: {schools: Array<School>, names: Set<string>, levels: Set<number>, passed: Set<boolean>} = {schools: [],names: new Set(), levels: new Set(), passed: new Set()};
    filtered_results.forEach((result) =>{
        filterData.schools.push(result.participacion.colegio);
        filterData.names.add(participantName(result));
        filterData.levels.add(result.participacion.nivel);
        filterData.passed.add(result.aprobado);
    })
    let schools : Array<School> = removeRepeatedSchools(filterData.schools);
    const genericSchools: Array<School> =removeRepeatedSchools(schools.filter((school) => school.sede).map((school) => {return({nombre: school.nombre})}));
    schools = schools.concat(genericSchools);
    const names : Array<string> = Array.from(new Set(filtered_results.map(participantName)));
    const levels: Array<number> = Array.from(filterData.levels);
    const passed: Array<boolean> = Array.from(filterData.passed);
    //PAGINATION
    const [page,setPage] = useState(0);
    const page_size = 50
    let max_pages =  Math.ceil(filtered_results.length / page_size) - 1;
    let firstResult = page * page_size
    let lastResult = Math.min((page + 1)*page_size,filtered_results.length)
    const results_in_page = filtered_results.slice(firstResult,lastResult)
    const nextPage = () => {
        if(page<max_pages){
            setPage(page + 1);
        }
    }
    const prevPage = () => {
        if(page > 0){
            setPage(page - 1);
        }
    }
    const pagination = 
        <div className={styles.pagination}>
            <p>Mostrando {firstResult + 1}-{lastResult} de {filtered_results.length}</p>
            <div className={[styles.prev,page===0 && styles.greyed].join(" ")} onClick={prevPage}><SelectIcon/></div>
            <div className={[styles.next,page===max_pages && styles.greyed].join(" ")} onClick={nextPage}><SelectIcon/></div>
        </div>
    const mobile_pagination = 
        <div className={styles.mobile_pagination}>
            <p>Mostrando {firstResult + 1}-{lastResult} de {filtered_results.length}</p>
            <div className={styles.page_select}>
                <div className={[styles.prev,page===0 && styles.greyed].join(" ")} onClick={prevPage}><SelectIcon/></div>
                <div className={styles.pages}>
                    {page >= 2 && <div className={styles.item} onClick={() => setPage(0)}>{1}</div>}
                    {page >= 3 && <div className={styles.item}>...</div>}
                    {page >= 1 && <div className={styles.item} onClick={() => setPage(page - 1)}>{page}</div>}
                    <div className={[styles.item,styles.selected].join(" ")}>{page + 1}</div>
                    {(max_pages - page) >= 1 && <div className={styles.item} onClick={() => setPage(page + 1)}>{page + 2}</div>}
                    {(max_pages - page) >= 3 && <div className={styles.item}>...</div>}
                    {(max_pages - page) >= 2 && <div className={styles.item} onClick={() => setPage(max_pages)}>{max_pages + 1}</div>}
                </div>
                <div className={[styles.next,page===max_pages && styles.greyed].join(" ")} onClick={nextPage}><SelectIcon/></div>
            </div>
        </div>
    //Download Modal
    const [openDownloadPopup,setOpenDownloadPopup] = useState(false);
    const make_table = (results? : Array<TestQueryResults>) => {
        if(results){
            return(
                <table className={styles.result_table}>
                    <thead>
                        <tr>
                            <td>Participante</td>
                            <td className={styles.center_align}>Nivel</td>
                            <td>Colegio</td>
                            {numberOfProblems > 0 &&
                                <>
                                {Array.from(new Array(numberOfProblems), (x, i) => i + 1).map((number) => <td key={number} className={styles.center_align}>{`P${number}`}</td>)}
                                <td className={styles.center_align}>Total</td>
                                </>
                            }
                            <td className={styles.center_align}>Aprobado</td>
                        </tr>
                    </thead>
                    <tbody>
                        {results.map((result,index) => make_element(result,index))}
                    </tbody>
                </table>)
        } else {
            return(
                <span>Elija un año e instancia y luego haga click en buscar resultados</span>
            )
        }
    }
    const table =
    <>
    {mobile_pagination}
    <div className={styles.table_header}>
        <div className={styles.downloadButton} onClick={() => setOpenDownloadPopup(true)}>
            <span>Descargar</span>
            <div className={styles.arrow}>
                <Arrow/>
            </div>
        </div>
        {pagination}
    </div>
    <div className={styles.results}>
        {make_table(results_in_page)}
    </div>
    <div className={styles.mobile_results}>
        {results_in_page.map((result,idx) => <ResultCard key={idx} result={result}/>)}
    </div>
    <div className={styles.table_footer}>
        {pagination}
    </div>
    </>
    return(
        <>
            <ResultFilterForm filters={filters} updateFilter={updateFilter} schools={schools} names={names} levels={levels} passed={passed}/>
            {filtered_results.length > 0?table:<NoResults/>}
            <DownloadPopup 
                open={openDownloadPopup} 
                setOpen={setOpenDownloadPopup}
                testInfo={testInfo}
                results={results}
                filteredResults={filtered_results}
            />
        </>
    )
}

export default ResultTable