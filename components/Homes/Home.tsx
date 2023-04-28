import Link from "next/link";
import { CalendarEvent } from "../CalendarComponents/CalendarTypes";
import AllDatesBanner from "../CalendarComponents/DateBanner/NextDatesBanner";
import styles from "./Home.module.scss";
import Levels from "./Levels";
import Image from "next/image";

interface HomeProps {
    competition: string
    dates: Array<CalendarEvent>
}

const Home = ({competition,dates}:HomeProps) => {
    return(
        <>
        <h1 className={styles.title}>{competition}</h1>
        <AllDatesBanner dates={dates} category={competition}/>
        <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Próxima instancia</h2>
            <p className={styles.section_text}>Para información de la próxima instancia como los puntos de entrega de autorizaciones, o los colegios asignados para rendir la prueba, podés ir a la sección <Link href={`/${competition === "OMA"?"oma":"nandu"}/sedes`} className={styles.link}>sedes</Link><div className={styles.icon}><Image src="/images/pageLinkIcon.svg" fill={true} alt=""/></div>.</p>
        </section>
        <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Niveles</h2>
            <Levels category={competition === "OMA"?"oma":"nandu"}/>
        </section>
        <section className={styles.section}>
        </section>
        </>
    )
}

export default Home
