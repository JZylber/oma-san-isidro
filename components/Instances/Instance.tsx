import styles from "./Instance.module.scss";
import { use, useEffect, useState } from "react";
import { Instance } from "./InstanceMenu";
import Loader from "../Loader/Loader";

interface InstanceProps {
    competition: string,
    instance: Instance
}

const months = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"]

const InstanceData = ({competition,instance}:InstanceProps) => {
    const [instanceIsLoading,setInstanceIsLoading] = useState<boolean>(false);
    const {instancia,fecha} = instance;
    const [InstanceData,setInstanceData] = useState<string | undefined>(undefined);
    useEffect(()=>{
        setInstanceData(undefined);},
    [competition,instance])
    useEffect(()=>{
        const fetchInstanceData = async () => {
            const response = await fetch(`/api/instances/${competition}/${instancia}`).then((response) => {
                if(response.ok){
                    return(response.json())}
                else{
                    throw {name: "NetworkError", message: "No se encontraron datos",status: response.status};  
                }});
            console.log(response);
            setInstanceIsLoading(false);
            setInstanceData(response)
        }
        if(!InstanceData){
            setInstanceIsLoading(true);
            fetchInstanceData();
        }
    },[InstanceData,competition,instancia]);
    return(
        <>
        <h2 className={styles.title}>{instancia[0] + instancia.slice(1).toLocaleLowerCase()}</h2>
        <h3 className={styles.subtitle}>{`${fecha.getDate()} de ${months[fecha.getMonth()]}`}</h3>
        {instanceIsLoading ?<Loader/>:<></>}
        </>
    )
}

export default InstanceData