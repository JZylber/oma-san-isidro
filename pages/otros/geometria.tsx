import { NextPage } from "next";
import Head from "next/head";
import Layout from "../../components/Layout/Layout";
import styles from "./Geometria.module.scss"

const Geometry : NextPage = () => {
    return(
        <>
        <Head>
            <title>Geometría e Imaginación</title>
        </Head>
        <Layout>
            <div className={styles.container}>
                <h1 className={styles.title}>Torneo de Geometría e Imaginación</h1>
            </div>
        </Layout>        
        </>)
}

export default Geometry