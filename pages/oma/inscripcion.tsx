import { NextPage } from "next";
import Head from "next/head";
import InProgress from "../../components/InProgress/InProgress";
import Layout from "../../components/Layout/Layout";

const OMAInscription: NextPage = () => {
  return (
    <>
      <Head>
        <title>Inscripción OMA</title>
      </Head>
      <Layout>
        <InProgress/>
      </Layout>
    </>
  );
};

export default OMAInscription;
