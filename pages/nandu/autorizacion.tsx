import { NextPage } from "next";
import Head from "next/head";
import { Authorization } from "../../components/Auth/Auth";
import Layout from "../../components/Layout/Layout";

const NanduAuthorization: NextPage = () => {
  return (
    <>
      <Head>
        <title>Autorización Ñandú</title>
      </Head>
      <Layout>
        <Authorization type="nandu" />
      </Layout>
    </>
  );
};

export default NanduAuthorization;
