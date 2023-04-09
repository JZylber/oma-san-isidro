import { NextPage } from "next"
import Head from "next/head"
import Layout from "../../components/Layout/Layout"
import InProgress from "../../components/InProgress/InProgress"

const NanduVenues : NextPage = () => {
    return(
        <>
        <Head>
            <title>Reglamento Ñandú</title>
            <meta   name="description"
                content="Reglamento oficial para participar de Ñandú"></meta>
        </Head>
        <Layout>
            <InProgress/>
        </Layout>
        </>
        )
}

export default NanduVenues