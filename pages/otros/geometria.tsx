import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { getDatesFromJson, JSONCalendarEvent } from "../../components/CalendarComponents/CalendarTypes";
import DateBanner from "../../components/CalendarComponents/DateBanner/DateBanner";
import Layout from "../../components/Layout/Layout";
import { getCalendarEvents } from "../../lib/aux_db_calls";
import styles from "./Geometria.module.scss"

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
        </Head>
        <Layout>
            <div className={styles.container}>
                <h1 className={styles.title}>Torneo de Geometría e Imaginación</h1>
                <section>
                    <h3 className={styles.section_title}>Próximas Fechas</h3>
                    <DateBanner dates={events} displayAmount={3} displayCategory="Geometría"/>
                </section>
            </div>
        </Layout>        
        </>)
}

export default Geometry