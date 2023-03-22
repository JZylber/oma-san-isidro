import { NextPage } from "next";
import Head from "next/head";
import InProgress from "../../components/InProgress/InProgress";
import Layout from "../../components/Layout/Layout";

const OMAVenues : NextPage = () => {
    return(
        <>
        <Head>
            <title>Sedes OMA</title>
            <meta   name="description"
                content="Información de las sedes para la próxima instancia de OMA"></meta>
        </Head>
        <Layout>
            <InProgress/>
        </Layout>
        </>)
}

export default OMAVenues