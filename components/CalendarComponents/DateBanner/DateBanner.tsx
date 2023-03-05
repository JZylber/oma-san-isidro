import Link from "next/link";
import { Button } from "../../buttons/Button";
import { CalendarEvent } from "../CalendarTypes";
import styles from "./DateBanner.module.scss";
import NewsArrow from "../../../img/newsArrow.svg"

const DateBanner = ({dates}:{dates: CalendarEvent []}) => {
    const currentDate = new Date()
    const upcomingDates = dates.filter((date) => date.fecha_inicio > currentDate)
    upcomingDates.sort(function(a, b) {
        var distancea = Math.abs(currentDate.getTime() - a.fecha_inicio.getTime());
        var distanceb = Math.abs(currentDate.getTime() - b.fecha_inicio.getTime());
    return distancea - distanceb;
    });
    const months = ["ENE","FEB","MAR","ABR","MAY","JUN","JUL","AGO","SEP","OCT","NOV","DIC"]
    const getEndDate = (cevent : CalendarEvent) => {
        if(cevent.fecha_fin){
            return(` - ${cevent.fecha_fin.getDate()} ${months[cevent.fecha_fin.getMonth()]}`)
        } else {
            return("")
        }
    }
    const renderUpcomingDate = (date:CalendarEvent,idx : number) => {
        return(
        <div className={styles.container_entry} key={idx}>
            <div className={styles.date}><span>{`${date.fecha_inicio.getDate()} ${months[date.fecha_inicio.getMonth()]}${getEndDate(date)}`}</span></div>
            <div className={styles.event}>{date.texto}</div>
            <div className={styles.type}>{date.tipo}</div>
        </div>
        )
    }
    return(
        <>
        <div className={styles.container}>
        {upcomingDates.slice(0,3).map(renderUpcomingDate)}
        </div>
        <Link href="./calendario" style={{textDecoration: 'none'}}>
            <div className={styles.link}>
                <Button content="Ver Calendario Completo">
                    <NewsArrow className={styles.arrow}/>
                </Button>
            </div>
        </Link>
        </>
    )
}

export default DateBanner