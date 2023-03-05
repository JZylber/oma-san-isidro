import Head from "next/head";
import type { NextPage } from "next";
import Faq from "../components/FAQ/Faq";
import News from "../components/News/News";
import Title from "../components/Title/Title";
import styles from "./styles/Home.module.scss";
import MainNandu from "../img/mainNandu.svg";
import Layout from "../components/Layout/Layout";
import {NewsItemData} from "../components/News/NewsTypes";
import { getCalendarEvents, getNews } from "../lib/aux_db_calls";
import DateBanner from "../components/CalendarComponents/DateBanner/DateBanner";
import { getDatesFromJson, JSONCalendarEvent } from "../components/CalendarComponents/CalendarTypes";

export async function getStaticProps() {
  const news = await getNews()
  const events = await getCalendarEvents(new Date().getFullYear())
  let newProps = {news : news.results,events: JSON.parse(JSON.stringify(events.results))}
  return {
    props: newProps
  }
}

const Home: NextPage<{news: NewsItemData[], events: JSONCalendarEvent[]}> = ({news,events}) => {
  const dates = getDatesFromJson(events)
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

        {/* Next Events */}
        <section className={styles.eventSection}>
          <h3 className={styles.sectionTitle}>Próximas fechas</h3>
          <DateBanner dates={dates}/>
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
