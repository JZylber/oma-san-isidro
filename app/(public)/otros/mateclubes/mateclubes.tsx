'use client'
import {CalendarEvent} from "../../../../components/CalendarComponents/CalendarTypes";
import Layout from "../../../../components/Layout/Layout";
import styles from "./Mateclubes.module.scss";
import AllDatesBanner from "../../../../components/CalendarComponents/DateBanner/NextDatesBanner";

interface MateclubesProps {
    events : Array<CalendarEvent>,
}

const MathClubs = ({events}:MateclubesProps) => {
    return(
        <>
            <h1 className={styles.title}>Mateclubes</h1>
            <AllDatesBanner dates={events} category="Mateclubes"/>
            <section className={styles.section}> 
                <p className={styles.main_text}>Para más información mandar un mail a Gloria Sampablo: <a href="mailto:gloriasampablo@gmail.com">gloriasampablo@gmail.com</a></p>
            </section>
        </>
    )
}

export default MathClubs