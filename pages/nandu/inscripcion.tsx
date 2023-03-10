import { NextPage } from "next";
import Head from "next/head";
import InProgress from "../../components/InProgress/InProgress";
import { Inscripcion } from "../../components/Inscription/Inscription";
import Layout from "../../components/Layout/Layout";

const NanduInscription : NextPage = () => {
    return(
        <>
        <Head>
            <title>Inscripción Ñandú</title>
        </Head>
        <Layout>
            <Inscripcion type="Ñandú"/>
        </Layout>
        </>
        )
}

export default NanduInscription