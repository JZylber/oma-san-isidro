import {NextPage } from "next";
import Head from "next/head";
import Layout from "../../components/Layout/Layout";
import styles from "./Canguro.module.scss";
import { Button } from "../../components/buttons/Button";
import Image from "next/image";


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
            <Button content="Resultados" onClick={() => window.location.href = "https://www.oma.org.ar/canguro/editar.html"}>
                        <>
                            <Image src="/images/newsArrow.svg" alt="" width={30} height={30} />
                        </>
            </Button>
        </Layout>        
        </>)
}

export default Kangaroo