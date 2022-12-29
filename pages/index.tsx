import Head from 'next/head'
import type { NextPage } from "next";
import Faq from '../components/FAQ/Faq';
import NavBar from '../components/NavBar/Navbar';
import News from '../components/News/News';
import Title from '../components/Title/Title';
import styles from './styles/Home.module.scss'
import MainNandu from '../img/mainÑandu.svg'

const Home: NextPage = () => {
  return (
    <>
    <Head>
        <title>OMA San Isidro</title>
    </Head>
    <NavBar/>
    <main>
    <div className={styles.topSection}>
      <div className={styles.titleNews}>
        <Title/>
        <section>
          <h3 className={styles.sectionTitle}>Novedades</h3>
          <News/>
        </section>
      </div>
      <MainNandu className={styles.mainImage}/>
    </div>
    <section className={styles.section}>
      <h3 className={styles.sectionTitle}>Preguntas Frecuentes</h3>
      <Faq/>
    </section>
    </main>
    <footer>

    </footer>
    </>
  )
}
export default Home;