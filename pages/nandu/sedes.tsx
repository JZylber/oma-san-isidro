import { NextPage } from "next";
import Head from "next/head";
import InProgress from "../../components/InProgress/InProgress";
import Layout from "../../components/Layout/Layout";

const NanduVenues : NextPage = () => {
    return(
        <>
        <Head>
            <title>Sedes Ñandú</title>
        </Head>
        <Layout>
            <InProgress/>
        </Layout>
        </>
        )
}

export default NanduVenues