import { useRouter } from "next/router"
import { FormEventHandler, useState } from "react"
import styles from "./results.module.scss"

type ResultProps = {
    competition : string
}

type FilterData = {
    name : string,
    type : string,
    options? : Array<string> | Array<number>
}


const Results = ({competition} : ResultProps) => {
    const router = useRouter()
    const query = router.query
    const filter_input: Array<FilterData> = [
        {name: "año",type:"select",options:[2022,2023,2024]},
        {name:"instancia",type:"select",options:["INTERCOLEGIAL","ZONAL","PROVINCIAL","REGIONAL","NACIONAL"]},
        {name:"nivel",type:"select",options:[1,2,3]},
        {name:"colegio",type:"select",options:["Colegio San Nicolás","Northlands"]},
        {name:"nombre",type:"text"},
        {name:"apellido",type:"text"},
    ]
    const filters = filter_input.map((filterData) => filterData.name)
    const isAQueryOption = (category:string,option:string | number) => {
        return(query[category] != undefined && query[category] == option)
    }
    const render_input = (filter:string) => {
        const data : FilterData | undefined = filter_input.find((filterData) => filterData.name == filter)
        if(data && data.type == "text"){
            return(<input id={data.name} type="text"/>)
        }else if(data && data.type == "select"){
            return(
                <select id={data.name}>
                    {data.options && data.options.map((option) => {
                        return(<option value={option} selected={isAQueryOption(filter,option)}>{option}</option>)
                    })}
                </select>
            )
        }
    }
    const [isLoading,setIsLoading] = useState(false)
    const [results,setResults] = useState<Object>({})
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
    return(
        <>
        <h1 className={styles.title}>Resultados {competition}</h1>
        <form onSubmit={searchResults}>
            {filters.map((filter) => {
                return(
                <div>
                    <label>{filter}</label>{render_input(filter)}
                </div>)
            })}
            <input type="submit" value="Buscar resultados"/>
        </form>
        <div>
            {isLoading ? "Buscando resultados...": JSON.stringify(results)}
        </div>
        </>
    )
}

export default Results