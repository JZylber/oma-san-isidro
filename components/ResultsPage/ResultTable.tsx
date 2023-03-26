import { useState } from "react";
import { ResultFilter, School, TestQueryResults } from "./resultsTypes";
import styles from "./ResultTable.module.scss"
import SelectResultCategory from "./SelectResultCategory";
import SelectIcon from "../../public/images/menuSelectIcon.svg";

const participantName = (result: TestQueryResults) => {
    return(`${result.participacion.participante.nombre} ${result.participacion.participante.apellido}`)
}

const removeRepeatedSchools = (schools : School []) => {
    return schools.filter((value, index, self) =>
        index === self.findIndex((t) => (
            t.nombre === value.nombre && t.sede === value.sede && t.localidad === value.localidad
  ))
)
}

const ResultTable = ({results}:{results : Array<TestQueryResults>}) => {
    let schools : Array<School> = removeRepeatedSchools(results.map((result) => result.participacion.colegio));
    const genericSchools: Array<School> =removeRepeatedSchools(schools.filter((school) => school.sede).map((school) => {return({nombre: school.nombre})}));
    schools = schools.concat(genericSchools);
    const names : Array<string> = Array.from(new Set(results.map(participantName)))
    const numberOfProblems = results[0].prueba.cantidad_problemas;
    const starting_filters : ResultFilter = {participante: undefined,colegio: undefined,nivel: undefined,aprobado: undefined}
    const [filters,setFilters] = useState<ResultFilter>(starting_filters)

    const updateFilter = (category: string, newValue: undefined | string | boolean | number | School) => {
        setFilters({...filters,[category]:newValue})
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
                <td>{level}</td>
                <td>{school}</td>
                {numberOfProblems>0 && (present ? points.map((point,index) => <td key={index}>{point}</td>): <td colSpan={numberOfProblems + 1}>Ausente</td>)}
                <td>{passed?"Si":"No"}</td>
            </tr>)
    }
    let filtered_results = results.filter(isFilterCompliant);
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
    const make_table = (results? : Array<TestQueryResults>) => {
        if(results){
            return(
                <table className={styles.result_table}>
                    <thead>
                        <tr>
                            <td>Participante</td>
                            <td>Nivel</td>
                            <td>Colegio</td>
                            {numberOfProblems > 0 &&
                                <>
                                {Array.from(new Array(numberOfProblems), (x, i) => i + 1).map((number) => <td key={number}>{`P${number}`}</td>)}
                                <td>Total</td>
                                </>
                            }
                            <td>Aprobado</td>
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
    return(
        <>
        <div className={styles.filters}>
            <SelectResultCategory category="Participante" value={filters.participante} setValue={(value?: string) => updateFilter("participante",value)} options={names} input={true}/>
            <SelectResultCategory category="Colegio" value={filters.colegio} setValue={(value? : School) => updateFilter("colegio",value)} options={schools} input={true}/>
            <SelectResultCategory category="Nivel" value={filters.nivel} setValue={(value? : number) => updateFilter("nivel",value)} options={[1,2,3]} clear={true}/>
            <SelectResultCategory category="Aprobado" value={filters.aprobado} setValue={(value? : boolean) => updateFilter("aprobado",value)} options={[true,false]} clear={true}/>
        </div>
        <div className={styles.table_header}>
            {pagination}
        </div>
        <div className={styles.results}>
            {make_table(results_in_page)}
        </div>
        </>
    )
}

export default ResultTable