import Link from "next/link";
import styles from "./Venues.module.scss";
import table_styles from "../ResultsPage/ResultTable.module.scss";
import Image from "next/image";
import SelectResultCategory from "../ResultsPage/SelectResultCategory";
import VenueCard from "./Mobile/VenueCard";
import { useState } from "react";
import { School } from "../ResultsPage/resultsTypes";
import { removeRepeatedSchools } from "../ResultsPage/ResultTable";

export interface Venue{
    colegio: School;
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

interface VenueProps {
    type: string;
    instance: string;
    venues: Venue[];
    dropPoints: DropPoint[];
    auth_max_date?: Date;
}

const schoolName = (school: School) => {
    return(school.nombre + (school.sede?`-${school.sede}`:""))
}

const Venues = ({type,instance,dropPoints,venues,auth_max_date}:VenueProps) => {
    //Venues
    const [filters,setFilters] = useState<{colegio?:School,sede?:string}>({colegio: undefined, sede: undefined});
    const isFilterCompliant = (venue: Venue) => {
        const {colegio,sede} = filters;
        const isSchool = (colegio? (venue.colegio.nombre === colegio.nombre) && (colegio.sede?venue.colegio.sede === colegio.sede:true) : true);
        const isVenue = (sede? venue.nombre === sede : true);
        return isSchool && isVenue;
    }
    const filteredVenues = venues.filter(isFilterCompliant);
    const availableSchools = filteredVenues.map(venue => venue.colegio);
    let schools : Array<School> = removeRepeatedSchools(availableSchools);
    const genericSchools: Array<School> =removeRepeatedSchools(schools.filter((school) => school.sede).map((school) => {return({nombre: school.nombre})}));
    schools = schools.concat(genericSchools);
    const venue_names = Array.from(new Set(filteredVenues.map(venue => venue.nombre))); 
    return(
        <>
            <h1 className={styles.title}>Sedes {instance[0] + instance.substring(1).toLocaleLowerCase()}</h1>
            <h2 className={styles.section_title}>Autorizaciones</h2>
            {dropPoints.length > 0 ?
                <>
                <p className={styles.text}>Las autorizaciones se pueden conseguir <Link href={type == "oma"?"/oma/autorizacion":"/nandu/autorizacion"}>aquí<div className={styles.icon}><Image src="/images/pageLinkIcon.svg" fill={true} alt=""/></div></Link>. Estas se pueden entregar hasta el <span className={styles.bold}>{auth_max_date?`${auth_max_date.getDate()}/${auth_max_date.getMonth() + 1}`:"(A definir)"}</span> en los siguientes puntos:</p>
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
            <p className={styles.text}>Presentarse <span className={styles.bold}>13:30 hs</span></p>
            <form className={styles.form}>
                <SelectResultCategory category="Colegio" value={filters.colegio} setValue={(option?: School) => {setFilters({...filters,colegio: option})}} options={schools} input={true}/>
                <SelectResultCategory category="Sede" value={filters.sede} setValue={(option?: string) => {setFilters({...filters,sede: option})}} options={venue_names} input={true}/>
            </form>
            <div className={table_styles.results}>
                <table className={table_styles.result_table}>
                <thead>
                    <tr>
                        <td>Colegio</td>
                        <td>Sede</td>
                        <td>Dirección</td>
                        <td>Localidad</td>
                        <td style={{maxWidth:"15%"}}>Aclaraciones</td>
                    </tr>
                </thead>
                <tbody>
                    {filteredVenues.map((venue,index) => {
                        return(
                            <tr key={index}>
                                <td>{schoolName(venue.colegio)}</td>
                                <td>{venue.nombre}</td>
                                <td>{venue.direccion}</td>
                                <td>{venue.localidad}</td>
                                <td>{venue.aclaracion?venue.aclaracion:""}</td>
                            </tr>
                        )
                    })}
                </tbody>
        </table>
        </div>
        <div className={styles.venue_items}>
            {filteredVenues.map((venue,index) => <VenueCard key={index} venue={venue}/>)}
        </div>
        </>
        : <p className={styles.text}>Proximamente...</p>}
        </>
    )
}

export default Venues