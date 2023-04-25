import {NextPage } from "next";
import Head from "next/head";
import Layout from "../../components/Layout/Layout";
import styles from "./Canguro.module.scss";
import { Button } from "../../components/buttons/Button";
import Image from "next/image";

interface Category{
    categoria: string;
    link: string;
}

const categories : Category [] = [
    {categoria: "Pequeños",link: "/files/canguro/Pequeños 2023.pdf"},
    {categoria: "Escolar",link: "/files/canguro/Escolar 2023.pdf"},
    {categoria: "Benjamín",link: "/files/canguro/Benjamín 2023.pdf"},
    {categoria: "Cadete",link: "/files/canguro/Cadete 2023.pdf"},
    {categoria: "Juvenil",link: "/files/canguro/Juvenil 2023.pdf"},
]

const Kangaroo : NextPage = () => {
    return(
        <>
        <Head>
            <title>Canguro</title>
            <meta   name="description"
                content="Información general de canguro matemático"></meta>
        </Head>
        <Layout>
            <h1 className={styles.title}>Canguro Matemático</h1>
            <div className={styles.button_container}>
                <Button content="Resultados" onClick={() => window.location.href = "https://www.oma.org.ar/canguro/editar.html"}>
                    <Image src="/images/newsArrow.svg" alt="" width={30} height={30} />
                </Button>
                <p>Si no recuerda el id puede buscarlo <a href="https://www.oma.org.ar/canguro/buscador.html">https://www.oma.org.ar/canguro/buscador.html</a> poniendo parte del nombre del colegio.</p>
            </div>
            <p className={styles.main_text}>El nombre del alumno que aparece en la pantalla es el que será usado para los diplomas de las medallas. Por favor chequear el nombre del alumno y en caso de ser necesario, corregirlo antes del 11 de mayo.</p>
            <section className={styles.problems}>
                    <h2 className={styles.title}>Problemas</h2>
                    <div className={styles.links}>
                        {categories.map((category,i) => {
                            return(<a href={category.link} key={i} className={styles.link}>{category.categoria}</a>)})}
                    </div>
            </section>
            <section className={styles.problems}>
                    <h2 className={styles.title}>Resultados</h2>
                    <div className={styles.links}>
                        <a href="/files/canguro/Respuestas Canguro 2023.docx"  className={styles.link}>Todas las categorías</a>
                    </div>
            </section>
        </Layout>        
        </>)
}

export default Kangaroo