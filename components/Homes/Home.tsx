import { CalendarEvent } from "../CalendarComponents/CalendarTypes";
import DateBanner from "../CalendarComponents/DateBanner/DateBanner";
import styles from "./Home.module.scss";

interface HomeProps {
    competition: string
    dates: Array<CalendarEvent>
}

const Home = ({competition,dates}:HomeProps) => {
    return(
        <>
        <h1 className={styles.title}>{competition}</h1>
        <h2 className={styles.sectionTitle}>Fechas</h2>
        <DateBanner dates={dates} displayAmount={dates.length} displayCategory={competition} ignoreCurrentDate={true}/>
        </>
    )
}

export default Home
