import Link from "next/link";
import styles from "./Venues.module.scss";
import table_styles from "../ResultsPage/ResultTable.module.scss";
import Image from "next/image";
import SelectResultCategory from "../ResultsPage/SelectResultCategory";
import { useState } from "react";

export interface Venue{
    colegio: string;
    nombre: string;
    direccion: string;
    localidad: string;
    aclaracion?: string;
}

interface VenueInfo {
    dropPoints: boolean;
    next_competition: string;
    auth_max_date?: Date;
}

interface DropPointInfo {
    localidad: string,
    nombre?: string,
    direccion: string,
    aclaraciones?: string,
}

const venueInfo : {[key: string]: VenueInfo} = {
    nandu: {dropPoints: true, next_competition: "Interescolar", auth_max_date: new Date(2023, 3, 28)},
    oma: {dropPoints: false, next_competition: "Intercolegial"}
}

const Venues = ({type,venues}:{type:string,venues: Venue[]}) => {
    const {dropPoints, next_competition,auth_max_date} = venueInfo[type];
    const dropPointsData : DropPointInfo [] | null = dropPoints ? require(`./data/${type}${next_competition.toLocaleLowerCase()}auth.json`) : null;

    //Venues
    const [filters,setFilters] = useState<{colegio?:string,sede?:string}>({colegio: undefined, sede: undefined});
    const isFilterCompliant = (venue: Venue) => {
        const {colegio,sede} = filters;
        return (colegio? venue.colegio === colegio : true) && (sede? venue.nombre === sede : true);
    }
    const schools = Array.from(new Set(venues.map(venue => venue.colegio)));
    const venue_names = Array.from(new Set(venues.map(venue => venue.nombre))); 
    return(
        <>
            <h1 className={styles.title}>Sedes {next_competition}</h1>
            <h2 className={styles.section_title}>Autorizaciones</h2>
            {dropPointsData ?
                <>
                <p className={styles.text}>Las autorizaciones se pueden conseguir <Link href={type == "oma"?"/oma/autorizacion":"/nandu/autorizacion"}>aquí<div className={styles.icon}><Image src="/images/pageLinkIcon.svg" fill={true} alt=""/></div></Link>. Estas se pueden entregar hasta el <span className={styles.bold}>{auth_max_date?`${auth_max_date.getDate()}/${auth_max_date.getMonth() + 1}`:"(A definir)"}</span> en los siguientes puntos:</p>
                <ul className={styles.dropPoints}>
                    {dropPointsData.map((dropPoint, index) => {
                        const {localidad, nombre, direccion, aclaraciones} = dropPoint;
                        return(<li className={styles.text} key={index}><span className={styles.bold}>{localidad}: </span>{nombre?`${nombre} - `:""}{direccion}{aclaraciones?` (${aclaraciones})`:""}</li>)
                    })}
                </ul>
                </>
            : <p className={styles.text}>Proximamente...</p>}
            <h2 className={styles.section_title}>Sedes</h2>
            {venues.length > 0 ?
            <>
            <form className={styles.form}>
                <SelectResultCategory category="Colegio" value={filters.colegio} setValue={(option?: string) => {setFilters({...filters,colegio: option})}} options={schools} input={true}/>
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
                        <td style={{maxWidth:"20%"}}>Aclaraciones</td>
                    </tr>
                </thead>
                <tbody>
                    {venues.filter(isFilterCompliant).map((venue,index) => {
                        return(
                            <tr key={index}>
                                <td>{venue.colegio}</td>
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
        </>
        : <p className={styles.text}>Proximamente...</p>}
        </>
    )
}

export default Venues