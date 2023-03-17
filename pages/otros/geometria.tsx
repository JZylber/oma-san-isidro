import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { getDatesFromJson, JSONCalendarEvent } from "../../components/CalendarComponents/CalendarTypes";
import DateBanner from "../../components/CalendarComponents/DateBanner/DateBanner";
import Layout from "../../components/Layout/Layout";
import { getCalendarEvents } from "../../lib/aux_db_calls";
import styles from "./Geometria.module.scss";
import Warning from "../../img/warning.svg";
import InProgress from "../../components/InProgress/InProgress";

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
            <InProgress/>
        </Layout>        
        </>)
}

export default Geometry