import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import DateCard from "../components/DateCard/DateCard";
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

export interface CalendarEvent{
    fecha_inicio: Date,
    fecha_fin?: Date,
    tipo: string,
    texto: string
}

const Calendar : NextPage<{results : Array<CalendarEvent>}> = ({results}) => {
    const events = results.map((calendarEvent) => {return ({...calendarEvent,fecha_inicio:new Date(calendarEvent.fecha_inicio), fecha_fin: calendarEvent.fecha_fin?new Date(calendarEvent.fecha_fin):undefined})})
    const [displayedMonth,setDisplayedMonth] = useState(new Date().getMonth())
    const getMonthEvents = (month: number) => {
        return(events.filter((event) => event.fecha_inicio.getMonth() === month))
    } 
    return(
        <>
        <Head>
            <title>Calendario</title>
        </Head>
        <Layout>
            <h1 className={styles.calendar_title}>Calendario</h1>
            <hr className={styles.divider}></hr>
            <MonthSelect displayedMonth={displayedMonth} setDisplayedMonth={setDisplayedMonth}/>
            <div className={styles.events}>
                {getMonthEvents(displayedMonth).map((event,idx) => <DateCard key={idx} calendarEvent={event}/>)}
            </div>
        </Layout>
        </>
        )
}

export default Calendar