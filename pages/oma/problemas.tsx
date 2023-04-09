import { NextPage } from "next";
import Head from "next/head";
import InProgress from "../../components/InProgress/InProgress";
import Layout from "../../components/Layout/Layout";
import Problems from "../../components/Problems/Problems";

const OMAProblems : NextPage = () => {
    return(
        <>
        <Head>
            <title>Problemas OMA</title>
            <meta   name="description"
                content="Banco de problemas tomados en pruebas previas de OMA"></meta>
        </Head>
        <Layout>
            <Problems type="OMA"/>
        </Layout>        
        </>)
}

export default OMAProblems