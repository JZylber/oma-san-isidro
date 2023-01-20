import { useRouter } from "next/router"
import { FormEventHandler, useState } from "react"
import styles from "./results.module.scss"

interface yearTests {
    ano: number,
    pruebas: Array<{instancia: string}>
}

type ResultProps = {
    competition : string,
    availableResults: Array<yearTests>
}

type FilterData = {
    name : string,
    type : string,
    options? : Array<string> | Array<number>
}

interface TestQueryResults {
    presente : boolean,
    aprobado : boolean,
    resultados : Array<string>,
    participacion : {
        nivel : number,
        colegio: {
            nombre: string,
            sede: string
        }
        participante: {
            nombre: string,
            apellido : string
        }
    }
}

const Results = ({competition,availableResults} : ResultProps) => {
    const router = useRouter()
    const query = router.query
    const resultYears =  availableResults.map((yearTests) => yearTests.ano);
    const filter_input: Array<FilterData> = [
        {name: "año",type:"select",options: resultYears},
        {name:"instancia",type:"select",options:["INTERCOLEGIAL","ZONAL","PROVINCIAL","REGIONAL","NACIONAL"]},
        {name:"nivel",type:"select",options:[1,2,3]},
        {name:"colegio",type:"select",options:["Colegio San Nicolás","Northlands"]},
        {name:"nombre",type:"text"},
        {name:"apellido",type:"text"},
    ]
    const filters = filter_input.map((filterData) => filterData.name)
    const getQueryOption = (category:string) => {
        if(query[category] != undefined){
            return(query[category])
        }else{
            return("")
        }
        
    }
    const render_input = (filter:string) => {
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
    }
    const [isLoading,setIsLoading] = useState(false)
    const [results,setResults] = useState<Array<TestQueryResults>>()
    const getResults = async (year : number,instance : string, type: string)=> {
        try {
            let searchedResults = await fetch(`/api/results?ano=${year}&instancia=${instance}&competencia=${type}`).then((response) => response.json());
            setIsLoading(false)
            setResults(searchedResults)
        } catch (error) {
            console.error(error);
        }
    }
    const nameAsDB = (name: string) => {
        if(name == "Ñandú"){
            return("NANDU")
        } else {
            return("OMA")
        }
    }
    const searchResults : FormEventHandler<HTMLFormElement>= (event : React.SyntheticEvent) => {
        event.preventDefault();
        const target = event.target as typeof event.target & {
            año: { value: number };
            instancia: { value: string };
            colegio: { value: string };
            nombre: { value: string };
            apellido: { value: string };
        };
        getResults(target.año.value,target.instancia.value,nameAsDB(competition))
        setIsLoading(true)
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
                            <td>Aprobado</td>
                        </tr>
                    </thead>
                    <tbody>
                        {results.map(result => make_element(result))}
                    </tbody>
                </table>)
        } else {
            return(
                <span>Error</span>
            )
        }
    }
    return(
        <>
        <h1 className={styles.title}>Resultados {competition}</h1>
        <form className={styles.form} onSubmit={searchResults}>
            {filters.map((filter) => {
                return(
                <div>
                    <label>{filter}</label>{render_input(filter)}
                </div>)
            })}
            <input type="submit" value="Buscar resultados"/>
        </form>
        <div className={styles.results}>
            {isLoading ? "Buscando resultados...": make_table(results)}
        </div>
        </>
    )
}

export default Results