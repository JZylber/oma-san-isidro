import Head from 'next/head'
import Faq from '../components/Faq';
import NavBar from '../components/Navbar';
import News from '../components/News';
import Title from '../components/Title';
import styles from './styles/Home.module.css'

export default function Home() {
  return (
    <>
    <Head>
        <title>OMA San Isidro</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com"/>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat&family=Unbounded&display=swap" rel="stylesheet"/> 
    </Head>
    <NavBar></NavBar>
    <main className={styles.wrapper}>
    <Title></Title>
    <section className={styles.section}>
      <h3>Novedades</h3>
      <News></News>
    </section>
    <section className={styles.section}>
      <h3> Preguntas Frecuentes </h3>
      <Faq></Faq>
    </section>
    </main>
    <footer>

    </footer>
    </>
  )
}
