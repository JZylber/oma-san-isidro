import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import Layout from "../components/Layout/Layout";
import MonthSelect from "../components/MonthSelect/MonthSelect";
import { getCalendarEvents } from "../lib/aux_db_calls";
import styles from "./styles/Calendar.module.scss";

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const available = await getCalendarEvents(2022)
    const newProps = {results: JSON.parse(JSON.stringify(available.results))}
    return {
      props: newProps,
    };     
}

interface calendarEvents{
    fecha_inicio: Date,
    fecha_fin: Date,
    tipo: string,
    texto: string
}

const Calendar : NextPage<{results : Array<calendarEvents>}> = ({results}) => {
    const [displayedMonth,setDisplayedMonth] = useState(new Date().getMonth())
    return(
        <>
        <Head>
            <title>Calendario</title>
        </Head>
        <Layout>
            <h1 className={styles.calendar_title}>Calendario</h1>
            <hr className={styles.divider}></hr>
            <MonthSelect displayedMonth={displayedMonth} setDisplayedMonth={setDisplayedMonth}/>
        </Layout>
        </>
        )
}

export default Calendar