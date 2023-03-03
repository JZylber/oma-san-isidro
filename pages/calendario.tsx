import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import DateCard from "../components/CalendarComponents/DateCard/DateCard";
import DateFilter from "../components/CalendarComponents/DateFilter/DateFilter";
import Layout from "../components/Layout/Layout";
import MonthSelect from "../components/CalendarComponents/MonthSelect/MonthSelect";
import { getCalendarEvents } from "../lib/aux_db_calls";
import styles from "./styles/Calendar.module.scss";
import MonthEvents from "../components/CalendarComponents/MonthEvents/MonthEvents";

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const year = new Date().getFullYear()
    const available = await getCalendarEvents(year)
    const newProps = {results: JSON.parse(JSON.stringify(available.results)),year: year}
    return {
      props: newProps,
    };     
}

export interface JSONCalendarEvent{
    fecha_inicio: string,
    fecha_fin?: string,
    tipo: string,
    texto: string
}

export interface CalendarEvent{
    fecha_inicio: Date,
    fecha_fin?: Date,
    tipo: string,
    texto: string
}

const getDateFromJSON = (JSONDate : string) => {
    let date = JSONDate.split('T')[0];
    let [year,month,day] = date.split('-').map((n) => Number(n));
    month = month - 1;
    return(new Date(year,month,day))
}

const Calendar : NextPage<{results : Array<JSONCalendarEvent>,year:number}> = ({results,year}) => {
    const events = results.map((calendarEvent) => {return ({...calendarEvent,fecha_inicio:getDateFromJSON(calendarEvent.fecha_inicio), fecha_fin: calendarEvent.fecha_fin?getDateFromJSON(calendarEvent.fecha_fin):undefined})})
    const [displayedMonth,setDisplayedMonth] = useState(new Date().getMonth())
    const [categories,setCategories] = useState<string []>([])
    const getMonthEvents = (month: number) => {
        let monthEvents = events.filter((event) => event.fecha_inicio.getMonth() === month)
        if(categories.length > 0){
            monthEvents = monthEvents.filter((event) => categories.includes(event.tipo))
        }
        return(monthEvents)
    }
    const months = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"]
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
            <div className={styles.calendar}>
                {months.map((name,number) => <MonthEvents key={number} name={name} events={getMonthEvents(number)}/>)}
            </div>
        </Layout>
        </>
        )
}

export default Calendar