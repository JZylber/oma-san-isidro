import { NextPage } from "next";
import { Authorization } from "../../components/Auth/Auth";
import Head from "next/head";
import Layout from "../../components/Layout/Layout";

const OMAAuthorization: NextPage = () => {
  return (
    <>
      <Head>
        <title>Autorización OMA</title>
        <meta   name="description"
                content="Descarga de la autorización para participar de cada una de las instancias de OMA"></meta>
      </Head>
      <Layout>
        <Authorization type="oma" />
      </Layout>
    </>
  );
};

export default OMAAuthorization;
