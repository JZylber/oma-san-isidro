'use client'
import { useEffect, useRef, useState } from "react";
import DateCard from "../../../../components/CalendarComponents/DateCard/DateCard";
import DateFilter from "../../../../components/CalendarComponents/DateFilter/DateFilter";
import Layout from "../../../../components/Layout/Layout";
import MonthSelect from "../../../../components/CalendarComponents/MonthSelect/MonthSelect";
import styles from "./Calendar.module.scss";
import MonthEvents from "../../../../components/CalendarComponents/MonthEvents/MonthEvents";
import { CalendarEvent} from "../../../../components/CalendarComponents/CalendarTypes";
import {Button} from "../../../../components/buttons/Button";
import { useReactToPrint } from "react-to-print";
import CalendarExport from "../../../../components/CalendarComponents/CalendarExport/CalendarExport";
import { useSearchParams } from "next/navigation";
import Pending from "../../../../components/Pending/pending";

interface CalendarProps {
    events : Array<CalendarEvent>,
    year: number
}

const CalendarPage = ({events,year}:CalendarProps) => {
    const searchParams = useSearchParams();
    const [displayedMonth,setDisplayedMonth] = useState(new Date().getUTCMonth());
    const [categories,setCategories] = useState<string []>([]);
    const eventsAvailable : boolean = events.length > 0;
    useEffect(() => {
        if(searchParams && searchParams.get("categoria")){
            const category = searchParams.get("categoria") as string;
            setCategories([category]);
        }
      }, [searchParams])
    const getMonthEvents = (month: number) => {
        let monthEvents = events.filter((event) => event.fecha_inicio.getUTCMonth() === month)
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
    if(!eventsAvailable){
        return(
            <Pending text="Todavía no está disponible el calendario para este año"/>
        )
    }
    else {
    return(
        <>
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
                <div ref={printCalendarRef}>
                    <CalendarExport year={year} events={months.map((name,number) => {return({name: name, events: getMonthEvents(number)}) })}/>
                </div>
            </div>
        </>
        )
    }
}

export default CalendarPage