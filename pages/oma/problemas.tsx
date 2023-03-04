import { NextPage } from "next";
import Head from "next/head";
import InProgress from "../../components/InProgress/InProgress";
import Layout from "../../components/Layout/Layout";

const OMAProblems : NextPage = () => {
    return(
        <>
        <Head>
            <title>Problemas OMA</title>
        </Head>
        <Layout>
            <InProgress/>
        </Layout>        
        </>)
}

export default OMAProblems