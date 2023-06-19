import { GetStaticProps, NextPage } from "next"
import Head from "next/head"
import Layout from "../../components/Layout/Layout"
import Venues, { DropPoint, Participant, Venue } from "../../components/Venues/Venues"
import { getDateFromJSON} from "../../lib/aux_functions";
import { School } from "../../components/ResultsPage/resultsTypes";
import { venueDataGenerator } from "../../lib/aux_db_calls";

const competition = "ÑANDÚ";
const instance_hierarchy = ["INTERESCOLAR","ZONAL","REGIONAL","NACIONAL"];

export const getStaticProps: GetStaticProps= async ({ params }) => {
    return venueDataGenerator(competition,instance_hierarchy); 
  };

const NanduVenues : NextPage<{next_instance: string,venues: Venue[],dropPoints: DropPoint [], auth_max_date: string,participants: Participant[]}> = ({next_instance,venues,dropPoints,auth_max_date,participants}) => {
    const date = auth_max_date?getDateFromJSON(auth_max_date):undefined;
    return(
        <>
        <Head>
            <title>Sedes Ñandú</title>
            <meta   name="description"
                content="Sedes de instancias Ñandú y puntos de entrega de autorizaciones"></meta>
        </Head>
        <Layout>
            <Venues type={competition} venues={venues} instance={next_instance} dropPoints={dropPoints} auth_max_date={date} participants={participants}/>
        </Layout>
        </>
        )
}

export default NanduVenues