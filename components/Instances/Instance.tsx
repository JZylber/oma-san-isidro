import styles from "./Instance.module.scss";
import {useEffect, useState } from "react";
import { Instance } from "./InstanceMenu";
import Loader from "../Loader/Loader";
import Venues, { DropPoint, Venue, VenueParticipant } from "./Venues";
import { getDateFromJSON, getTimeFromJSON } from "../../lib/aux_functions";
import Provincial, { ProvincialParticipant } from "./Provincial";
import { Participant, School } from "../../hooks/types";
import { INSTANCIA } from "@prisma/client";
import VenueInfo from "./VenueInfo";
import ProvincialInfo from "./ProvincialInfo";

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
    else{
        return <span className={styles.text}>Proximamente...</span>
    }
};

const InstanceData = ({competition,instance}:InstanceProps) => {
    const {instancia,fecha} = instance;
    return(
        <>
        <h2 className={styles.title}>{instancia[0] + instancia.slice(1).toLocaleLowerCase()}</h2>
        <h3 className={styles.subtitle}>{`${fecha.getUTCDate()} de ${months[fecha.getMonth()]}`}</h3>
        {instancia === "PROVINCIAL" && competition=="OMA" && <span className={styles.text}>Proximamente...</span>}
        {instancia === "PROVINCIAL" && competition=="ÑANDÚ" && <ProvincialInfo competition={competition}/>}
        {instancia === "NACIONAL" && <span className={styles.text}>Proximamente...</span>}
        {instancia !== "PROVINCIAL" && instancia !== "NACIONAL" && 
            <VenueInfo 
            instance={instancia as INSTANCIA}
            competition={competition}/>
        }
        </>
    )
}

export default InstanceData