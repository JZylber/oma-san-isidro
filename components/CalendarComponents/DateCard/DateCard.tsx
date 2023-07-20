import { CalendarEvent } from "../CalendarTypes";
import styles from "./DateCard.module.scss";

const DateCard = ({calendarEvent}:{calendarEvent : CalendarEvent}) => {
    const months = ["ENE","FEB","MAR","ABR","MAY","JUN","JUL","AGO","SEP","OCT","NOV","DIC"]
    const getEndDate = (cevent : CalendarEvent) => {
        if(cevent.fecha_fin){
            return(` - ${cevent.fecha_fin.getUTCDate()} ${months[cevent.fecha_fin.getMonth()]}`)
        } else {
            return("")
        }
    }
    return(
        <div className={styles.datebox_container}>
            <p className={styles.event_text}>{calendarEvent.texto}</p>
            <span className={styles.date}>{`${calendarEvent.fecha_inicio.getUTCDate()} ${months[calendarEvent.fecha_inicio.getMonth()]}${getEndDate(calendarEvent)}`}</span>
            <div className={styles.category_container}>
                <div className={styles.category}>{calendarEvent.tipo}</div>
            </div>
        </div>
    )
}

export default DateCard