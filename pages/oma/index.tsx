import { NextPage } from "next";
import Head from "next/head";
import InProgress from "../../components/InProgress/InProgress";
import Layout from "../../components/Layout/Layout";

const OMAVenues : NextPage = () => {
    return(
        <>
        <Head>
            <title>OMA</title>
            <meta   name="description"
                content="Paǵina principal de OMA"></meta>
        </Head>
        <Layout>
            <InProgress/>
        </Layout>
        </>)
}

export default OMAVenues