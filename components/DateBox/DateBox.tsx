import { CalendarEvent } from "../../pages/calendario";
import styles from "./DateBox.module.scss";

const DateBox = ({calendarEvent}:{calendarEvent : CalendarEvent}) => {
    const months = ["ENE","FEB","MAR","ABR","MAY","JUN","JUL","AGO","SEP","OCT","NOV","DIC"]
    const getEndDate = (cevent : CalendarEvent) => {
        if(cevent.fecha_fin){
            return(` - ${cevent.fecha_fin.getDate()} ${months[cevent.fecha_fin.getMonth()]}`)
        } else {
            return("")
        }
    }
    return(
        <div className={styles.datebox_container}>
            <h3 className={styles.event_text}>{calendarEvent.texto}</h3>
            <span className={styles.date}>{`${calendarEvent.fecha_inicio.getDate()} ${months[calendarEvent.fecha_inicio.getMonth()]}${getEndDate(calendarEvent)}`}</span>
            <div className={styles.category}>{calendarEvent.tipo}</div>
        </div>
    )
}

export default DateBox