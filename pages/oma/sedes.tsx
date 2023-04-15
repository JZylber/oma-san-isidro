import { NextPage } from "next"
import Head from "next/head"
import Layout from "../../components/Layout/Layout"
import Venues from "../../components/Venues/Venues"

const OMAVenues : NextPage = () => {
    return(
        <>
        <Head>
            <title>Reglamento Ñandú</title>
            <meta   name="description"
                content="Reglamento oficial para participar de Ñandú"></meta>
        </Head>
        <Layout>
            <Venues type="oma"/>
        </Layout>
        </>
        )
}

export default OMAVenues