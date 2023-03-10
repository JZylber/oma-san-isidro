import { NextPage } from "next";
import Head from "next/head";
import Layout from "../components/Layout/Layout";
import styles from "./styles/Contact.module.scss";


const Contact : NextPage = () => {
    return(
        <>
        <Head>
            <title>Contacto</title>
        </Head>
        <Layout>
            <h1 className={styles.title}>Contacto</h1>
            <div className={styles.inquiries}>
                <h3 className={styles.category_title}>Consultas por Zonas</h3>
                <div className={styles.zone}>
                    <h4>Vicente López</h4>
                    <ul>
                        <li className={styles.mail_text}>Gloria Sampablo: gloriasampablo@gmail.com</li>
                        <li className={styles.mail_text}>Alicia Lozano: alilo_ali@hotmail.com</li>
                    </ul>
                </div>
                <div className={styles.zone}>
                    <h4>San Isidro</h4>
                    <ul>
                        <li className={styles.mail_text}>Elena Guillé: elena@oma.org.ar</li>
                    </ul>
                </div>
                <div className={styles.zone}>
                    <h4>San Fernando - Tigre - Don Torcuato</h4>
                    <ul>
                        <li className={styles.mail_text}>Silvia Chillo: silviachillo@gmail.com</li>
                    </ul>
                </div>
                <div className={styles.zone}>
                    <h4>José C.Paz - San Miguel - Malvinas Argentinas</h4>
                    <ul>
                        <li className={styles.mail_text}>Silvia Chillo: silviachillo@gmail.com</li>
                    </ul>
                </div>
            </div>
            <div className={styles.independent_category}>
                <h3 className={styles.category_title}>Mateclubes</h3>
                <p className={styles.mail_text}>Gloria Sampablo: gloriasampablo@gmail.com</p>
            </div>
            <div className={styles.independent_category}>
                <h3 className={styles.category_title}>Desarrolladores</h3>
                <p className={styles.mail_text}>Para consultas y feedback sobre la página: omasanisidro.devs@gmail.com</p>
            </div>
        </Layout>
        </>
        )
}

export default Contact