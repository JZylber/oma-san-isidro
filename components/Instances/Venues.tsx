import Link from "next/link";
import styles from "./Venues.module.scss";
import Image from "next/image";
import SelectResultCategory from "../ResultsPage/SelectResultCategory";
import Table from "../Table/Table";
import VenueCard from "./VenueCard";
import ParticipantCard from "./ParticipantCard";
import { Filterables, Participant, School } from "../../hooks/types";
import useFilter from "../../hooks/useFilter";
import Map from "../Map/Map";

export interface DropPoint {
    localidad: string,
    nombre?: string,
    direccion: string,
    aclaracion?: string,
}

interface VenueProps {
    type: string;
    instance: string;
    venues: Venue[];
    dropPoints: DropPoint[];
    participants: VenueParticipant[];
    auth_max_date?: Date;
    time : Date;
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

const Venues = ({type,instance,dropPoints,venues,auth_max_date,participants,time}:VenueProps) => {
    //Venues
    const hasDisclaimers = venues.reduce((disclaimers : number,venue: Venue) => {
        return disclaimers + (venue.aclaracion !== ""?1:0);
    },0) > 0;
    const [venueFilter,updateVenueFilter,filteredVenues,venueOptions] = useFilter<Venue>(venues);
    const [participantFilter,updateParticipantFilter,filteredParticipants,participantOptions] = useFilter<VenueParticipant>(participants);
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
            <p className={styles.text}>Presentarse <span className={styles.bold}>{`${time.getHours()}:${time.getMinutes()}`} hs</span>. ¡No se olviden de las autorizaciones!</p>
            <h3 className={styles.section_subtitle}>Colegios por sede</h3>
            <form className={styles.form}>
                <SelectResultCategory category="Colegio" value={venueFilter.colegio} setValue={(option?: School) => updateVenueFilter({colegio: option})} options={venueOptions.colegio} input={true}/>
                <SelectResultCategory category="Sede" value={venueFilter.nombre} setValue={(option?: string) => updateVenueFilter({nombre: option})} options={venueOptions.nombre} input={true}/>
            </form>
            <Table 
                values={filteredVenues}
                allValues={venues} 
                headers={venue_headers} 
                Card={VenueCard} 
                elements_per_page={10}
                make_element={hasDisclaimers?(result,index) => makeVenueElement(result,index,true):makeVenueElement}
                />
            <h3 className={styles.section_subtitle}>Alumnos por sede</h3>
            <form className={styles.form}>
                <SelectResultCategory category="Participante" value={participantFilter.participante} setValue={(option?: Participant) => updateParticipantFilter({participante: option})} options={participantOptions.participante} input={true}/>
                <SelectResultCategory category="Colegio" value={participantFilter.colegio} setValue={(option?: School) => updateParticipantFilter({colegio: option})} options={participantOptions.colegio} input={true}/>
                <SelectResultCategory category="Sede" value={participantFilter.sede} setValue={(option?: string) => updateParticipantFilter({sede:option})} options={participantOptions.sede} input={true}/>
                <SelectResultCategory category="Nivel" value={participantFilter.nivel} setValue={(option? : number) => updateParticipantFilter({nivel:option})} options={participantOptions.nivel} clear={true}/>
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
            {instance === "REGIONAL" && <Map competition={type}/>}
        </>}
        {dropPoints.length === 0 && venues.length === 0 && <p className={styles.text}>Proximamente...</p>}
        </>
    )
}

export default Venues