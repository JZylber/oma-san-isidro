import { NextPage } from "next";
import Head from "next/head";
import InProgress from "../../components/InProgress/InProgress";
import Layout from "../../components/Layout/Layout";

const Geometry : NextPage = () => {
    return(
        <>
        <Head>
            <title>Geometría e Imaginación</title>
        </Head>
        <Layout>
            <InProgress/>
        </Layout>        
        </>)
}

export default Geometry