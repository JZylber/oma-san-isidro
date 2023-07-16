'use client'
import styles from "./Contact.module.scss";
import Layout from "../../components/Layout/Layout";


const ContactPage = () => {
    return(
        <Layout>
            <h1 className={styles.title}>Contacto</h1>
            <div className={styles.inquiries}>
                <h3 className={styles.category_title}>Consultas por Zonas</h3>
                <div className={styles.zone}>
                    <h4>Vicente López</h4>
                    <ul>
                        <li className={styles.mail_text}>Gloria Sampablo: <a href="mailto:gloriasampablo@gmail.com">gloriasampablo@gmail.com</a></li>
                        <li className={styles.mail_text}>Alicia Lozano: <a href="mailto:alilo_ali@hotmail.com">alilo_ali@hotmail.com</a></li>
                    </ul>
                </div>
                <div className={styles.zone}>
                    <h4>San Isidro</h4>
                    <ul>
                        <li className={styles.mail_text}>Elena Guillé: <a href="mailto:elena@oma.org.ar">elena@oma.org.ar</a></li>
                    </ul>
                </div>
                <div className={styles.zone}>
                    <h4>San Fernando - Tigre - Don Torcuato</h4>
                    <ul>
                        <li className={styles.mail_text}>Silvia Chillo: <a href="mailto:silviachillo@gmail.com">silviachillo@gmail.com</a></li>
                    </ul>
                </div>
                <div className={styles.zone}>
                    <h4>José C.Paz - San Miguel - Malvinas Argentinas</h4>
                    <ul>
                        <li className={styles.mail_text}>Silvia Chillo: <a href="mailto:silviachillo@gmail.com">silviachillo@gmail.com</a></li>
                    </ul>
                </div>
            </div>
            <div className={styles.independent_category}>
                <h3 className={styles.category_title}>Mateclubes</h3>
                <p className={styles.mail_text}>Gloria Sampablo: <a href="mailto:gloriasampablo@gmail.com">gloriasampablo@gmail.com</a></p>
                <p className={styles.mail_text}>Silvia Chillo: <a href="mailto:silviachillo@gmail.com">silviachillo@gmail.com</a></p>
            </div>
            <div className={styles.independent_category}>
                <h3 className={styles.category_title}>Torneo de Geometría e Imaginación</h3>
                <p className={styles.mail_text}>Roxana Magistrali: <a href="mailto:roxana.magistrali@gmail.com">roxana.magistrali@gmail.com</a></p>
            </div>
            <div className={styles.independent_category}>
                <h3 className={styles.category_title}>Desarrolladores</h3>
                <p className={styles.mail_text}>Para consultas y feedback sobre la página: <a href="mailto:omasanisidro.devs@gmail.com">omasanisidro.devs@gmail.com</a></p>
            </div>
        </Layout>
        )
}

export default ContactPage