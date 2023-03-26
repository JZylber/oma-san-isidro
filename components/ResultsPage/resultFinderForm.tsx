import { ChangeEvent, ChangeEventHandler, FormEventHandler, useState } from "react";
import styles from "./resultFinderForm.module.scss"
import {yearTests } from "./resultsTypes"
import SelectResultCategory from "./SelectResultCategory";
import {Button} from "../buttons/Button"

type FormProps = {
    availableResults: Array<yearTests>,
    searchResults : (year: number, instance: string) => void;
}

interface searchParametersType {
    año: number|null, 
    instancia: string|null
}
    
const ResultFinderForm = ({availableResults,searchResults} : FormProps) => {
    const resultYears =  availableResults.map((yearTests) => yearTests.ano);
    const [searchParameters,setSearchParameters] = useState<searchParametersType>({año:null,instancia:null})
    let instances = searchParameters.año?(availableResults.find((result) => result.ano === searchParameters.año) as yearTests).pruebas:[]
    const handleSubmit = () => {
        const {año,instancia} = searchParameters;
        if(año && instancia){
            searchResults(año,instancia);
        }
    }

    return(
    <div className={styles.form}>
        <SelectResultCategory category="Año" value={searchParameters.año} setValue={(value : number) => setSearchParameters({año:value,instancia:null})} options={resultYears}/>
        <SelectResultCategory category="Instancia" value={searchParameters.instancia} setValue={(value : string) => setSearchParameters({...searchParameters,instancia:value})} options={instances}/>
        <div onClick={handleSubmit} className={styles.searchButton}>
            <span>Buscar</span>
        </div>
    </div>)
}

export default ResultFinderForm
