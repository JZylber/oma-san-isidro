import { NextPage } from "next";
import Head from "next/head";
import Layout from "../../../components/Layout/Layout";
import Rules from "../../../components/Rules/Rules";

const NanduRules : NextPage = () => {
    return(
        <>
        <Head>
            <title>Reglamento Ñandú</title>
            <meta   name="description"
                content="Reglamento oficial para participar de Ñandú"></meta>
        </Head>
        <Layout>
            <Rules type="Ñandú"/>
        </Layout>
        </>
        )
}

export default NanduRules