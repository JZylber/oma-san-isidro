import { useState } from "react";
import OptionSelectFilter from "./OptionSelectFilter";
import { ResultFilter, School, TestQueryResults } from "./resultsTypes";
import styles from "./ResultTable.module.scss"
import TypedFilter from "./TypedFilter";

const ResultTable = ({results}:{results? : Array<TestQueryResults>}) => {
    const schools : Array<string> = results ? Array.from(new Set(results.map((result) => result.participacion.colegio.nombre + (result.participacion.colegio.sede?`-${result.participacion.colegio.sede}`:"")))) : []
    const levels : Array<string> = results ? Array.from(new Set(results.map((result) => result.participacion.nivel.toString()))) : []
    const starting_filters : ResultFilter = {nombre: undefined,apellido: undefined,colegio: schools,nivel: levels,aprobado: []}
    const [filters,setFilters] = useState<ResultFilter>(starting_filters)

    const updateFilter = (category: string, newValue: undefined | string | boolean | number | Array<string>) => {
        setFilters({...filters,[category]:newValue})
    }

    const isFilterCompliant = (result: TestQueryResults) => {
        const name = !filters.nombre || result.participacion.participante.nombre.toLowerCase().includes(filters.nombre.toLowerCase())
        const surname = !filters.apellido || result.participacion.participante.apellido.toLowerCase().includes(filters.apellido.toLowerCase())
        const school = filters.colegio.includes(result.participacion.colegio.nombre + (result.participacion.colegio.sede?`-${result.participacion.colegio.sede}`:""))
        const level = filters.nivel.includes(result.participacion.nivel.toString())
        const passed = filters.aprobado.includes(result.aprobado?"Si":"No")
        return(name && surname && school && level && passed) 
    }

    const make_element = (result : TestQueryResults,index : number) => {
        const name = result.participacion.participante.nombre
        const surname = result.participacion.participante.apellido
        const school = result.participacion.colegio.nombre + (result.participacion.colegio.sede?`-${result.participacion.colegio.sede}`:"") 
        const level = result.participacion.nivel
        const points = result.resultados
        const passed = result.aprobado
        return(
            <tr key={index}>
                <td>{name}</td>
                <td>{surname}</td>
                <td>{school}</td>
                <td>{level}</td>
                {points.map((point,index) => <td key={index}>{point}</td>)}
                <td>{passed?"Si":"No"}</td>
            </tr>)
    }
    
    const make_table = (results? : Array<TestQueryResults>) => {
        if(results){
            
            return(
                <table className={styles.result_table}>
                    <thead>
                        <tr>
                            <td><TypedFilter category_name="Nombre" values={results.map((result) => result.participacion.participante.nombre)} update_filter={(newValue : string) => updateFilter("nombre",newValue)}/></td>
                            <td><TypedFilter category_name="Apellido" values={results.map((result) => result.participacion.participante.apellido)} update_filter={(newValue : string) => updateFilter("apellido",newValue)}/></td>
                            <td><OptionSelectFilter category_name="Colegio" values={schools} update_filter={(newValue : Array<string>) => updateFilter("colegio",newValue)} includeSearchBar={true}/></td>
                            <td><OptionSelectFilter category_name="Nivel" values={levels} update_filter={(newValue : Array<string>) => updateFilter("nivel",newValue)}/></td>
                            <td>P1</td>
                            <td>P2</td>
                            <td>P3</td>
                            <td>Total</td>
                            <td><OptionSelectFilter category_name="Aprobado" values={["Si","No"]} update_filter={(newValue : Array<string>) => updateFilter("aprobado",newValue)}/></td>
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
        <div className={styles.results}>
            {make_table(results?.filter(isFilterCompliant))}
        </div>
        </>
    )
}

export default ResultTable