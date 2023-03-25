import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { getDatesFromJson, JSONCalendarEvent } from "../../components/CalendarComponents/CalendarTypes";
import DateBanner from "../../components/CalendarComponents/DateBanner/DateBanner";
import Layout from "../../components/Layout/Layout";
import { getCalendarEvents } from "../../lib/aux_db_calls";
import styles from "./Geometria.module.scss";
import Warning from "../../public/images/warning.svg";
import BankInformation from "../../components/Inscription/BankInformation";

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const year = new Date().getFullYear()
    const available = await getCalendarEvents(year)
    const newProps = {results: JSON.parse(JSON.stringify(available.results)),year: year}
    return {
      props: newProps,
    };     
}


const Geometry : NextPage<{results : Array<JSONCalendarEvent>,year:number}> = ({results,year}) => {
    const events = getDatesFromJson(results);
    return(
        <>
        <Head>
            <title>Geometría e Imaginación</title>
            <meta   name="description"
                content="Información general del torneo de geometría e imaginación"></meta>
        </Head>
        <Layout>
                <h1 className={styles.title}>Torneo de Geometría e Imaginación</h1>
                <section className={styles.section}>
                    <h3 className={styles.section_title}>Próximas Fechas</h3>
                    <DateBanner dates={events} displayAmount={3} displayCategory="Geometría"/>
                </section>
                <section className={styles.section}>
                    <h3 className={styles.section_title}>Inscripción</h3>
                    <div className={styles.section_content}>
                        <ol>
                            <li>Abonar $3000 por participante. Se debe realizar un solo depósito por la totalidad de alumnos inscriptos. <span className={styles.bold}>Los participantes del torneo de geometría no deben abonar luego la inscripción a OMA/Ñandú.</span></li>
                            <BankInformation/>
                            <li>Completar una planilla con los datos de los alumnos. Deben consignar apellido y nombre, DNI, nivel y año que cursan. Esta planilla deben enviarla a Roxana Magistrali: <a href="mailto:roxana.magistrali@gmail.com">roxana.magistrali@gmail.com</a> antes del 12 de abril junto con el comprobante de pago escaneado.</li>
                            <li>El día de la primera instancia, llevar el comprobante de pago para poder entregarles un recibo</li>
                        </ol>
                    </div>
                </section>
                <section className={styles.section}>
                    <h3 className={styles.section_title}>Información General</h3>
                    <div className={styles.section_content}>
                        <p>Les proponemos como siempre, resolver problemas de Geometría desde una mirada creativa, libre y que permita desarrollar en los alumnos la visualización del problema con diferentes herramientas.</p>
                        <p>Como es característico de este TORNEO las rondas son presenciales y no son eliminatorias, pueden incorporarse alumnos (inscriptos en las actividades de OMA), en cualquiera de las tres rondas. De no haberse inscripto en las actividades de OMA, deberá abonar cuando participe del Torneo la correspondiente inscripción.</p>
                        <p>Les recordamos también que en este TORNEO, el alumno es libre de llevar a la prueba escrita el material que prefiera y crea necesario para resolver los problemas. Siempre les recomendamos utilizar las NOTAS DE GEOMETRÍA que publica la OMA para entrenamiento y material de consulta en las pruebas.</p>
                        <p>En <a href="https://www.oma.org.ar/problemas/index.php/problemas-de-geometria">https://www.oma.org.ar/problemas/index.php/problemas-de-geometria</a> , están los problemas de entrenamiento del 2022, y el primero de 2023, (sus respectivas soluciones, como siempre, están en la quinta temporada de Las Leñitas Geométricas), que pueden ser de mucha ayuda.</p>
                        <p>Los alumnos podrán utilizar en las pruebas el GeoGebra en sus computadoras, Tablet o teléfonos, en el modo examen.</p>
                        {/*<p>La novedad de este año es que proponemos RONDAS al estilo de TORNEO, es decir con la prueba escrita, su posterior discusión y la proclamación de campeones por niveles. Por lo tanto, la actividad durará “todo un día” mañana y tarde. Cada colegio, coordinación intercolegial o delegación zonal deberá informar a la correspondiente Secretaría Regional OMA, en qué lugar (Colegio, Institución, etc.) se realiza la primera y la segunda ronda en este formato de TORNEO. La Ronda Final la organizará OMA.</p>*/}
                    </div>
                </section>
                <section className={styles.section}>
                    <h3 className={styles.section_title}>Niveles</h3>
                    <div className={styles.section_content}>
                        <ul>
                            <li><span className={[styles.level,styles.bold].join(" ")}>Nivel Inicial:</span><span className={styles.years}> 4° y 5° año de escolaridad</span></li>
                            <li><span className={[styles.level,styles.bold].join(" ")}>Primer Nivel:</span><span className={styles.years}> 6° y 7° año de escolaridad</span></li>
                            <li><span className={[styles.level,styles.bold].join(" ")}>Segundo Nivel:</span><span className={styles.years}> 8° y 9° año de escolaridad</span></li>
                            <li><span className={[styles.level,styles.bold].join(" ")}>Tercer Nivel:</span><span className={styles.years}> 10°, 11° y 12° año de escolaridad</span></li>
                        </ul>
                    </div>
                </section>
                <div className={styles.warning_box}>
                    <div className={styles.warning_box_title}>
                        <h3>Importante</h3>
                        <Warning className={styles.warning_box_title_icon} />
                    </div>
                    <div className={styles.warning_box_content}>
                        <p>Como la Primera Ronda del Torneo Geometría e Imaginación es la primera actividad/certamen que participan los alumnos en 2023, se deberán abonar los 3000 pesos por alumno de inscripción anual en el momento de inscribirse a esta. Si esto ocurre, NO se deben abonar luego las inscripciones para OMA o Ñandú.</p>
                    </div>
                </div>
                <section className={styles.section}>
                    <h3 className={styles.section_title}>Consultas</h3>
                    <div className={styles.section_content}>
                        <p>Para más información, escribir a <a href="mailto:roxana.magistrali@gmail.com">roxana.magistrali@gmail.com</a></p>
                    </div>
                </section>
        </Layout>        
        </>)
}

export default Geometry