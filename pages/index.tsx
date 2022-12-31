import Head from 'next/head'
import type { NextPage } from "next";
import Faq from '../components/FAQ/Faq';
import NavBar from '../components/NavBar/Navbar';
import News from '../components/News/News';
import Title from '../components/Title/Title';
import styles from './styles/Home.module.scss'
import MainNandu from '../img/mainÑandu.svg'
import Footer from '../components/Footer/Footer';
import { useState } from 'react';

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
    <div className={styles.pageLayout}>
    <NavBar togglePageContent={togglePageContent}/>
    {showContent && 
    <main className={styles.main}>
    <Title/>
    <section className={styles.newsSection}>
      <h3 className={styles.sectionTitle}>Novedades</h3>
      <News/>
    </section>
    <MainNandu className={styles.mainImage}/>
    <section className={styles.FAQSection}>
      <h3 className={styles.sectionTitle}>Preguntas Frecuentes</h3>
      <Faq/>
    </section>
    <Footer></Footer>
    </main>
    }
    </div>
    </>
  )
}
export default Home;