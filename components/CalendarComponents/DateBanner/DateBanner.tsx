import Link from "next/link";
import { Button } from "../../buttons/Button";
import { CalendarEvent } from "../CalendarTypes";
import styles from "./DateBanner.module.scss";
import NewsArrow from "../../../public/images/newsArrow.svg"
import PageLink from "../../../public/images/pageLinkIcon.svg"

interface DateBannerProps {
    dates: CalendarEvent [],
    displayAmount?: number,
    displayCategory?: string
} 

const DateBanner = ({dates,displayAmount = 3,displayCategory}:DateBannerProps) => {
    const showCategory = !displayCategory;
    const category_filter = showCategory ? "" : `?categoria=${displayCategory}`
    const currentDate = new Date()
    const upcomingDates = dates.filter((date) => date.fecha_inicio >= currentDate)
    upcomingDates.sort(function(a, b) {
        var distancea = Math.abs(currentDate.getTime() - a.fecha_inicio.getTime());
        var distanceb = Math.abs(currentDate.getTime() - b.fecha_inicio.getTime());
    return distancea - distanceb;
    });
    const months = ["ENE","FEB","MAR","ABR","MAY","JUN","JUL","AGO","SEP","OCT","NOV","DIC"]
    const getEndDate = (cevent : CalendarEvent) => {
        if(cevent.fecha_fin){
            return(` - ${cevent.fecha_fin.getDate()}`)
        } else {
            return("")
        }
    }
    const renderUpcomingDate = (date:CalendarEvent,idx : number) => {
        return(
        <div className={[styles.container_entry,showCategory?styles.container_entry_categorized:styles.container_entry_uncategorized].join(" ")} key={idx}>
            <div className={styles.date}><span>{`${date.fecha_inicio.getDate()} ${getEndDate(date)} ${months[date.fecha_inicio.getMonth()]}`}</span></div>
            <div className={styles.event}>{date.texto}</div>
            {showCategory && <div className={styles.type}>{date.tipo}</div>}
        </div>
        )
    }
    return(
        <>
        <div className={[styles.container,!showCategory && styles.container_medium].join(" ")}>
        {upcomingDates.filter((date) => (displayCategory === undefined) || (displayCategory === date.tipo)).slice(0,displayAmount).map(renderUpcomingDate)}
        <Link href={`/otros/calendario${category_filter}`} className={styles.link_tag}>
            <div className={styles.small_link}>
                <PageLink/>
                <span>Ver calendario completo</span>
            </div>
        </Link>
        </div>
        </>
    )
}

export default DateBanner