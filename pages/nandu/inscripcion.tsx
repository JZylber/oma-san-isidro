import { NextPage } from "next";
import Head from "next/head";
import InProgress from "../../components/InProgress/InProgress";
import Layout from "../../components/Layout/Layout";

const NanduInscription : NextPage = () => {
    return(
        <>
        <Head>
            <title>Inscripción Ñandú</title>
        </Head>
        <Layout>
            <InProgress/>
        </Layout>
        </>
        )
}

export default NanduInscription