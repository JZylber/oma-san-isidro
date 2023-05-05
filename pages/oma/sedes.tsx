import { GetStaticProps, NextPage } from "next"
import Head from "next/head"
import Layout from "../../components/Layout/Layout"
import Venues, { DropPoint, Venue } from "../../components/Venues/Venues"
import { getInstanceDropPoints, getInstanceVenues, getInstances } from "../../lib/aux_db_calls";
import { getDateFromJSON } from "../../lib/aux_functions";

const competition = "OMA";

export const getStaticProps: GetStaticProps= async ({ params }) => {
  const date= new Date();
  const year = date.getFullYear();
  const newProps = await getInstances(competition,year).then(async (instances) => {
    const {instancia,fecha_limite_autorizacion} = instances.results.filter(instance => instance.fecha > date)[0];
    const next_instance = instancia;
    const auth_max_date = fecha_limite_autorizacion;
    const dropPoints = await getInstanceDropPoints(competition,year,next_instance);
    const venues = await getInstanceVenues(competition,year,next_instance);
    return({next_instance: next_instance,venues: venues.results,dropPoints: dropPoints.results,auth_max_date: JSON.parse(JSON.stringify(auth_max_date))})
  });
  return {
    props: newProps,
  };  
  };

const OMAVenues : NextPage<{next_instance: string,venues: Venue[],dropPoints: DropPoint [], auth_max_date: string}> = ({next_instance,venues,dropPoints,auth_max_date}) => {
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