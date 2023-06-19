import { GetStaticProps, NextPage } from "next"
import Head from "next/head"
import Layout from "../../components/Layout/Layout"
import Venues, { DropPoint, Venue } from "../../components/Venues/Venues"
import { getDateFromJSON} from "../../lib/aux_functions";
import { School } from "../../components/ResultsPage/resultsTypes";
import { venueDataGenerator } from "../../lib/aux_db_calls";

const competition = "OMA";
const instance_hierarchy = ["INTERCOLEGIAL","ZONAL","REGIONAL","NACIONAL"];

export const getStaticProps: GetStaticProps= async ({ params }) => {
    return venueDataGenerator(competition,instance_hierarchy); 
  };

const OMAVenues : NextPage<{next_instance: string,venues: Venue<School>[],dropPoints: DropPoint [], auth_max_date: string}> = ({next_instance,venues,dropPoints,auth_max_date}) => {
    const date = auth_max_date?getDateFromJSON(auth_max_date):undefined;
    return(
        <>
        <Head>
        <title>Sedes OMA</title>
            <meta   name="description"
                content="Sedes de instancias OMA y puntos de entrega de autorizaciones"></meta>
        </Head>
        <Layout>
            <Venues type={competition} venues={venues} instance={next_instance} dropPoints={dropPoints} auth_max_date={date}/>
        </Layout>
        </>
        )
}

export default OMAVenues