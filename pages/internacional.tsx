import { NextPage } from "next";
import Head from "next/head";
import Layout from "../components/Layout/Layout";
import styles from "./styles/International.module.scss";
import dataOMA from "../data/internacionalOMA.json"
import dataNandu from "../data/internacionalNandu.json"

const orderBySurname = (a: Array<string | boolean>, b: Array<string | boolean>) => {
    let a1 = a[1] as string;
    let b1 = b[1] as string;
    return a1.localeCompare(b1);
};

const Internacional : NextPage = () => {
    let sortedDataOma = dataOMA;
    sortedDataOma.sort(orderBySurname);
    let sortedDataNandu = dataNandu;
    sortedDataNandu.sort(orderBySurname);
    const renderOMAparticipant = (omaParticipant : Array<string | boolean>,idx:number) => {
        const [level,surname,name,t1,t2,t3,t4] = omaParticipant;
        return(
            <tr key={idx}>
                <td className={styles.right_align}>{level}</td>
                <td className={styles.sticky_column}>{surname}</td>
                <td>{name}</td>
                <td>{t1?"Si":""}</td>
                <td>{t2?"Si":""}</td>
                <td>{t3?"Si":""}</td>
                <td>{t4?"Si":""}</td>
            </tr>)
    }
    const renderNanduparticipant = (omaParticipant : Array<string | boolean>,idx:number) => {
        const [level,surname,name] = omaParticipant;
        return(
            <tr key={idx}>
                <td className={styles.right_align}>{level}</td>
                <td>{surname}</td>
                <td>{name}</td>
            </tr>)
    }


    return(
        <>
        <Head>
            <title>Olimpíadas Internacionales</title>
        </Head>
        <Layout>
            <h1 className={styles.title}>Internacional</h1>
            <p className={[styles.description,styles.description_text].join(" ")}> Alumnos que pueden participar en las selecciones para olimpíadas internacionales 2023</p>
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
                    <li className={styles.tournament}>
                         <h3 className={styles.tournament_name}>Selección Iberoamericana</h3>
                         <p className={styles.tournament_requirements}>Haber aprobado la instancia Nacional de OMA, haber nacido después del 01/01/2005 y no haber participado en dos Olimpíadas Iberoamericanas anteriores.</p>
                    </li>
                    <li className={styles.tournament}>
                         <h3 className={styles.tournament_name}>Olimpíada Iraní de Geometría</h3>
                         <p className={styles.tournament_requirements}>Alumnos de OMA y Ñandú seleccionados por el Comité Olímpico.</p>
                    </li>
                    <li className={styles.tournament}>
                         <h3 className={styles.tournament_name}>Olimpíada Iraní de Combinatoria</h3>
                         <p className={styles.tournament_requirements}>Alumnos de OMA y Ñandú seleccionados por el Comité Olímpico.</p>
                    </li>
                    <li className={styles.tournament}>
                         <h3 className={styles.tournament_name}>Olimpíada Panamericana Femenil de Matemática</h3>
                         <p className={styles.tournament_requirements}>Alumnas de OMA seleccionadas por el Comité Olímpico.</p>
                    </li>
                    <li className={styles.tournament}>
                         <h3 className={styles.tournament_name}>OlimPri</h3>
                         <p className={styles.tournament_requirements}>Campeones y subcampeones de 1° y 2° Nivel de Ñandú 2022.</p>
                    </li>
                </ul>
                <div className={styles.table_container}>
                    <table className={styles.table}>
                        <thead className={styles.table_header}>
                            <tr>
                                <th className={styles.table_column_level}>Nivel</th>
                                <th className={[styles.table_column_name,styles.sticky_column].join(" ")}>Apellido</th>
                                <th className={styles.table_column_name}>Nombre</th>
                                <th className={styles.table_column_tournament}>Mayo</th>
                                <th className={styles.table_column_tournament}>Cono Sur</th>
                                <th className={styles.table_column_tournament}>IMO</th>
                                <th className={styles.table_column_tournament}>Ibero</th>
                            </tr>
                        </thead>
                        <tbody className={styles.table_body}>
                            {sortedDataOma.map(renderOMAparticipant)}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className={styles.category}>
                <h2 className={styles.category_title}>Alumnos que participaron en Ñandú en 2022</h2>
                <p className={styles.description_text}>Pueden Participar en la Olimpíada de Mayo aquellos alumnos que aprobaron el Regional y nacieron después del 01/01/2008</p>
                <div className={styles.table_container}>
                    <table className={[styles.table,styles.middle_columns].join(" ")}>
                        <thead className={styles.table_header}>
                            <tr>
                                <th>Nivel</th>
                                <th>Apellido</th>
                                <th>Nombre</th>
                            </tr>
                        </thead>
                        <tbody className={styles.table_body}>
                            {sortedDataNandu.map(renderNanduparticipant)}
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
        </>
        )
}

export default Internacional