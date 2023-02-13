import { FilterProps } from "./resultsTypes"


const TypedFilter = ({category_name,values} : FilterProps) => {
    return(<span>{category_name}</span>)
}

export default TypedFilter