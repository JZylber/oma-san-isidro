import { NextPage } from "next";
import Head from "next/head";
import InProgress from "../../components/InProgress/InProgress";
import Layout from "../../components/Layout/Layout";

const NanduRules : NextPage = () => {
    return(
        <>
        <Head>
            <title>Reglamento Ñandú</title>
        </Head>
        <Layout>
            <InProgress/>
        </Layout>
        </>
        )
}

export default NanduRules