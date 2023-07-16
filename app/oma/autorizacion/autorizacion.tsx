'use client';
import { Authorization } from "../../../components/Auth/Auth";
import Layout from "../../../components/Layout/Layout";

const OMAAuth = () => {
  return (
      <Layout>
        <Authorization type="oma" />
      </Layout>
  );
};

export default OMAAuth;
