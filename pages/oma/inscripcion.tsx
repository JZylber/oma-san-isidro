import { NextPage } from "next";
import Head from "next/head";
import { Inscripcion } from "../../components/Inscription/Inscription";
import Layout from "../../components/Layout/Layout";

const OMAInscription: NextPage = () => {
  return (
    <>
      <Head>
        <title>Inscripción OMA</title>
      </Head>
      <Layout>
        <Inscripcion type="OMA" />
      </Layout>
    </>
  );
};

export default OMAInscription;
