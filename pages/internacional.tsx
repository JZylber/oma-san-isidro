import { NextPage } from "next";
import Head from "next/head";
import Layout from "../components/Layout/Layout";
import styles from "./styles/International.module.scss";

const Internacional : NextPage = () => {
    return(
        <>
        <Head>
            <title>Olimpíadas Internacionales</title>
        </Head>
        <Layout>
            <h1 className={styles.title}>Internacional</h1>
            <p className={styles.description}> Alumnos que pueden participar en las selecciones para olimpíadas internacionales 2023</p>
            <div className={[styles.rounded_box,styles.middle_columns].join(" ")}>
                <h3>Pretorneo de las Ciudades</h3>
                <p>Participan los alumnos de OMA que en el 2022 llegaron por lo menos al Regional y los alumnos de  3° Nivel de Ñandú invitados por la OMA</p>
            </div>
            <div className={styles.category}>
                <h2 className={styles.category_title}>Alumnos que participaron en OMA en 2022</h2>
                <ul>
                     <li className={styles.tournament}>
                         <h3 className={styles.tournament_name}>Selección Cono Sur</h3>
                         <p className={styles.tournament_requirements}>Haber llegado a la instancia Nacional de OMA y haber nacido después del 01/01/2007.</p>
                    </li>
                    <li className={styles.tournament}>
                         <h3 className={styles.tournament_name}>Olimpíada de Mayo</h3>
                         <p className={styles.tournament_requirements}>Haber aprobado la instancia Regional de OMA y haber nacido después del 01/01/2008.</p>
                    </li>
                    <li className={styles.tournament}>
                         <h3 className={styles.tournament_name}>Selección IMO</h3>
                         <p className={styles.tournament_requirements}>Haber aprobado la instancia Nacional de OMA, haber nacido después del 01/01/2003 y ser alumno regular de enseñanza media en el 2023.</p>
                    </li>
                </ul>
            </div>
            <div className={styles.category}>
                <h2 className={styles.category_title}>Alumnos que participaron en Ñandú en 2022</h2>
            </div>
        </Layout>
        </>
        )
}

export default Internacional