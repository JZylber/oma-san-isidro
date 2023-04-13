import { NextPage } from "next";
import Head from "next/head";
import InProgress from "../../components/InProgress/InProgress";
import Layout from "../../components/Layout/Layout";
import Rules from "../../components/Rules/Rules";

const OMARules : NextPage = () => {
    return(
        <>
        <Head>
            <title>Reglamento OMA</title>
            <meta   name="description"
                content="Reglamento oficial para participar de OMA"></meta>
        </Head>
        <Layout>
            <Rules type="OMA"/>
        </Layout>
        </>)
}

export default OMARules