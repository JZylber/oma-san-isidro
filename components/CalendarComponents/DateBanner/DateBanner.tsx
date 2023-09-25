import Link from "next/link";
import { CalendarEvent } from "../CalendarTypes";
import styles from "./DateBanner.module.scss";
import CalendarIcon from "../../../public/images/calendarIcon.svg"
import PageLink from "../../../public/images/pageLinkIcon.svg"

interface DateBannerProps {
    dates: CalendarEvent [],
    displayAmount?: number,
    displayCategory?: string,
    ignoreCurrentDate?: boolean
} 

const DateBanner = ({dates,displayAmount = 3,displayCategory,ignoreCurrentDate=false}:DateBannerProps) => {
    const showCategory = !displayCategory;
    const category_filter = showCategory ? "" : `?categoria=${displayCategory}`
    const currentDate = new Date()
    const upcomingDates = dates.filter((date) => date.fecha_inicio >= currentDate)
    upcomingDates.sort(function(a, b) {
        var distancea = Math.abs(currentDate.getTime() - a.fecha_inicio.getTime());
        var distanceb = Math.abs(currentDate.getTime() - b.fecha_inicio.getTime());
        return distancea - distanceb;
    });
    const datesToRender = ignoreCurrentDate ? dates : upcomingDates;
    const months = ["ENE","FEB","MAR","ABR","MAY","JUN","JUL","AGO","SEP","OCT","NOV","DIC"]
    const getEndDate = (cevent : CalendarEvent) => {
        if(cevent.fecha_fin){
            return(` - ${cevent.fecha_fin.getUTCDate()}`)
        } else {
            return("")
        }
    }
    const renderDate = (date:CalendarEvent,idx : number,dates: CalendarEvent []) => {
        return(
        <div className={[styles.container_entry].join(" ")} key={idx}>
            <div className={styles.date}><span>{`${date.fecha_inicio.getUTCDate()} ${getEndDate(date)} ${months[date.fecha_inicio.getMonth()]}`}</span></div>
            <div className={styles.event}>{date.texto}</div>
            <div className={styles.type_container}>
                {showCategory && <div className={styles.type}>{date.tipo}</div>}
                {idx === dates.length-1 && 
                <Link href={`/otros/calendario${category_filter}`}>
                    <div className={styles.small_link}>
                        <div className={styles.small_link_image}><PageLink/></div>
                        <span>Ver calendario completo</span>
                    </div>
                </Link>}
           </div>
        </div>
        )
    }
    return(
        <>
        <div className={[styles.container,!showCategory && styles.container_medium].join(" ")}>
            {displayAmount === 1 && <div className={styles.calendar_icon}><CalendarIcon/></div>}
            <div className={styles.entries}>
            {datesToRender.filter((date) => (displayCategory === undefined) || (displayCategory === date.tipo)).slice(0,displayAmount).map(renderDate)}
            </div>
        </div>
        </>
    )
}

export default DateBanner