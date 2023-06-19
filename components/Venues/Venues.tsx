import Link from "next/link";
import styles from "./Venues.module.scss";
import table_styles from "../ResultsPage/ResultTable.module.scss";
import Image from "next/image";
import SelectResultCategory from "../ResultsPage/SelectResultCategory";
import { useState } from "react";
import { School } from "../ResultsPage/resultsTypes";
import { removeRepeatedSchools } from "../ResultsPage/ResultTable";
import Table from "../Table/Table";
import VenueCard from "../Table/TableCards/VenueCard";

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

export interface Participant<SchoolType>{
    nombre: string;
    apellido: string;
    colegio: SchoolType;
    nivel: number;
    sede?: string;
}


interface VenueProps {
    type: string;
    instance: string;
    venues: Venue<School>[];
    dropPoints: DropPoint[];
    auth_max_date?: Date;
}

const schoolName = (school: School) => {
    return(school.nombre + (school.sede?`-${school.sede}`:""))
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

const Venues = ({type,instance,dropPoints,venues,auth_max_date}:VenueProps) => {
    //Venues
    const [filters,setFilters] = useState<{colegio?:School,sede?:string}>({colegio: undefined, sede: undefined});
    const isFilterCompliant = (venue: Venue<School>) => {
        const {colegio,sede} = filters;
        const isSchool = (colegio? (venue.colegio.nombre === colegio.nombre) && (colegio.sede?venue.colegio.sede === colegio.sede:true) : true);
        const isVenue = (sede? venue.nombre === sede : true);
        return isSchool && isVenue;
    }
    const hasDisclaimers = venues.reduce((disclaimers : number,venue: Venue<School>) => {
        return disclaimers + (venue.aclaracion !== null?1:0);
    },0) > 0;
    const filteredVenues = venues.filter(isFilterCompliant);
    const availableSchools = filteredVenues.map(venue => venue.colegio);
    let schools : Array<School> = removeRepeatedSchools(availableSchools);
    const genericSchools: Array<School> =removeRepeatedSchools(schools.filter((school) => school.sede).map((school) => {return({nombre: school.nombre})}));
    schools = schools.concat(genericSchools);
    const venue_names = Array.from(new Set(filteredVenues.map(venue => venue.nombre)));
    const headers = ["Colegio","Sede","Dirección","Localidad"].concat(hasDisclaimers?["Aclaración"]:[]);; 
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
            <form className={styles.form}>
                <SelectResultCategory category="Colegio" value={filters.colegio} setValue={(option?: School) => {setFilters({...filters,colegio: option})}} options={schools} input={true}/>
                <SelectResultCategory category="Sede" value={filters.sede} setValue={(option?: string) => {setFilters({...filters,sede: option})}} options={venue_names} input={true}/>
            </form>
            <Table values={filteredVenues.map((venue => renderVenue(venue,hasDisclaimers)))} headers={headers} Card={VenueCard} elements_per_page={10}/>
        </>
        : <p className={styles.text}>Proximamente...</p>}
        </>
    )
}

export default Venues