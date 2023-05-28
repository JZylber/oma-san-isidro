import { useEffect, useState } from "react";
import styles from "./resultFinderForm.module.scss"
import {InstanceData, yearTests } from "./resultsTypes"
import SelectResultCategory from "./SelectResultCategory";
import { useRouter } from "next/router";

type FormProps = {
    availableResults: Array<yearTests>,
    searchResults : (year: number, instance: string) => void;
    clearResults: () => void;
}

interface searchParametersType {
    año: number|undefined, 
    instancia: string|undefined
}

const capitalize = (str : string) => {
    return str.charAt(0).toLocaleUpperCase() + str.slice(1).toLocaleLowerCase();
}

const capitalizeIfNotUndefined = (str : string|undefined) => {
    return str?capitalize(str):undefined;
}

const sortInstances = (ins_a : string, ins_b : string) => {
    const ordered_instances = ["Interescolar","Intercolegial","Zonal","Provincial","Regional","Nacional"];
    return(ordered_instances.indexOf(ins_a) - ordered_instances.indexOf(ins_b)); 
}
    
const ResultFinderForm = ({availableResults,searchResults,clearResults} : FormProps) => {
    const router = useRouter();
    const [checkRoute,setCheckRoute] = useState(false);
    const resultYears =  availableResults.map((yearTests) => yearTests.ano);
    
    const [searchParameters,setSearchParameters] = useState<searchParametersType>({año: undefined,instancia:undefined});
    useEffect(() => {
        if(!checkRoute){
            const {año,instancia} = router.query;
            if(año && instancia){
                const instance = instancia as string;
                const year = Number(año);
                if(resultYears.includes(year) && availableResults.find((result) => result.ano === year)?.pruebas.find((instance) => instance.nombre === instancia))  {
                    setSearchParameters({año:year,instancia:instance});
                    searchResults(year,instance);
                }
            }
        setCheckRoute(true);}
      }, [checkRoute,router,searchResults,setSearchParameters,availableResults,resultYears]);
    let possibleInstances = searchParameters.año?(availableResults.find((result) => result.ano === searchParameters.año) as yearTests).pruebas:[];
    const instances = possibleInstances.map((instance) => instance.nombre);
    const handleSubmit = () => {
        const {año,instancia} = searchParameters;
        if(año && instancia){
            searchResults(año,instancia);
        }
    }
    const setYear = (value? : number) => {
        setSearchParameters({año:value,instancia:undefined});
        clearResults();
    }

    const setInstance = (value? : string) => {
        setSearchParameters({...searchParameters,instancia:value?.toLocaleUpperCase()})
        clearResults();
    }

    return(
    <form className={styles.form}>
        <SelectResultCategory category="Año" value={searchParameters.año} setValue={setYear} options={resultYears}/>
        <SelectResultCategory category="Instancia" value={capitalizeIfNotUndefined(searchParameters.instancia)} setValue={setInstance} options={instances.map(capitalize)} sortOptions={sortInstances}/>
        <div onClick={handleSubmit} className={styles.searchButton}>
            <span>Buscar</span>
        </div>
    </form>)
}

export default ResultFinderForm
