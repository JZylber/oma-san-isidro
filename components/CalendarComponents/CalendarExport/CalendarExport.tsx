import styles from "./CalendarExport.module.scss";
import {CalendarEvent} from "../CalendarTypes";
import { Fragment, RefObject } from "react";

interface CalendarExportProps{
    year: number,
    events: {name: string, events: CalendarEvent []}[]
}

const CalendarExport = ({year,events}: CalendarExportProps) => {
    return(
        <div className={styles.container}>
            <h1>Calendario {2023}</h1>
            {events.map((month,month_idx) =>{
                if(month.events.length > 0){
                    return(
                    <Fragment key={month_idx}>
                    <h2>{month.name}</h2>
                    <ul>
                        {month.events.map((event,idx) => <li key={`${month_idx}-${idx}`}>{event.fecha_inicio.getUTCDate()}{event.fecha_fin?"-"+event.fecha_fin.getUTCDate():""} ({event.tipo}) {event.texto}</li>)}
                    </ul>
                    </Fragment>)
                } else {
                    return(<Fragment key={month_idx}></Fragment>)
                }
            })}
        </div>
    )
}

export default CalendarExport