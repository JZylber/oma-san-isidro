import { NextPage } from "next";
import Head from "next/head";
import InProgress from "../../components/InProgress/InProgress";
import Layout from "../../components/Layout/Layout";

const NanduVenues : NextPage = () => {
    return(
        <>
        <Head>
            <title>Ñandú</title>
            <meta   name="description"
                content="Paǵina principal de Ñandú"></meta>
        </Head>
        <Layout>
            <InProgress/>
        </Layout>
        </>
        )
}

export default NanduVenues