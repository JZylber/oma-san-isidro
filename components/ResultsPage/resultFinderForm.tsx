import { ChangeEvent, ChangeEventHandler, FormEventHandler, useState } from "react";
import styles from "./resultFinderForm.module.scss"
import { ResultProps, TestQueryResults, yearTests } from "./resultsTypes"

type FormProps = {
    availableResults: Array<yearTests>,
    searchResults : (year: number, instance: string) => void;
}
    
const ResultFinderForm = ({availableResults,searchResults} : FormProps) => {
    const resultYears =  availableResults.map((yearTests) => yearTests.ano);
    const [instances,setInstances] = useState(availableResults[0].pruebas)
    const handleSubmit : FormEventHandler<HTMLFormElement>= (event : React.SyntheticEvent) => {
        event.preventDefault();
        const target = event.target as typeof event.target & {
            año: { value: number };
            instancia: { value: string };
        };
        searchResults(target.año.value,target.instancia.value);
    }
    const handleYearChange:ChangeEventHandler<HTMLSelectElement>= (event : ChangeEvent) => {
        const target = event.target as typeof event.target & {
            value: number
        };
        const newInstances = availableResults.find((year) => year.ano == target.value)?.pruebas
        newInstances && setInstances(newInstances)
    }

    return(
    <form className={styles.form} onSubmit={handleSubmit}>
        <label>Año</label><select id="año" onChange={handleYearChange}>{resultYears.map((year) => {return(<option value={year} key={year}>{year}</option>)})}</select>
        <label>Instancia</label><select id="instancia">{instances.map((instance) => {return(<option value={instance} key={instance}>{instance}</option>)})}</select>
        <input type="submit" value="Buscar resultados"/>
    </form>)
}

export default ResultFinderForm
