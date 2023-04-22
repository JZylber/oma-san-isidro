import Link from "next/link";
import styles from "./Venues.module.scss";
import Image from "next/image";

export interface Venue{
    colegio: string;
    sede: string;
    direccion: string;
    localidad: string;
    aclaraciones?: string;
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
                <p className={styles.text}>Info</p>
            : <p className={styles.text}>Proximamente...</p>}
        </>
    )
}

export default Venues