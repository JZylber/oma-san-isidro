'use client'
import {CalendarEvent} from "../../../components/CalendarComponents/CalendarTypes";
import Layout from "../../../components/Layout/Layout";
import styles from "./Mateclubes.module.scss";
import AllDatesBanner from "../../../components/CalendarComponents/DateBanner/NextDatesBanner";

interface MateclubesProps {
    events : Array<CalendarEvent>,
}

const MathClubs = ({events}:MateclubesProps) => {
    return(
        <Layout>
            <h1 className={styles.title}>Mateclubes</h1>
            <AllDatesBanner dates={events} category="Mateclubes"/>
        </Layout>
    )
}

export default MathClubs