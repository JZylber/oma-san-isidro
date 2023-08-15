import styles from "./Instance.module.scss";
import {useEffect, useState } from "react";
import { Instance } from "./InstanceMenu";
import Loader from "../Loader/Loader";
import Venues, { DropPoint, Venue, VenueParticipant } from "./Venues";
import { getDateFromJSON, getTimeFromJSON } from "../../lib/aux_functions";
import Provincial, { ProvincialParticipant } from "./Provincial";
import { Participant, School } from "../../hooks/types";

interface InstanceProps {
    competition: string,
    instance: Instance,
}

interface RegionalInstance {
    venues: VenueInput[];
    dropPoints: DropPoint[];
    participants: ParticipantInput[];
    auth_max_date?: Date;
    time: Date;
    duration: number;
}
interface ProvincialParticipantInput {
    nombre: string,
    apellido: string,
    nivel: number,
    colegio: {nombre: string, sede?: string}
}
interface ProvincialInstance {
    participants : ProvincialParticipantInput[],
    auth_max_date?: Date;
}
export interface ParticipantInput{
    nombre: string;
    apellido: string;
    colegio: {nombre: string, sede?: string};
    nivel: number;
    sede: string;
}

export interface VenueInput{
    colegio: {nombre: string, sede?: string};
    nombre: string;
    direccion: string;
    localidad: string;
    aclaracion?: string;
}

const months = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"]

const displayInstance = (instance: string, competition: string, instanceData: RegionalInstance | ProvincialInstance | undefined) => {
    if(instance === "PROVINCIAL" &&  instanceData && "participants" in instanceData){
        const provincialInstance = instanceData as ProvincialInstance;
        const participants : ProvincialParticipant[] = provincialInstance.participants.map((participant) => {return{nivel: participant.nivel, participante: new Participant(participant.nombre,participant.apellido), colegio: new School(participant.colegio.nombre,participant.colegio.sede)}});
        return <Provincial competition={competition} participants={participants} auth_max_date={provincialInstance.auth_max_date}/>
    }
    else if(instance === "NACIONAL"){
        return <span className={styles.text}>Proximamente...</span>
    }
    else if(instanceData && "venues" in instanceData){
        const regionalInstance = instanceData as RegionalInstance;
        const venues : Venue[] = regionalInstance.venues.map((venue) => {return{nombre: venue.nombre, direccion: venue.direccion, localidad: venue.localidad, colegio: new School(venue.colegio.nombre,venue.colegio.sede), aclaracion: venue.aclaracion?venue.aclaracion:""}});
        const participants : VenueParticipant[] = regionalInstance.participants.map((participant) => {return {...participant,colegio: new School(participant.colegio.nombre,participant.colegio.sede),participante: new Participant(participant.nombre,participant.apellido)}});
        return <Venues 
        instance={instance}
        type={competition}
        venues={venues} 
        dropPoints={regionalInstance.dropPoints} 
        participants={participants} 
        auth_max_date={regionalInstance.auth_max_date}
        time={regionalInstance.time}
        duration={regionalInstance.duration}/>
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
            if(response.time){
                response.time = getTimeFromJSON(response.time);
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
        <h3 className={styles.subtitle}>{`${fecha.getUTCDate()} de ${months[fecha.getMonth()]}`}</h3>
        {instanceIsLoading ?<Loader/>:
        instanceData && displayInstance(instancia,competition,instanceData)}
        </>
    )
}

export default InstanceData