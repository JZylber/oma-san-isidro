import { NextPage } from "next";
import Head from "next/head";
import InProgress from "../../components/InProgress/InProgress";
import Layout from "../../components/Layout/Layout";

const Books : NextPage = () => {
    return(
        <>
        <Head>
            <title>Libros</title>
        </Head>
        <Layout>
            <InProgress/>
        </Layout>        
        </>)
}

export default Books