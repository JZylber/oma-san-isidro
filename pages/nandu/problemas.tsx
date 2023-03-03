import { NextPage } from "next";
import Head from "next/head";
import InProgress from "../../components/InProgress/InProgress";
import Layout from "../../components/Layout/Layout";

const NanduProblems : NextPage = () => {
    return(
        <>
        <Head>
            <title>Problemas Ñandú</title>
        </Head>
        <Layout>
            <InProgress/>
        </Layout>
        </>
        )
}

export default NanduProblems