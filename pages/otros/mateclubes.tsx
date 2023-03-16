import { NextPage } from "next";
import Head from "next/head";
import InProgress from "../../components/InProgress/InProgress";
import Layout from "../../components/Layout/Layout";

const MathClubs : NextPage = () => {
    return(
        <>
        <Head>
            <title>Mateclubes</title>
        </Head>
        <Layout>
            <InProgress/>
        </Layout>        
        </>)
}

export default MathClubs