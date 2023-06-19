import Link from "next/link";
import styles from "./Venues.module.scss";
import table_styles from "../ResultsPage/ResultTable.module.scss";
import Image from "next/image";
import SelectResultCategory from "../ResultsPage/SelectResultCategory";
import { useState } from "react";
import { School } from "../ResultsPage/resultsTypes";
import { removeRepeatedSchools } from "../ResultsPage/ResultTable";
import Table from "../Table/Table";
import VenueCard from "./VenueCard";
import ParticipantCard from "./ParticipantCard";

export interface Venue<SchoolType>{
    colegio: SchoolType;
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

export interface Participant{
    nombre: string;
    apellido: string;
    colegio: School;
    nivel: number;
    sede: string;
}

interface VenueProps {
    type: string;
    instance: string;
    venues: Venue<School>[];
    dropPoints: DropPoint[];
    participants: Participant[];
    auth_max_date?: Date;
}

interface VenueFilters{
    colegio?: School;
    sede?: string;
}

interface ParticipantFilters{
    nivel?: number;
    nombreApellido?: string;
    colegio?: School;
    sede?: string;
}

export const schoolName = (school: School) => {
    return(school.nombre + (school.sede?`-${school.sede}`:""))
}

export const participantName = (nombre: string, apellido: string) => {
    return(`${nombre} ${apellido}`)
}

const renderVenue = (venue: Venue<School>,clarifications: boolean) : Venue<string> => {
    const {colegio,nombre,direccion,localidad,aclaracion} = venue;
    const base_venue = {colegio: schoolName(colegio),nombre,direccion,localidad}
    if(clarifications){
        return({...base_venue,aclaracion})
    }else{
        return(base_venue)
    }
}

const downloadParticipantData = (participant : Participant):Array<string> => {
    return([participant.nivel.toString(),participant.nombre,participant.apellido,schoolName(participant.colegio),participant.sede])
}

const downloadParticipantHeaders = ["Nivel","Nombre","Apellido","Colegio","Sede"]

const makeParticipantElement = (participant : Participant,index : number) => {
    return(
        <tr key={index}>
            <td>{participant.nivel}</td>
            <td>{participantName(participant.nombre,participant.apellido)}</td>
            <td>{schoolName(participant.colegio)}</td>
            <td>{participant.sede}</td>
        </tr>)
}
const availableOptions = <S extends object,F extends object>(results: Array<S>, category: string, filters: F, filterCompliance: (arg:S,filter:F)=> boolean):Array<S> => {
    return results.filter((element: S) => {return(filterCompliance(element,{...filters,[category]:undefined}))});
}

const Venues = ({type,instance,dropPoints,venues,auth_max_date,participants}:VenueProps) => {
    //Venues
    const [venueFilters,setVenueFilters] = useState<VenueFilters>({colegio: undefined, sede: undefined});
    const [participantFilters,setParticipantFilters] = useState<ParticipantFilters>({nivel: undefined, nombreApellido:undefined,colegio: undefined, sede: undefined});
    const venueIsFilterCompliant = (venue: Venue<School>, filter: VenueFilters) => {
        const {colegio,sede} = filter;
        const isSchool = (colegio? (venue.colegio.nombre === colegio.nombre) && (colegio.sede?venue.colegio.sede === colegio.sede:true) : true);
        const isVenue = (sede? venue.nombre === sede : true);
        return isSchool && isVenue;
    }
    const hasDisclaimers = venues.reduce((disclaimers : number,venue: Venue<School>) => {
        return disclaimers + (venue.aclaracion !== null?1:0);
    },0) > 0;
    const filteredVenues = venues.filter((element) => venueIsFilterCompliant(element,venueFilters));
    const v_availableSchools = filteredVenues.map(venue => venue.colegio);
    let v_schools : Array<School> = removeRepeatedSchools(v_availableSchools);
    const v_genericSchools: Array<School> =removeRepeatedSchools(v_schools.filter((school) => school.sede).map((school) => {return({nombre: school.nombre})}));
    v_schools = v_schools.concat(v_genericSchools);
    const v_venue_names = Array.from(new Set(filteredVenues.map(venue => venue.nombre)));
    const venue_headers = ["Colegio","Sede","Dirección","Localidad"].concat(hasDisclaimers?["Aclaración"]:[]); 
    //Participants
    const participantIsFilterCompliant = (participant: Participant, filter: ParticipantFilters) => {
        const {nivel,nombreApellido,colegio,sede} = filter;
        const isParticipant = ((nombreApellido)? nombreApellido === participantName(participant.nombre,participant.apellido): true);
        const isLevel = (nivel? participant.nivel === nivel : true);
        const isSchool = (colegio? (participant.colegio.nombre === colegio.nombre) && (colegio.sede?participant.colegio.sede === colegio.sede:true) : true);
        const isVenue = (sede? participant.sede === sede : true);
        return isParticipant && isLevel && isSchool && isVenue;
    }
    const filteredParticipants = participants.filter((element) => participantIsFilterCompliant(element,participantFilters));
    const p_availableSchools = filteredParticipants.map(participant => participant.colegio);
    let p_schools : Array<School> = removeRepeatedSchools(p_availableSchools);
    const p_genericSchools: Array<School> =removeRepeatedSchools(p_schools.filter((school) => school.sede).map((school) => {return({nombre: school.nombre})}));
    p_schools = p_schools.concat(p_genericSchools);
    const p_venue_names = Array.from(new Set(filteredParticipants.map(participant => participant.sede)));
    const p_levels = Array.from(new Set(availableOptions(participants,"nivel",participantFilters,participantIsFilterCompliant).map(participant => participant.nivel)));
    const p_names = Array.from(new Set(filteredParticipants.map(participant => participantName(participant.nombre,participant.apellido))));
    const participant_headers = ["Nivel","Participante","Colegio","Sede"]; 
    return(
        <>
            <h1 className={styles.title}>Sedes {instance[0] + instance.substring(1).toLocaleLowerCase()}</h1>
            <h2 className={styles.section_title}>Autorizaciones</h2>
            {dropPoints.length > 0 ?
                <>
                <p className={styles.text}>Las autorizaciones se pueden conseguir <Link href={type == "OMA"?"/oma/autorizacion":"/nandu/autorizacion"}>aquí<div className={styles.icon}><Image src="/images/pageLinkIcon.svg" fill={true} alt=""/></div></Link> y deben estar <span className={styles.bold}>completas</span> con las <span className={styles.bold}>firmas y sellos correspondientes</span>. Estas se pueden entregar hasta el <span className={styles.bold}>{auth_max_date?`${auth_max_date.getDate()}/${auth_max_date.getMonth() + 1}`:"(A definir)"}</span> en los siguientes puntos:</p>
                <ul className={styles.dropPoints}>
                    {dropPoints.map((dropPoint, index) => {
                        const {localidad, nombre, direccion, aclaracion} = dropPoint;
                        return(<li className={styles.text} key={index}><span className={styles.bold}>{localidad}: </span>{nombre?`${nombre} - `:""}{direccion}{aclaracion?` (${aclaracion})`:""}</li>)
                    })}
                </ul>
                </>
            : <p className={styles.text}>Proximamente...</p>}
            <h2 className={styles.section_title}>Sedes</h2>
            {venues.length > 0 ?
            <>
            <p className={styles.text}>Presentarse <span className={styles.bold}>13:30 hs</span>. ¡No se olviden de las autorizaciones!</p>
            <h3 className={styles.section_subtitle}>Colegios por sede</h3>
            <form className={styles.form}>
                <SelectResultCategory category="Colegio" value={venueFilters.colegio} setValue={(option?: School) => {setVenueFilters({...venueFilters,colegio: option})}} options={v_schools} input={true}/>
                <SelectResultCategory category="Sede" value={venueFilters.sede} setValue={(option?: string) => {setVenueFilters({...venueFilters,sede: option})}} options={v_venue_names} input={true}/>
            </form>
            <Table 
                values={filteredVenues.map((venue => renderVenue(venue,hasDisclaimers)))}
                allValues={venues.map((venue => renderVenue(venue,hasDisclaimers)))} 
                headers={venue_headers} 
                Card={VenueCard} 
                elements_per_page={10}/>
            <h3 className={styles.section_subtitle}>Alumnos por sede</h3>
            <form className={styles.form}>
                <SelectResultCategory category="Participante" value={participantFilters.nombreApellido} setValue={(option?: string) => {setParticipantFilters({...participantFilters,nombreApellido: option})}} options={p_names} input={true}/>
                <SelectResultCategory category="Colegio" value={participantFilters.colegio} setValue={(option?: School) => {setParticipantFilters({...participantFilters,colegio: option})}} options={p_schools} input={true}/>
                <SelectResultCategory category="Sede" value={participantFilters.sede} setValue={(option?: string) => {setParticipantFilters({...participantFilters,sede: option})}} options={p_venue_names} input={true}/>
                <SelectResultCategory category="Nivel" value={participantFilters.nivel} setValue={(option? : number) => {setParticipantFilters({...participantFilters,nivel: option})}} options={p_levels} clear={true}/>
            </form>
            <Table 
                values={filteredParticipants} 
                allValues={participants} 
                headers={participant_headers} 
                Card={ParticipantCard} 
                elements_per_page={50} 
                download={true}
                downloadHeaders={downloadParticipantHeaders}
                process_data={downloadParticipantData}
                make_element={makeParticipantElement}
                testInfo={`${type == "OMA"?"OMA":"Nandú"} ${instance} ${(new Date).getFullYear()}`}
            />
        </>
        : <p className={styles.text}>Proximamente...</p>}
        </>
    )
}

export default Venues