import { CalendarEvent } from "../CalendarTypes";
import styles from "./DateBanner.module.scss";

const DateBanner = ({dates}:{dates: CalendarEvent []}) => {
    const currentDate = new Date()
    const upcomingDates = dates.filter((date) => date.fecha_inicio > currentDate)
    upcomingDates.sort(function(a, b) {
        var distancea = Math.abs(currentDate.getTime() - a.fecha_inicio.getTime());
        var distanceb = Math.abs(currentDate.getTime() - b.fecha_inicio.getTime());
    return distancea - distanceb; // sort a before b when the distance is smaller
    });
    let upcomingDate = upcomingDates[0]
    const months = ["ENE","FEB","MAR","ABR","MAY","JUN","JUL","AGO","SEP","OCT","NOV","DIC"]
    return(
        <div className={styles.container}>
            <div>{`${upcomingDate.fecha_inicio.getDate()} - ${months[upcomingDate.fecha_inicio.getMonth()]}`}</div>
            <div>{upcomingDate.texto}</div>
            <div>{upcomingDate.tipo}</div>
        </div>
    )
}

export default DateBanner