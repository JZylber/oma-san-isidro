import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { getDatesFromJson, JSONCalendarEvent } from "../../components/CalendarComponents/CalendarTypes";
import DateBanner from "../../components/CalendarComponents/DateBanner/DateBanner";
import Layout from "../../components/Layout/Layout";
import { getCalendarEvents } from "../../lib/aux_db_calls";
import styles from "./Mateclubes.module.scss";

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const year = new Date().getFullYear()
    const available = await getCalendarEvents(year)
    const newProps = {results: JSON.parse(JSON.stringify(available.results)),year: year}
    return {
      props: newProps,
    };     
}


const MathClubs : NextPage<{results : Array<JSONCalendarEvent>,year:number}> = ({results,year}) => {
    const events = getDatesFromJson(results);
    return(
        <>
        <Head>
            <title>Mateclubes</title>
            <meta   name="description"
                content="Información general de los mateclubes"></meta>
        </Head>
        <Layout>
            <h1 className={styles.title}>Mateclubes</h1>
            <section className={styles.section}>
                <h3 className={styles.section_title}>Próximas Fechas</h3>
                <DateBanner dates={events} displayAmount={4} displayCategory="Mateclubes"/>
            </section>
        </Layout>        
        </>)
}

export default MathClubs