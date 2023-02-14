import { TypedFilterProps } from "./resultsTypes"


const TypedFilter = ({category_name,values,update_filter} : TypedFilterProps) => {
    return(<span>{category_name}</span>)
}

export default TypedFilter