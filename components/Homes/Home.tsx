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
        <h2 className={styles.sectionTitle}>Próxima instancia</h2>
        <p>Aca iría la información de la próxima instancia, en particular, horario y sedes asignadas a cada colegio (es una tabla que indica zona, colegio, y sede, con dirección de la sede). Podría haber un filtro para zona/colegio/sede, pero debería ser una tabla chica, no se si hacen falta</p>
        <h2 className={styles.sectionTitle}>Niveles</h2>
        <p>Acá irían la equivalencia entre nivel y año escolar</p>
        <h2 className={styles.sectionTitle}>Instancias</h2>
        <p>Acá se mostrarían la progresión de las instancias, preferentemente de forma gráfica. Adjunto una versión ejemplo</p>
        <img src="/images/instancias.png" alt="Instancia"/>
        </>
    )
}

export default Home
