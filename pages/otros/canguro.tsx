import {NextPage } from "next";
import Head from "next/head";
import Layout from "../../components/Layout/Layout";
import styles from "./Canguro.module.scss";


const Kangaroo : NextPage = () => {
    return(
        <>
        <Head>
            <title>Canguro</title>
            <meta   name="description"
                content="Información general de canguro matemático"></meta>
        </Head>
        <Layout>
            <h1 className={styles.title}>Canguro Matemático</h1>
        </Layout>        
        </>)
}

export default Kangaroo