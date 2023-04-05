import { NextPage } from "next";
import Head from "next/head";
import Layout from "../../components/Layout/Layout";
import Home from "../../components/Homes/Home";
import { getCalendarEvents } from "../../lib/aux_db_calls";
import { JSONCalendarEvent, getDatesFromJson } from "../../components/CalendarComponents/CalendarTypes";

export async function getStaticProps() {
    const events = await getCalendarEvents(new Date().getFullYear(), "Ñandú")
    let newProps = {events: JSON.parse(JSON.stringify(events.results))}
    return {
      props: newProps
    }
  }

const NanduVenues : NextPage<{events: JSONCalendarEvent[]}> = ({events}) => {
    const dates = getDatesFromJson(events);
    return(
        <>
        <Head>
            <title>Ñandú</title>
            <meta   name="description"
                content="Paǵina principal de Ñandú"></meta>
        </Head>
        <Layout>
            <Home competition="Ñandú" dates={dates}/>
        </Layout>
        </>
        )
}

export default NanduVenues