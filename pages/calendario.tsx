import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import DateCard from "../components/DateCard/DateCard";
import DateFilter from "../components/Filters/DateFilter/DateFilter";
import Layout from "../components/Layout/Layout";
import MonthSelect from "../components/MonthSelect/MonthSelect";
import { getCalendarEvents } from "../lib/aux_db_calls";
import styles from "./styles/Calendar.module.scss";

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const year = new Date().getFullYear()
    const available = await getCalendarEvents(year)
    const newProps = {results: JSON.parse(JSON.stringify(available.results)),year: year}
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

const Calendar : NextPage<{results : Array<CalendarEvent>,year:number}> = ({results,year}) => {
    const events = results.map((calendarEvent) => {return ({...calendarEvent,fecha_inicio:new Date(calendarEvent.fecha_inicio), fecha_fin: calendarEvent.fecha_fin?new Date(calendarEvent.fecha_fin):undefined})})
    const [displayedMonth,setDisplayedMonth] = useState(new Date().getMonth())
    const [categories,setCategories] = useState<string []>([])
    const getMonthEvents = (month: number) => {
        let monthEvents = events.filter((event) => event.fecha_inicio.getMonth() === month)
        if(categories.length > 0){
            monthEvents = monthEvents.filter((event) => categories.includes(event.tipo))
        }
        return(monthEvents)
    }
    return(
        <>
        <Head>
            <title>Calendario</title>
        </Head>
        <Layout>
            <h1 className={styles.calendar_title}>Calendario {year}</h1>
            <hr className={styles.divider}></hr>
            <MonthSelect displayedMonth={displayedMonth} setDisplayedMonth={setDisplayedMonth}/>
            <DateFilter categories={categories} setCategories={setCategories} availableCategories={Array.from(new Set(events.map((e) => e.tipo)))}/>
            <div className={styles.events}>
                {getMonthEvents(displayedMonth).map((event,idx) => <DateCard key={idx} calendarEvent={event}/>)}
            </div>
        </Layout>
        </>
        )
}

export default Calendar