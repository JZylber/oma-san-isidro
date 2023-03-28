import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import DateCard from "../../components/CalendarComponents/DateCard/DateCard";
import DateFilter from "../../components/CalendarComponents/DateFilter/DateFilter";
import Layout from "../../components/Layout/Layout";
import MonthSelect from "../../components/CalendarComponents/MonthSelect/MonthSelect";
import { getCalendarEvents } from "../../lib/aux_db_calls";
import styles from "./Calendar.module.scss";
import MonthEvents from "../../components/CalendarComponents/MonthEvents/MonthEvents";
import { getDatesFromJson, JSONCalendarEvent } from "../../components/CalendarComponents/CalendarTypes";
import { useRouter } from "next/router";
import {Button} from "../../components/buttons/Button";
import { useReactToPrint } from "react-to-print";
import MarkdownCalendar from "../../components/CalendarComponents/MarkdownCalendar/MarkdownCalendar";

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const year = new Date().getFullYear()
    const available = await getCalendarEvents(year)
    const newProps = {results: JSON.parse(JSON.stringify(available.results)),year: year}
    return {
      props: newProps,
    };     
}

const Calendar : NextPage<{results : Array<JSONCalendarEvent>,year:number}> = ({results,year}) => {
    const events = getDatesFromJson(results);
    const router = useRouter();
    const query = router.query;
    const [displayedMonth,setDisplayedMonth] = useState(new Date().getMonth());
    const [categories,setCategories] = useState<string []>([]);
    useEffect(() => {
        if(query["categoria"]){
            const category = query["categoria"] as string;
            setCategories([category]);
        }
      }, [query])
    const getMonthEvents = (month: number) => {
        let monthEvents = events.filter((event) => event.fecha_inicio.getMonth() === month)
        if(categories.length > 0){
            monthEvents = monthEvents.filter((event) => categories.includes(event.tipo))
        }
        return(monthEvents)
    };
    const months = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"]
    const printCalendarRef = useRef(null);
    const printCalendar = useReactToPrint({
        content: () => printCalendarRef.current,
        documentTitle: `Calendario ${year}`
    });
    return(
        <>
        <Head>
            <title>Calendario</title>
            <meta   name="description"
                content="Calendario anual de todas las competencias matemáticas del país"></meta>
        </Head>
        <Layout>
            <h1 className={styles.calendar_title}>Calendario {year}</h1>
            <hr className={styles.divider}></hr>
            <MonthSelect displayedMonth={displayedMonth} setDisplayedMonth={setDisplayedMonth}/>
            <DateFilter categories={categories} setCategories={setCategories} availableCategories={Array.from(new Set(events.map((e) => e.tipo)))}/>
            <div className={styles.printButtonContainer}>
                <Button content="Imprimir" onClick={printCalendar}/>
            </div>
            <div className={styles.events}>
                {getMonthEvents(displayedMonth).map((event,idx) => <DateCard key={idx} calendarEvent={event}/>)}
            </div>
            <div className={styles.calendar}>
                {months.map((name,number) => <MonthEvents key={number} name={name} events={getMonthEvents(number)}/>)}
            </div>
            <div style={{ display: "none" }}>
                <div style={{ padding: "4rem 3.2rem 4rem 3.2rem" }} ref={printCalendarRef}>
                    <MarkdownCalendar year={year} events={months.map((name,number) => {return({name: name, events: getMonthEvents(number)}) })}/>
                </div>
            </div>
        </Layout>
        </>
        )
}

export default Calendar