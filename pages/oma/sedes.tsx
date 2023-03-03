import { NextPage } from "next";
import Head from "next/head";
import InProgress from "../../components/InProgress/InProgress";
import Layout from "../../components/Layout/Layout";

const OMAVenues : NextPage = () => {
    return(
        <>
        <Head>
            <title>Sedes OMA</title>
        </Head>
        <Layout>
            <InProgress/>
        </Layout>
        </>)
}

export default OMAVenues