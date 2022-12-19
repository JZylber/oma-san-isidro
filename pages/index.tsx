import Head from 'next/head'
import Faq from '../components/Faq';
import NavBar from '../components/Navbar';
import News from '../components/News';
import styles from './styles/Home.module.css'

export default function Home() {
  return (
    <>
    <Head>
        <title>OMA San Isidro</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
    </Head>
    <NavBar></NavBar>
    <main className={styles.wrapper}>
    <div className={styles.title}>
      <h1>OMA</h1>
      <h2>San Isidro</h2>
      <p>Secretaría regional buenos aires norte</p>
    </div>
    <section className={styles.section}>
      <h3>Novedades</h3>
      <News></News>
    </section>
    <section className={styles.section}>
      <h3> FAQ </h3>
      <Faq></Faq>
    </section>
    </main>
    <footer>

    </footer>
    </>
  )
}
