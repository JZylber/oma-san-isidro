import { GetStaticProps, NextPage } from "next"
import Head from "next/head"
import Layout from "../../components/Layout/Layout"
import Venues, { Venue } from "../../components/Venues/Venues"
import { getInstanceVenues } from "../../lib/aux_db_calls";

export const getStaticProps: GetStaticProps= async ({ params }) => {
    const next_instance = "INTERCOLEGIAL";
    const year = new Date().getFullYear();
    const available = await getInstanceVenues("OMA",year,next_instance);
    const newProps = {venues: available.results}
    return {
      props: newProps,
    };      
  };

export const OMAVenues : NextPage<{venues: Venue[]}> = ({venues}) => {
    return(
        <>
        <Head>
            <title>Reglamento Ñandú</title>
            <meta   name="description"
                content="Reglamento oficial para participar de Ñandú"></meta>
        </Head>
        <Layout>
            <Venues type="oma" venues={venues}/>
        </Layout>
        </>
        )
}

export default OMAVenues