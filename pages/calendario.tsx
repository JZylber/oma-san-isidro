import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";

const Calendar : NextPage = () => {
    return(
        <>
        <Head>
            <title>Calendario</title>
        </Head>
        <Layout>
            <h1>Calendario</h1>
        </Layout>
        </>
        )
}

export default Calendar