import { NextPage } from "next";
import Head from "next/head";
import Layout from "../../components/Layout/Layout";
import Home from "../../components/Homes/Home";
import { getCalendarEvents } from "../../lib/aux_db_calls";
import { JSONCalendarEvent, getDatesFromJson } from "../../components/CalendarComponents/CalendarTypes";

export async function getStaticProps() {
    const events = await getCalendarEvents(new Date().getFullYear(), "OMA")
    let newProps = {events: JSON.parse(JSON.stringify(events.results))}
    return {
      props: newProps
    }
  }

const OMAVenues : NextPage<{events: JSONCalendarEvent[]}> = ({events}) => {
    const dates = getDatesFromJson(events);
    return(
        <>
        <Head>
            <title>OMA</title>
            <meta   name="description"
                content="Paǵina principal de OMA"></meta>
        </Head>
        <Layout>
            <Home competition="OMA" dates={dates}/>
        </Layout>
        </>)
}

export default OMAVenues