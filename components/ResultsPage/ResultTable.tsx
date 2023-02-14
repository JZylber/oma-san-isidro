import { useState } from "react";
import OptionSelectFilter from "./OptionSelectFilter";
import { ResultFilter, School, TestQueryResults } from "./resultsTypes";
import styles from "./ResultTable.module.scss"
import TypedFilter from "./TypedFilter";

const ResultTable = ({results}:{results? : Array<TestQueryResults>}) => {
    const schools : Array<string> = results ? Array.from(new Set(results.map((result) => result.participacion.colegio.nombre + (result.participacion.colegio.sede?`-${result.participacion.colegio.sede}`:"")))) : []
    const starting_filters : ResultFilter = {nombre: undefined,apellido: undefined,colegio: schools,nivel: undefined,aprobado: undefined}
    const [filters,setFilters] = useState<ResultFilter>(starting_filters)

    const updateFilter = (category: string, newValue: undefined | string | boolean | number | Array<string>) => {
        setFilters({...filters,[category]:newValue})
    }

    const isFilterCompliant = (result: TestQueryResults) => {
        const name = !filters.nombre || result.participacion.participante.nombre.toLowerCase().includes(filters.nombre.toLowerCase())
        const surname = !filters.apellido || result.participacion.participante.apellido.toLowerCase().includes(filters.apellido.toLowerCase())
        const school = filters.colegio.includes(result.participacion.colegio.nombre + (result.participacion.colegio.sede?`-${result.participacion.colegio.sede}`:""))
        const level = !filters.nivel || result.participacion.nivel == filters.nivel
        const passed = filters.aprobado == undefined || result.aprobado == filters.aprobado
        return(name && surname && school && level && passed) 
    }

    const make_element = (result : TestQueryResults) => {
        const name = result.participacion.participante.nombre
        const surname = result.participacion.participante.apellido
        const school = result.participacion.colegio.nombre + (result.participacion.colegio.sede?`-${result.participacion.colegio.sede}`:"") 
        const level = result.participacion.nivel
        const points = result.resultados
        const passed = result.aprobado
        return(
            <tr>
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
                            <td><OptionSelectFilter category_name="Colegio" values={schools} update_filter={(newValue : Array<string>) => updateFilter("colegio",newValue)}/></td>
                            <td>Nivel</td>
                            <td>P1</td>
                            <td>P2</td>
                            <td>P3</td>
                            <td>Total</td>
                            <td>Aprobado</td>
                        </tr>
                    </thead>
                    <tbody>
                        {results.map(result => make_element(result))}
                    </tbody>
                </table>)
        } else {
            return(
                <span>Elija un año e instancia y luego haga click en buscar resultados</span>
            )
        }
    }
    /*
    const getSuggestions = (value : string) => {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;
      
        return inputLength === 0 ? [] : schools.filter(school =>
          school.nombre.toLowerCase().replace('.','').normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(inputValue)
        );
      };
      const getSuggestionValue = (suggestion : School) => suggestion.nombre;
      const renderSuggestion = (suggestion : School) => (
        <div>
          {suggestion.nombre}
        </div>
      );
    const [schoolSuggestions,setSchoolSuggestions] = useState<Array<School>>([])
    const onSuggestionsFetchRequested = (
        {value}:{value : string}) => {
        setSchoolSuggestions(getSuggestions(value))
      };
    const onSuggestionsClearRequested = () => {
        setSchoolSuggestions([])
      };*/
    return(
        <>
        <form className={styles.form}>
            <label>Nombre</label><input onChange={(event) => updateFilter("nombre",event.target.value)}></input><br/>
            <label>Apellido</label><input onChange={(event) => updateFilter("apellido",event.target.value)}></input><br/>
            {/*<label>Colegio</label><Autosuggest 
                suggestions={schoolSuggestions}
                onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                onSuggestionsClearRequested={onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={{
                    value: filters["colegio"] || "",
                    onChange:(_, { newValue, method }) => {
                        updateFilter("colegio",newValue);
                      }
                }}/>*/}
            <label>Nivel</label>
                <input type="radio" id="1" name="nivel" value="1" onChange={(event) => updateFilter("nivel",Number(event.target.value))}/>
                <label>1</label>
                <input type="radio" id="2" name="nivel" value="2" onChange={(event) => updateFilter("nivel",Number(event.target.value))}/>
                <label>2</label>
                <input type="radio" id="3" name="nivel" value="3" onChange={(event) => updateFilter("nivel",Number(event.target.value))}/>
                <label>3</label>
                <input type="radio" id="Todos" name="nivel" value="Todos" onChange={(event) => updateFilter("nivel",undefined)}/>
                <label>Todos</label><br/>
            <label>Aprobado</label>
                <input type="radio" id="Si" name="aprobado" value="Si" onChange={(event) => updateFilter("aprobado",true)}/>
                <label>Sí</label>
                <input type="radio" id="No" name="aprobado" value="No" onChange={(event) => updateFilter("aprobado",false)}/>
                <label>No</label>
                <input type="radio" id="Todos" name="aprobado" value="Todos" onChange={(event) => updateFilter("aprobado",undefined)}/>
                <label>Todos</label>
        </form>
        <div className={styles.results}>
            {make_table(results?.filter(isFilterCompliant))}
        </div>
        </>
    )
}

export default ResultTable