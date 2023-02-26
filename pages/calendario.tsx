import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Layout from "../components/Layout/Layout";
import { getCalendarEvents } from "../lib/aux_db_calls";

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const available = await getCalendarEvents(2022)
    const newProps = {results: JSON.parse(JSON.stringify(available.results))}
    return {
      props: newProps,
    };     
}

interface calendarEvents{
    fecha_inicio: Date,
    fecha_fin: Date,
    tipo: string,
    texto: string
}

const Calendar : NextPage<{results : Array<calendarEvents>}> = ({results}) => {
    return(
        <>
        <Head>
            <title>Calendario</title>
        </Head>
        <Layout>
            <h1>Calendario</h1>
            <div>
                {results.map((event) => <div>{event.fecha_inicio.toString()}</div>)}
            </div>
        </Layout>
        </>
        )
}

export default Calendar