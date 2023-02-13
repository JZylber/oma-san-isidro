import { NextPage } from "next";
import { Authorization } from "../../components/Auth/Auth";
import Head from "next/head";
import Layout from "../../components/Layout/Layout";

const OMAAuthorization: NextPage = () => {
  return (
    <>
      <Head>
        <title>Autorización OMA</title>
      </Head>
      <Layout>
        <Authorization />
      </Layout>
    </>
  );
};

export default OMAAuthorization;
