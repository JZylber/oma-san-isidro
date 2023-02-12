import { useRouter } from "next/router"
import {ChangeEvent, FormEvent, useCallback, useEffect, useState } from "react"
import Autosuggest from "react-autosuggest"
import ResultFinderForm from "./resultFinderForm"
import styles from "./results.module.scss"
import {ResultFilter, ResultProps, TestQueryResults } from "./resultsTypes"

const Results = ({competition,availableResults} : ResultProps) => {
    const router = useRouter()
    const query = router.query
    const [isLoading,setIsLoading] = useState(false)
    const [results,setResults] = useState<Array<TestQueryResults>>()
    const nameAsDB = (name: string) => {
        if(name == "Ñandú"){
            return("ÑANDÚ")
        } else {
            return("OMA")
        }
    }
    const getResults = async (year : number,instance : string, type: string)=> {
        try {
            let searchedResults = await fetch(`/api/results?ano=${year}&instancia=${instance}&competencia=${type}`).then((response) => response.json());
            setIsLoading(false)
            setResults(searchedResults)
        } catch (error) {
            console.error(error);
        }
    }
    const searchResults = useCallback((year : number, instance: string) => {
        getResults(year,instance,nameAsDB(competition))
        setIsLoading(true)
    },[competition])
    
    useEffect(() => {
        if(query["año"] && query["instancia"]){
            const instance = query["instancia"] as string;
            searchResults(Number(query["año"]),instance)
        }
      }, [query,searchResults])
    const starting_filters : ResultFilter = {nombre: undefined,apellido: undefined,colegio: undefined,nivel: undefined,aprobado: undefined}
    const [filters,setFilters] = useState<ResultFilter>(starting_filters)

    const updateFilter = (category: string, newValue: undefined | string | boolean | number) => {
        setFilters({...filters,[category]:newValue})
    }

    const isFilterCompliant = (result: TestQueryResults) => {
        const name = !filters.nombre || result.participacion.participante.nombre.toLowerCase().includes(filters.nombre.toLowerCase())
        const surname = !filters.apellido || result.participacion.participante.apellido.toLowerCase().includes(filters.apellido.toLowerCase())
        const school = !filters.colegio || result.participacion.colegio.nombre.toLowerCase().includes(filters.colegio.toLowerCase())
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
                            <td>Nombre</td>
                            <td>Apellido</td>
                            <td>Colegio</td>
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
    type School = {
        nombre : string,
        sede?: string,
        localidad: string
    }
    const schools : Array<School> = [{nombre:"San Nicolás",sede:"Olivos",localidad:"Olivos"},{nombre: "Mallinkrodt", sede: undefined, localidad: "Martinez"}]
    const getSuggestions = (value : string) => {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;
      
        return inputLength === 0 ? [] : schools.filter(school =>
          school.nombre.toLowerCase().replace('.','').includes(inputValue)
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
      };
    return(
        <>
        <h1 className={styles.title}>Resultados {competition}</h1>
        <ResultFinderForm availableResults={availableResults} searchResults={searchResults}/>
        <form className={styles.form}>
            <label>Nombre</label><input onChange={(event) => updateFilter("nombre",event.target.value)}></input><br/>
            <label>Apellido</label><input onChange={(event) => updateFilter("apellido",event.target.value)}></input><br/>
            <Autosuggest 
                suggestions={schools}
                onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                onSuggestionsClearRequested={onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={{
                    value: filters["colegio"] || "",
                    onChange:(_, { newValue, method }) => {
                        updateFilter("colegio",newValue);
                      }
                }}/><br/>
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
            {isLoading ? "Buscando resultados...": make_table(results?.filter(isFilterCompliant))}
        </div>
        </>
    )
}

export default Results