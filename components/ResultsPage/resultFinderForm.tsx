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

const sortInstances = (ins_a : string, ins_b : string) => {
    const ordered_instances = ["INTERESCOLAR","INTERCOLEGIAL","ZONAL","PROVINCIAL","REGIONAL","NACIONAL"];
    return(ordered_instances.indexOf(ins_a) - ordered_instances.indexOf(ins_b)); 
}

const instanceIsAvailable = (instance: string, env: string, vercel_env?: string, availableInstances?: Array<InstanceData>) => {
    if(availableInstances){
        const selected_instance = availableInstances.find((inst) => inst.nombre === instance);
        if(selected_instance){
            if(env === "production" && vercel_env?vercel_env === "production":false){
                return(selected_instance.disponible);
            } else {
                return(true);
            }
        }
    }
    return(false);
}

    
const ResultFinderForm = ({availableResults,searchResults,clearResults} : FormProps) => {
    const router = useRouter();
    const [checkRoute,setCheckRoute] = useState(false);
    const env = process.env.NODE_ENV;
    const vercel_env = process.env.VERCEL_ENV;

    let possible_years = availableResults;
    if(env === "production"&& vercel_env?vercel_env === "production":false){
        possible_years = possible_years.filter((yearTests) => yearTests.pruebas.some((test) => test.disponible));
    }
    const resultYears =  possible_years.map((yearTests) => yearTests.ano);
    
    const [searchParameters,setSearchParameters] = useState<searchParametersType>({año: undefined,instancia:undefined});
    useEffect(() => {
        if(!checkRoute){
            const {año,instancia} = router.query;
            if(año && instancia){
                const instance = instancia as string;
                const year = Number(año);
                if(resultYears.includes(year) && instanceIsAvailable(instance,env,vercel_env,availableResults.find((result) => result.ano === year)?.pruebas)  ){
                    setSearchParameters({año:year,instancia:instance});
                    searchResults(year,instance);
                }
            }
        setCheckRoute(true);}
      }, [checkRoute,router,searchResults,setSearchParameters,availableResults,resultYears,env,vercel_env]);
    let possibleInstances = searchParameters.año?(availableResults.find((result) => result.ano === searchParameters.año) as yearTests).pruebas:[];
    if(env === "production" && vercel_env?vercel_env === "production":false){
        possibleInstances = possibleInstances.filter((instance) => instance.disponible);
    }
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
        setSearchParameters({...searchParameters,instancia:value})
        clearResults();
    }

    return(
    <form className={styles.form}>
        <SelectResultCategory category="Año" value={searchParameters.año} setValue={setYear} options={resultYears}/>
        <SelectResultCategory category="Instancia" value={searchParameters.instancia} setValue={setInstance} options={instances} sortOptions={sortInstances}/>
        <div onClick={handleSubmit} className={styles.searchButton}>
            <span>Buscar</span>
        </div>
    </form>)
}

export default ResultFinderForm
