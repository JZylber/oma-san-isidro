import { useRouter } from "next/router"
import { type } from "os"
import { FormEventHandler, useState } from "react"

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
        {name: "año",type:"select",options:[2012,2013,2014,2015,2016]},
        {name:"instancia",type:"select",options:["intercolegial","zonal","regional"]},
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
    const [results,setResults] = useState<string>("")
    const searchResults : FormEventHandler<HTMLFormElement>= (event : React.SyntheticEvent) => {
        event.preventDefault();
        const target = event.target as typeof event.target & {
            año: { value: string };
            instancia: { value: string };
            colegio: { value: string };
            nombre: { value: string };
            apellido: { value: string };
        };
        setResults(`Se buscaron resultados para ${target.año.value}, ${target.instancia.value}, ${target.colegio.value}, ${target.nombre.value}, ${target.apellido.value}`)
    }
    return(
        <>
        <h1>Resultados {competition}</h1>
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
            {results}
        </div>
        </>
    )
}

export default Results