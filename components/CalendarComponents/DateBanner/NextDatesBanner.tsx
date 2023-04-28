import { CalendarEvent } from "../CalendarTypes";
import banner_styles from "./DateBanner.module.scss";
import styles from "./NextDatesBanner.module.scss";
import Link from "next/link";
import Image from "next/image";

interface DateBannerProps {
    dates: CalendarEvent [],
    category: string,
} 

const NextDatesBanner = ({dates,category}:DateBannerProps) => {
    const months = ["ENE","FEB","MAR","ABR","MAY","JUN","JUL","AGO","SEP","OCT","NOV","DIC"];
    const current_date = new Date();
    const next_dates = dates.filter(date => date.fecha_inicio > current_date).slice(0,3);
    return(
        <section>
            <div className={styles.header}>
                <span className={styles.title}>Fechas</span>
                <Link href={`/otros/calendario?categoria=${category}`} className={[banner_styles.link_tag,styles.header_link].join(" ")}>
                    <div className={banner_styles.small_link}>
                        <div className={banner_styles.small_link_image}><Image src="/images/pageLinkIcon.svg" fill={true} alt=""/></div>
                        <span>Ver calendario {category}</span>
                    </div>
                </Link>
            </div>
            <div className={styles.dates_container}>
                {next_dates.map((date,idx) => {
                    return(
                        <div className={styles.event} key={idx}>
                            <span className={styles.text}>{date.texto}</span>
                            <span className={styles.date}>{`${date.fecha_inicio.getDate()} ${months[date.fecha_inicio.getMonth()]}`}</span>
                        </div>
                    )})}
            </div>
            <div className={styles.footer}>
                <Link href={`/otros/calendario?categoria=${category}`} className={banner_styles.link_tag}>
                    <div className={banner_styles.small_link}>
                        <div className={banner_styles.small_link_image}><Image src="/images/pageLinkIcon.svg" fill={true} alt=""/></div>
                        <span>Ver calendario {category}</span>
                    </div>
                </Link>
            </div>
        </section>
    )
}

export default NextDatesBanner