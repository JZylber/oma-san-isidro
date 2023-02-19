import Head from "next/head";
import type { NextPage } from "next";
import Faq from "../components/FAQ/Faq";
import News from "../components/News/News";
import Title from "../components/Title/Title";
import styles from "./styles/Home.module.scss";
import MainNandu from "../img/mainNandu.svg";
import Layout from "../components/Layout/Layout";
import path from "path";
import fsPromises from 'fs/promises';
import {NewsItemData} from "../components/News/NewsTypes";
import { getNews } from "../lib/aux_db_calls";

export async function getStaticProps() {
  const news = await getNews()
  let newProps = {news : news.results}
  return {
    props: newProps
  }
}

const Home: NextPage<{news: NewsItemData[]}> = ({news}) => {
  return (
    <>
      <Head>
        <title>OMA San Isidro</title>
      </Head>
      <Layout>
        <Title />

        {/* NEWS */}
        <section className={styles.newsSection}>
          <h3 className={styles.sectionTitle}>Novedades</h3>
          <News newsData={news}/>
        </section>

        {/* IMAGE */}
        <div className={styles.containerImg}>
          <MainNandu className={styles.mainImage} />
        </div>

        {/* FAQ */}
        <section className={styles.FAQSection}>
          <h3 className={styles.sectionTitle}>Preguntas Frecuentes</h3>
          <Faq />
        </section>
      </Layout>
    </>
  );
};
export default Home;
