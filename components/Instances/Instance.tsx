import styles from "./Instance.module.scss";
import {useEffect, useState } from "react";
import { Instance } from "./InstanceMenu";
import Loader from "../Loader/Loader";
import Venues, { DropPoint, Participant, Venue } from "./Venues";
import { getDateFromJSON } from "../../lib/aux_functions";
import Provincial, { ProvincialParticipant } from "./Provincial";

interface InstanceProps {
    competition: string,
    instance: Instance
}

interface RegionalInstance {
    venues: Venue[];
    dropPoints: DropPoint[];
    participants: Participant[];
    auth_max_date?: Date;
}
 interface ProvincialInstance {
    participants : ProvincialParticipant[]
 }

const months = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"]

const displayInstance = (instance: string, competition: string, instanceData: RegionalInstance | ProvincialInstance | undefined) => {
    if(instance === "PROVINCIAL"){
        const provincialInstance = instanceData as ProvincialInstance;
        return <Provincial competition={competition} participants={provincialInstance.participants}/>
    }
    else if(instance === "NACIONAL"){
        return <span className={styles.text}>Proximamente...</span>
    }
    else if(instanceData){
        const regionalInstance = instanceData as RegionalInstance;
        return <Venues 
        instance={instance}
        type={competition}
        venues={regionalInstance.venues} 
        dropPoints={regionalInstance.dropPoints} 
        participants={regionalInstance.participants} 
        auth_max_date={regionalInstance.auth_max_date}/>
    }
    else{
        return <span className={styles.text}>Proximamente...</span>
    }
};

const InstanceData = ({competition,instance}:InstanceProps) => {
    const [instanceIsLoading,setInstanceIsLoading] = useState<boolean>(false);
    const {instancia,fecha} = instance;
    const [instanceData,setInstanceData] = useState<ProvincialInstance | RegionalInstance | undefined>(undefined);
    useEffect(()=>{
        setInstanceData(undefined);
    },
    [competition,instance])
    useEffect(()=>{
        const fetchInstanceData = async () => {
            let response = await fetch(`/api/instancias/${competition}/${instancia}`).then((response) => {
                if(response.ok){
                    return(response.json())}
                else{
                    throw {name: "NetworkError", message: "No se encontraron datos",status: response.status,response: response};  
                }});
            if(response.auth_max_date){
                response.auth_max_date = getDateFromJSON(response.auth_max_date);
            }
            setInstanceData(response);
            setInstanceIsLoading(false);
        }
        if(instanceData === undefined){
            setInstanceIsLoading(true);
            fetchInstanceData();
        }
    },[instanceData,competition,instancia]);
    return(
        <>
        <h2 className={styles.title}>{instancia[0] + instancia.slice(1).toLocaleLowerCase()}</h2>
        <h3 className={styles.subtitle}>{`${fecha.getDate()} de ${months[fecha.getMonth()]}`}</h3>
        {instanceIsLoading ?<Loader/>:
        instanceData && displayInstance(instancia,competition,instanceData)}
        </>
    )
}

export default InstanceData