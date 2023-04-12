import { CalendarEvent } from "../CalendarTypes";
import banner_styles from "./DateBanner.module.scss";
import styles from "./AllDatesBanner.module.scss";
import PageLink from "../../../public/images/pageLinkIcon.svg"
import Link from "next/link";
import { title } from "process";

interface DateBannerProps {
    dates: CalendarEvent [],
    category: string,
} 

const AllDatesBanner = ({dates,category}:DateBannerProps) => {
    const months = ["ENE","FEB","MAR","ABR","MAY","JUN","JUL","AGO","SEP","OCT","NOV","DIC"];

    return(
        <section>
            <div className={styles.header}>
                <span className={styles.title}>Fechas</span>
                <Link href={`/otros/calendario?categoria=${category}`} className={banner_styles.link_tag}>
                    <div className={banner_styles.small_link}>
                        <div className={banner_styles.small_link_image}><PageLink/></div>
                        <span>Ver calendario {category}</span>
                    </div>
                </Link>
            </div>
            <div className={styles.dates_container}>
                {dates.map((date,idx) => {
                    return(
                        <div className={styles.event} key={idx}>
                            <span className={styles.text}>{date.texto}</span>
                            <span className={styles.date}>{`${date.fecha_inicio.getDate()} ${months[date.fecha_inicio.getMonth()]}`}</span>
                        </div>
                    )})}
            </div>
        </section>
    )
}

export default AllDatesBanner