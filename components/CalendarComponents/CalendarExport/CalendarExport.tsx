import {CalendarEvent} from "../CalendarTypes";
import { Fragment} from "react";

interface CalendarExportProps{
    year: number,
    events: {name: string, events: CalendarEvent []}[]
}

const CalendarExport = ({year,events}: CalendarExportProps) => {
    return(
        <div className="p-[3.2rem]">
            <h1 className="font-unbounded font-medium text-[3.2rem] pb-[.6rem]">Calendario {year}</h1>
            {events.map((month,month_idx) =>{
                if(month.events.length > 0){
                    return(
                    <Fragment key={month_idx}>
                    <h2 className="font-unbounded font-medium text-[2rem] pt-[.3rem] border-t-2 border-primary-black">{month.name}</h2>
                    <ul className="[&:not(:last-child)]:pb-[.3rem]">
                        {month.events.map((event,idx) => (
                            <li className="font-montserrat font-normal text-[1.4rem]" key={`${month_idx}-${idx}`}>
                                {event.fecha_inicio.getUTCDate()}{event.fecha_fin?"-"+event.fecha_fin.getUTCDate():""} ({event.tipo}) {event.texto}
                            </li>
                        ))}
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
