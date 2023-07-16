import { NextPage } from "next";
import Head from "next/head";
import InProgress from "../../../components/InProgress/InProgress";
import Layout from "../../../components/Layout/Layout";
import Problems from "../../../components/Problems/Problems";

const NanduProblems : NextPage = () => {
    return(
        <>
        <Head>
            <title>Problemas Ñandú</title>
        </Head>
        <Layout>
            <Problems type="Nandu"/>
        </Layout>
        </>
        )
}

export default NanduProblems