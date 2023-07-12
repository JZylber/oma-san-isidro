import Link from "next/link";
import styles from "./Venues.module.scss";
import Image from "next/image";
import SelectResultCategory from "../ResultsPage/SelectResultCategory";
import { useState } from "react";
import { removeRepeatedSchools } from "../ResultsPage/ResultTable";
import Table from "../Table/Table";
import VenueCard from "./VenueCard";
import ParticipantCard from "./ParticipantCard";
import { Filterables, Participant, School } from "../../hooks/types";
import useFilter from "../../hooks/useFilter";

export interface VenueInput{
    colegio: {nombre: string, sede?: string};
    nombre: string;
    direccion: string;
    localidad: string;
    aclaracion?: string;
}

export interface DropPoint {
    localidad: string,
    nombre?: string,
    direccion: string,
    aclaracion?: string,
}

export interface ParticipantInput{
    nombre: string;
    apellido: string;
    colegio: {nombre: string, sede?: string};
    nivel: number;
    sede: string;
}

interface VenueProps {
    type: string;
    instance: string;
    venues: VenueInput[];
    dropPoints: DropPoint[];
    participants: ParticipantInput[];
    auth_max_date?: Date;
}

export interface Venue extends Record<string,Filterables> {
    nombre: string;
    direccion: string;
    localidad: string;
    colegio: School;
    aclaracion: string;
}

export interface VenueParticipant extends Record<string,Filterables> {
    nivel: number;
    sede: string;
    colegio: School;
    participante: Participant;
}

const makeVenueElement = (venue : Venue,index : number,clarifications?: boolean) => {
    return(
        <tr key={index}>
            <td>{venue.colegio.toString()}</td>
            <td>{venue.nombre}</td>
            <td>{venue.direccion}</td>
            <td>{venue.localidad}</td>
            {clarifications && <td>{venue.aclaracion}</td>}
        </tr>)
}

const downloadParticipantData = (participant : VenueParticipant):Array<string> => {
    return([participant.nivel.toString(),participant.participante.name,participant.participante.surname,participant.colegio.toString(),participant.sede])
}

const downloadParticipantHeaders = ["Nivel","Nombre","Apellido","Colegio","Sede"]

const makeParticipantElement = (participant : VenueParticipant,index : number) => {
    return(
        <tr key={index}>
            <td>{participant.nivel}</td>
            <td>{participant.participante.toString()}</td>
            <td>{participant.colegio.toString()}</td>
            <td>{participant.sede}</td>
        </tr>)
}

const Venues = ({type,instance,dropPoints,venues,auth_max_date,participants}:VenueProps) => {
    //Venues
    const hasDisclaimers = venues.reduce((disclaimers : number,venue: VenueInput) => {
        return disclaimers + (venue.aclaracion !== null?1:0);
    },0) > 0;
    const newVenues : Venue[] = venues.map((venue) => {return {nombre: venue.nombre,direccion: venue.direccion, localidad: venue.localidad,colegio: new School(venue.colegio.nombre,venue.colegio.sede),aclaracion: venue.aclaracion?venue.aclaracion:""}});
    const newParticipants = participants.map((participant) => {return {...participant,colegio: new School(participant.colegio.nombre,participant.colegio.sede),participante: new Participant(participant.nombre,participant.apellido)}});
    const [venueFilter,updateVenueFilter,filteredVenues,venueOptions] = useFilter<Venue>(newVenues);
    const [participantFilter,updateParticipantFilter,filteredParticipants,participantOptions] = useFilter<VenueParticipant>(newParticipants);
    const participant_headers = ["Nivel","Participante","Colegio","Sede"];
    const venue_headers = ["Colegio","Sede","Dirección","Localidad"];
    if(hasDisclaimers) {
        venue_headers.push("Aclaración");
    }
    return(
        <>
            {dropPoints.length > 0 &&
                <>
                <h2 className={styles.section_title}>Autorizaciones</h2>
                <p className={styles.text}>Las autorizaciones se pueden conseguir <Link href={type == "OMA"?"/oma/autorizacion":"/nandu/autorizacion"}>aquí<div className={styles.icon}><Image src="/images/pageLinkIcon.svg" fill={true} alt=""/></div></Link> y deben estar <span className={styles.bold}>completas</span> con las <span className={styles.bold}>firmas y sellos correspondientes</span>. Estas se pueden entregar hasta el <span className={styles.bold}>{auth_max_date?`${auth_max_date.getDate()}/${auth_max_date.getMonth() + 1}`:"(A definir)"}</span> en los siguientes puntos:</p>
                <ul className={styles.dropPoints}>
                    {dropPoints.map((dropPoint, index) => {
                        const {localidad, nombre, direccion, aclaracion} = dropPoint;
                        return(<li className={styles.text} key={index}><span className={styles.bold}>{localidad}: </span>{nombre?`${nombre} - `:""}{direccion}{aclaracion?` (${aclaracion})`:""}</li>)
                    })}
                </ul>
                </>
            }
            {venues.length > 0 &&
            <>
            <h2 className={styles.section_title}>Sedes</h2>
            <p className={styles.text}>Presentarse <span className={styles.bold}>13:30 hs</span>. ¡No se olviden de las autorizaciones!</p>
            <h3 className={styles.section_subtitle}>Colegios por sede</h3>
            <form className={styles.form}>
                <SelectResultCategory category="Colegio" value={venueFilter.colegio} setValue={(option?: School) => updateVenueFilter({colegio: option})} options={venueOptions.colegio as School[]} input={true}/>
                <SelectResultCategory category="Sede" value={venueFilter.nombre} setValue={(option?: string) => updateVenueFilter({nombre: option})} options={venueOptions.nombre as string[]} input={true}/>
            </form>
            <Table 
                values={filteredVenues}
                allValues={newVenues} 
                headers={venue_headers} 
                Card={VenueCard} 
                elements_per_page={10}
                make_element={hasDisclaimers?(result,index) => makeVenueElement(result,index,true):makeVenueElement}
                />
            <h3 className={styles.section_subtitle}>Alumnos por sede</h3>
            <form className={styles.form}>
                <SelectResultCategory category="Participante" value={participantFilter.participante} setValue={(option?: Participant) => updateParticipantFilter({participante: option})} options={participantOptions.participante as Participant[]} input={true}/>
                <SelectResultCategory category="Colegio" value={participantFilter.colegio} setValue={(option?: School) => updateParticipantFilter({colegio: option})} options={participantOptions.colegio as School[]} input={true}/>
                <SelectResultCategory category="Sede" value={participantFilter.sede} setValue={(option?: string) => updateParticipantFilter({sede:option})} options={participantOptions.sede as string[]} input={true}/>
                <SelectResultCategory category="Nivel" value={participantFilter.nivel} setValue={(option? : number) => updateParticipantFilter({nivel:option})} options={participantOptions.nivel as number[]} clear={true}/>
            </form>
            <Table 
                values={filteredParticipants} 
                allValues={newParticipants} 
                headers={participant_headers} 
                Card={ParticipantCard} 
                elements_per_page={50} 
                download={true}
                downloadHeaders={downloadParticipantHeaders}
                process_data={downloadParticipantData}
                make_element={makeParticipantElement}
                testInfo={`${type == "OMA"?"OMA":"Nandú"} ${instance} ${(new Date).getFullYear()}`}
            />
        </>}
        {dropPoints.length === 0 && venues.length === 0 && <p className={styles.text}>Proximamente...</p>}
        </>
    )
}

export default Venues