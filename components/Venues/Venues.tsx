import Link from "next/link";
import styles from "./Venues.module.scss";

interface VenueInfo {
    dropPoints: boolean;
    venues: boolean;
    next_competition: string;
    auth_max_date?: Date;
}

const venueInfo : {[key: string]: VenueInfo} = {
    nandu: {dropPoints: true, venues: false, next_competition: "Interescolar", auth_max_date: new Date(2023, 3, 28)},
    oma: {dropPoints: false, venues: false, next_competition: "Intercolegial"}
}

const Venues = ({type}:{type:string}) => {
    const {dropPoints, venues, next_competition,auth_max_date} = venueInfo[type];
    const dropPointsData = dropPoints ? require(`./data/${type}${next_competition.toLocaleLowerCase()}auth.json`) : null;
    const venuesData = venues ? require(`./data/${type}${next_competition.toLocaleLowerCase()}venues.json`) : null;
    return(
        <>
            <h1 className={styles.title}>Sedes {next_competition}</h1>
            <h2 className={styles.section_title}>Autorizaciones</h2>
            {dropPointsData ? 
                <p className={styles.text}>Las autorizaciones se pueden consegui <Link href={`/${type}/autorizacion`}>aquí</Link>. Estas se pueden entregar hasta el {auth_max_date?`${auth_max_date.getDate()}/${auth_max_date.getMonth() + 1}`:"(A definir)"} en los siguientes puntos:</p>
            : <p>Proximamente...</p>}
            <h2 className={styles.section_title}>Sedes</h2>
        </>
    )
}

export default Venues