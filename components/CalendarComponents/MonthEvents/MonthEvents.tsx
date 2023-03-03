import { CalendarEvent } from "../../../pages/calendario";
import DateCard from "../DateCard/DateCard";
import styles from "./MonthEvents.module.scss";

interface MonthEventsProps {
    name : string,
    events: CalendarEvent[]
}

const MonthEvents = ({name,events}:MonthEventsProps) => {
    if(events.length > 0){
        return(
            <div className={styles.container}>
                <h3 className={styles.title}>{name}</h3>
                <div className={styles.events}>
                    {events.map((event,idx) => <DateCard key={idx} calendarEvent={event}/>)}
                </div>
            </div>
        )
    } else {
        return(
            <></>
        )
    }
}

export default MonthEvents