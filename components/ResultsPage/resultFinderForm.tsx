import { useEffect, useState } from "react";
import styles from "./resultFinderForm.module.scss"
import {TestInfo, yearTests} from "./resultsTypes"
import SelectResultCategory from "./SelectResultCategory";
import {useSearchParams } from "next/navigation";
import { INSTANCIA } from "@prisma/client";

type FormProps = {
    availableResults: Array<yearTests>,
    data: Partial<TestInfo>,
    setData: (data: Partial<TestInfo>) => void,
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
    
const ResultFinderForm = ({availableResults,data,setData} : FormProps) => {
    const query = useSearchParams();
    const [checkRoute,setCheckRoute] = useState<boolean>(false);
    const resultYears =  availableResults.map((yearTests) => yearTests.ano);
    useEffect(() => {
        if(!checkRoute && query){
            const año = query.get("año");
            const instancia = query.get("instancia");
            if(año && instancia){
                const instance = instancia as string;
                const year = Number(año);
                if(resultYears.includes(year) && availableResults.find((result) => result.ano === year)?.pruebas.find((instance) => instance.nombre === instancia))  {
                    setData({año:year,instancia:(instance.toUpperCase()) as INSTANCIA});
                }
            }
        setCheckRoute(true);}
      }, [checkRoute,query,setData,availableResults,resultYears]);
    let possibleInstances = data.año?(availableResults.find((result) => result.ano === data.año) as yearTests).pruebas:[];
    const instances = possibleInstances.map((instance) => instance.nombre);
    const setYear = (value? : number) => {
        setData({año:value,instancia:undefined})
    }
    const setInstance = (value? : string) => {
        setData({instancia:(value?.toUpperCase()) as INSTANCIA})
    }

    return(
    <form className={styles.form}>
        <SelectResultCategory category="Año" value={data.año} setValue={setYear} options={resultYears}/>
        <SelectResultCategory category="Instancia" value={capitalizeIfNotUndefined(data.instancia)} setValue={setInstance} options={instances.map(capitalize)} sortOptions={sortInstances}/>
        {/*<div onClick={handleSubmit} className={styles.searchButton}>
            <span>Buscar</span>
        </div>*/}
    </form>)
}

export default ResultFinderForm
