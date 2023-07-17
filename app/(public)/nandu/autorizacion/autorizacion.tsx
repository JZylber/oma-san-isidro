'use client';
import { Authorization } from "../../../../components/Auth/Auth";
import Layout from "../../../../components/Layout/Layout";

const NanduAuth = () => {
  return (
      <Layout>
        <Authorization type="nandu" />
      </Layout>
  );
};

export default NanduAuth;
