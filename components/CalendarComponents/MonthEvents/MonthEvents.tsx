import { CalendarEvent } from "../CalendarTypes";
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
                <h2 className={styles.title}>{name}</h2>
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