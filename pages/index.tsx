import Head from 'next/head'
import NavBar from '../components/navbar';
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <>
    <Head>
        <title>OMA San Isidro</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
    </Head>
    <NavBar></NavBar>
    <main>
      <h1>OMA</h1>
      <h2>San Isidro</h2>
      <p>Secretaría regional buenos aires norte</p>
    </main>
    <footer>

    </footer>
    </>
  )
}
