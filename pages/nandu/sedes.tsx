import { GetStaticProps, NextPage } from "next"
import Head from "next/head"
import Layout from "../../components/Layout/Layout"
import Venues, { DropPoint, Venue } from "../../components/Venues/Venues"
import { getInstanceVenues, getInstanceDropPoints } from "../../lib/aux_db_calls";
import { getDateFromJSON } from "../../components/CalendarComponents/CalendarTypes";

const competition = "ÑANDÚ";

export const getStaticProps: GetStaticProps= async ({ params }) => {
    const year = (new Date()).getFullYear();
    const next_instance = "INTERESCOLAR";
    const auth_max_date = new Date(year,3,28);
    const dropPoints = await getInstanceDropPoints(competition,year,next_instance);
    const venues = await getInstanceVenues(competition,year,next_instance);
    const newProps = {next_instance: next_instance,venues: venues.results,dropPoints: dropPoints.results,auth_max_date: JSON.parse(JSON.stringify(auth_max_date))}
    return {
      props: newProps,
    };      
  };

const NanduVenues : NextPage<{next_instance: string,venues: Venue[],dropPoints: DropPoint [], auth_max_date: string}> = ({next_instance,venues,dropPoints,auth_max_date}) => {
    const date = getDateFromJSON(auth_max_date);
    return(
        <>
        <Head>
            <title>Sedes Ñandú</title>
            <meta   name="description"
                content="Sedes de instancias Ñandú y puntos de entrega de autorizaciones"></meta>
        </Head>
        <Layout>
            <Venues type={competition} venues={venues} instance={next_instance} dropPoints={dropPoints} auth_max_date={date}/>
        </Layout>
        </>
        )
}

export default NanduVenues