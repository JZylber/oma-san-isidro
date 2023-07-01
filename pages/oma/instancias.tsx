import {GetStaticProps, NextPage } from "next"
import Head from "next/head"
import Layout from "../../components/Layout/Layout"
import { getDateFromJSON} from "../../lib/aux_functions";
import { getInstances} from "../../lib/aux_db_calls";
import Instances from "../../components/Instances/InstanceMenu";

const competition = "OMA";

export const getStaticProps: GetStaticProps= async ({ params }) => {
    const year = (new Date()).getFullYear();
    const instances =  (await getInstances(competition,year)).results;
    return {props : {instances:JSON.parse(JSON.stringify(instances))}}
  };

const OMAVenues : NextPage<{instances: {instancia: string, fecha: string}[]}> = ({instances}) => {
  const decodedInstances = instances.map((instance) => {return{...instance,fecha: getDateFromJSON(instance.fecha)}})
  return(
        <>
        <Head>
        <title>Instancias OMA</title>
            <meta   name="description"
                content="Sedes de instancias OMA y puntos de entrega de autorizaciones"></meta>
        </Head>
        <Layout>
            <Instances competition={competition} instances={decodedInstances}/>
        </Layout>
        </>
        )
}

export default OMAVenues