import { useState } from "react";
import OptionSelectFilter from "./OptionSelectFilter";
import { ResultFilter, School, TestQueryResults } from "./resultsTypes";
import styles from "./ResultTable.module.scss"
import SelectResultCategory from "./SelectResultCategory";
import TypedFilter from "./TypedFilter";

const participantName = (result: TestQueryResults) => {
    return(`${result.participacion.participante.nombre} ${result.participacion.participante.apellido}`)
}

const ResultTable = ({results}:{results : Array<TestQueryResults>}) => {
    let schools : Array<School> = Array.from(new Set(results.map((result) => result.participacion.colegio)))
    const genericSchools: Array<School> =Array.from(new Set(schools.filter((school) => school.sede).map((school) => {return({nombre: school.nombre})})));
    schools = schools.concat(genericSchools);
    const names : Array<string> = Array.from(new Set(results.map(participantName)))
    const numberOfProblems = results[0].prueba.cantidad_problemas;
    const starting_filters : ResultFilter = {participante: undefined,colegio: undefined,nivel: undefined,aprobado: undefined}
    const [filters,setFilters] = useState<ResultFilter>(starting_filters)

    const updateFilter = (category: string, newValue: undefined | string | boolean | number | School) => {
        setFilters({...filters,[category]:newValue})
    }

    const isFilterCompliant = (result: TestQueryResults) => {
        const name = !filters.participante || participantName(result) === (filters.participante.toLowerCase())
        const school = !filters.colegio || ((filters.colegio.nombre === result.participacion.colegio.nombre) && (!filters.colegio.sede || filters.colegio.sede === result.participacion.colegio.sede))
        const level = !filters.nivel || filters.nivel === result.participacion.nivel
        const passed = filters.aprobado === undefined || filters.aprobado === result.aprobado
        return(name && school && level && passed) 
    }

    const make_element = (result : TestQueryResults,index : number) => {
        const name = result.participacion.participante.nombre
        const surname = result.participacion.participante.apellido
        const school = result.participacion.colegio.nombre + (result.participacion.colegio.sede?`-${result.participacion.colegio.sede}`:"") 
        const level = result.participacion.nivel
        const points = result.resultados
        const passed = result.aprobado
        const present = result.presente
        return(
            <tr key={index}>
                <td>{name}</td>
                <td>{surname}</td>
                <td>{school}</td>
                <td>{level}</td>
                {numberOfProblems>0 && (present ? points.map((point,index) => <td key={index}>{point}</td>): <td colSpan={numberOfProblems + 1}>Ausente</td>)}
                <td>{passed?"Si":"No"}</td>
            </tr>)
    }
    
    const make_table = (results? : Array<TestQueryResults>) => {
        if(results){
            
            return(
                <table className={styles.result_table}>
                    <thead>
                        <tr>
                            <td><TypedFilter category_name="Nombre" values={Array.from(new Set(results.map((result) => result.participacion.participante.nombre)))} update_filter={(newValue : string) => updateFilter("nombre",newValue)}/></td>
                            <td><TypedFilter category_name="Apellido" values={Array.from(new Set(results.map((result) => result.participacion.participante.apellido)))} update_filter={(newValue : string) => updateFilter("apellido",newValue)}/></td>
                            <td>Colegio</td>
                            <td>Nivel</td>
                            {numberOfProblems > 0 &&
                                <>
                                {Array.from(new Array(numberOfProblems), (x, i) => i + 1).map((number) => <td key={number}>{`P${number}`}</td>)}
                                <td>Total</td>
                                </>
                            }
                            <td>Aprobado</td>
                        </tr>
                    </thead>
                    <tbody><>
                        {results.map((result,index) => make_element(result,index))}
                        </>
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
            <SelectResultCategory category="Participante" value={filters.participante} setValue={(value?: string) => updateFilter("participante",value)} options={names} clear={true}/>
            <SelectResultCategory category="Colegio" value={filters.colegio} setValue={(value? : School) => updateFilter("colegio",value)} options={schools} clear={true}/>
            <SelectResultCategory category="Nivel" value={filters.nivel} setValue={(value? : number) => updateFilter("nivel",value)} options={[1,2,3]} clear={true}/>
            <SelectResultCategory category="Aprobado" value={filters.aprobado} setValue={(value? : boolean) => updateFilter("aprobado",value)} options={[true,false]} clear={true}/>
        </div>
        <div className={styles.results}>
        </div>
        </>
    )
}

export default ResultTable