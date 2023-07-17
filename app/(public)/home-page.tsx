'use client'
import Faq from "../../components/FAQ/Faq";
import News from "../../components/News/News";
import Title from "../../components/Title/Title";
import styles from "./Home.module.scss";
import MainNandu from "../../public/images/mainNandu.svg";
import {NewsItemData} from "../../components/News/NewsTypes";
import DateBanner from "../../components/CalendarComponents/DateBanner/DateBanner";
import { CalendarEvent} from "../../components/CalendarComponents/CalendarTypes";
import HomeModal from "../../components/Popups/HomeModal";
import {useState } from "react";


interface HomeProps {
    news: NewsItemData[],
    events: CalendarEvent[]
}

const Home = ({news,events}: HomeProps) => {
  const [openModal,setOpenModal] = useState(false)
  return (
    <div className={styles.grid}>
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
          <DateBanner dates={events} displayAmount={1}/>
        </section>

        {/* FAQ */}
        <section className={styles.FAQSection}>
          <h3 className={styles.sectionTitle}>Preguntas Frecuentes</h3>
          <Faq />
        </section>
    </div>
  );
};
export default Home;