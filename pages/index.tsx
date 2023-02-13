import Head from 'next/head'
import type { NextPage } from "next";
import Faq from '../components/FAQ/Faq';
import NavBar from '../components/NavBar/Navbar';
import News from '../components/News/News';
import Title from '../components/Title/Title';
import styles from './styles/Home.module.scss'
import MainNandu from '../img/mainNandu.svg'
import Footer from '../components/Footer/Footer';
import { useState } from 'react';
import Layout from '../components/Layout/Layout';

const Home: NextPage = () => {
  let [showContent,setshowContent] = useState(true);

  const togglePageContent = () => {
    setshowContent(!showContent);
  }

  return (
    <>
    <Head>
        <title>OMA San Isidro</title>
    </Head>
    <Layout>
      <Title/>

      {/* NEWS */}
      <section className={styles.newsSection}>
        <h3 className={styles.sectionTitle}>Novedades</h3>
        <News/>
      </section>

      {/* IMAGE */}
      <div className={styles.containerImg}>
        <MainNandu className={styles.mainImage}/>
      </div>

      {/* FAQ */}
      <section className={styles.FAQSection}>
        <h3 className={styles.sectionTitle}>Preguntas Frecuentes</h3>
        <Faq/>
      </section>

      {/* FOOTER */}
      <Footer/>
    </Layout>
    </>
  )
}
export default Home;