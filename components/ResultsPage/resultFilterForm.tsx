import styles from "./resultFilterForm.module.scss"
import { ResultFilter, School } from "./resultsTypes"
import SelectResultCategory from "./SelectResultCategory"
import FilterIcon from "../../public/images/filter.svg"
import X from "../../public/images/x.svg"
import Modal from "../Popups/Modal"
import { useEffect, useState } from "react"

interface ResultFilterProps{
    filters: ResultFilter,
    updateFilter: (category: string, newValue: undefined | string | boolean | number | School) => void,
    schools: School [],
    names: string [],
    levels: number [],
    passed: boolean []
}

const ResultFilterForm = ({filters,updateFilter,schools,names,levels,passed} : ResultFilterProps) => {
    const [openFilters,setOpenFilters] = useState(false);
    useEffect(() => {
        console.log(filters);
    },[filters]);
    return(
        <div className={styles.container}>
            <div className={styles.mobile_filters} onClick={() => setOpenFilters(true)}>
                <FilterIcon/>
                <span>Más filtros</span>
            </div>
            <form className={styles.filters}>
                <SelectResultCategory category="Participante" value={filters.participante} setValue={(value?: string) => updateFilter("participante",value)} options={names} input={true}/>
                <SelectResultCategory category="Colegio" value={filters.colegio} setValue={(value? : School) => updateFilter("colegio",value)} options={schools} input={true}/>
                <SelectResultCategory category="Nivel" value={filters.nivel} setValue={(value? : number) => updateFilter("nivel",value)} options={levels} clear={true}/>
                <SelectResultCategory category="Aprobado" value={filters.aprobado} setValue={(value? : boolean) => updateFilter("aprobado",value)} options={passed} clear={true}/>
            </form>
            <Modal open={openFilters}>
                <form className={styles.filter_modal}>
                    <div className={styles.close}>
                        <X className={styles.icon} onClick={() => setOpenFilters(false)}/>
                    </div>
                    <p className={styles.title}>Más filtros</p>
                    <SelectResultCategory category="Participante" value={filters.participante} setValue={(value?: string) => updateFilter("participante",value)} options={names} input={true}/>
                    <SelectResultCategory category="Colegio" value={filters.colegio} setValue={(value? : School) => updateFilter("colegio",value)} options={schools} input={true}/>
                </form>
            </Modal>
        </div>
    )
}

export default ResultFilterForm