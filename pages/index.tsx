import Head from "next/head";
import type { NextPage } from "next";
import Faq from "../components/FAQ/Faq";
import News from "../components/News/News";
import Title from "../components/Title/Title";
import styles from "./styles/Home.module.scss";
import MainNandu from "../public/images/mainNandu.svg";
import Layout from "../components/Layout/Layout";
import {NewsItemData} from "../components/News/NewsTypes";
import { getCalendarEvents, getNews } from "../lib/aux_db_calls";
import DateBanner from "../components/CalendarComponents/DateBanner/DateBanner";
import { getDatesFromJson, JSONCalendarEvent } from "../components/CalendarComponents/CalendarTypes";
import HomeModal from "../components/Popups/HomeModal";
import { useEffect, useState } from "react";

export async function getStaticProps() {
  const news = await getNews();
  const env = process.env.NODE_ENV;
  const vercel_env = process.env.VERCEL_ENV;
  if(env === "production" && (vercel_env?vercel_env === "production":true)){
    news.results = news.results.filter((item:NewsItemData) => item.visible)
  }
  const events = await getCalendarEvents(new Date().getFullYear())
  let newProps = {news : news.results,events: JSON.parse(JSON.stringify(events.results))}
  return {
    props: newProps
  }
}

const Home: NextPage<{news: NewsItemData[], events: JSONCalendarEvent[]}> = ({news,events}) => {
  const dates = getDatesFromJson(events)
  const [openModal,setOpenModal] = useState(false)

  /*useEffect(() => {
    let pop_status = sessionStorage.getItem('pop_status');
    if(!pop_status){
      setOpenModal(true);
      sessionStorage.setItem('pop_status','true');
    }
  }, []);*/

  return (
    <>
      <Head>
        <title>OMA San Isidro</title>
        <meta   name="description"
                content="Página principal de la Secretaría Regional Buenos Aires Norte de la Olimpíadas Matemáticas Argentinas"></meta>
      </Head>
      <Layout grid={true}>
        <HomeModal open={openModal} setOpen={setOpenModal}/>
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

        {/* Next Events */}
        <section className={styles.eventSection}>
          <h3 className={styles.sectionTitle}>Próxima fecha</h3>
          <DateBanner dates={dates} displayAmount={1}/>
        </section>

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
