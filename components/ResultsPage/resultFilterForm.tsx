import styles from "./resultFilterForm.module.scss"
import { ResultFilter, School } from "./resultsTypes"
import SelectResultCategory from "./SelectResultCategory"

interface ResultFilterProps{
    filters: ResultFilter,
    updateFilter: (category: string, newValue: undefined | string | boolean | number | School) => void,
    schools: School [],
    names: string []
}

const ResultFilterForm = ({filters,updateFilter,schools,names} : ResultFilterProps) => {
    return(
        <form className={styles.filters}>
            <SelectResultCategory category="Participante" value={filters.participante} setValue={(value?: string) => updateFilter("participante",value)} options={names} input={true}/>
            <SelectResultCategory category="Colegio" value={filters.colegio} setValue={(value? : School) => updateFilter("colegio",value)} options={schools} input={true}/>
            <SelectResultCategory category="Nivel" value={filters.nivel} setValue={(value? : number) => updateFilter("nivel",value)} options={[1,2,3]} clear={true}/>
            <SelectResultCategory category="Aprobado" value={filters.aprobado} setValue={(value? : boolean) => updateFilter("aprobado",value)} options={[true,false]} clear={true}/>
        </form>
    )
}

export default ResultFilterForm