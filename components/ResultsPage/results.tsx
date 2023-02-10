import { useRouter } from "next/router"
import { FormEventHandler, useState } from "react"
import ResultFinderForm from "./resultFinderForm"
import styles from "./results.module.scss"
import { FilterData, ResultFilter, ResultProps, TestQueryResults } from "./resultsTypes"



const Results = ({competition,availableResults} : ResultProps) => {
    const router = useRouter()
    const query = router.query

    const getQueryOption = (category:string) => {
        if(query[category] != undefined){
            return(query[category])
        }else{
            return("")
        }
        
    }
    /*const render_input = (filter:string) => {
        const data : FilterData | undefined = filter_input.find((filterData) => filterData.name == filter)
        if(data && data.type == "text"){
            return(<input id={data.name} type="text"/>)
        }else if(data && data.type == "select"){
            return(
                <select id={data.name} defaultValue={getQueryOption(filter)}>
                    {data.options && data.options.map((option) => {
                        return(<option value={option}>{option}</option>)
                    })}
                </select>
            )
        }
    }*/
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
    const searchResults = (year : number, instance: string) => {
        getResults(year,instance,nameAsDB(competition))
        setIsLoading(true)
    }
    const starting_filters : ResultFilter = {nombre: undefined,apellido: undefined,colegio: undefined,nivel: undefined,aprobado: undefined}
    const [filters,setFilters] = useState<ResultFilter>(starting_filters)

    const filterElements = (result: TestQueryResults) => {
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
                {points.map((point) => <td>{point}</td>)}
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
    return(
        <>
        <h1 className={styles.title}>Resultados {competition}</h1>
        <ResultFinderForm availableResults={availableResults} searchResults={searchResults}/>
        <form>
            <label>Nombre</label><input></input><br/>
            <label>Apellido</label><input></input><br/>
            <label>Colegio</label><input></input><br/>
            <label>Nivel</label>
                <input type="radio" id="1" name="nivel" value="1"/>
                <label>1</label>
                <input type="radio" id="2" name="nivel" value="2"/>
                <label>2</label>
                <input type="radio" id="3" name="nivel" value="3"/>
                <label>3</label>
                <input type="radio" id="Todos" name="nivel" value="Todos"/>
                <label>Todos</label>
        </form>
        <div className={styles.results}>
            {isLoading ? "Buscando resultados...": make_table(results)}
        </div>
        </>
    )
}

export default Results