'use client'
import {CalendarEvent} from "../../../../components/CalendarComponents/CalendarTypes";
import styles from "./Mateclubes.module.scss";
import AllDatesBanner from "../../../../components/CalendarComponents/DateBanner/NextDatesBanner";
import { Button } from "../../../../components/buttons/Button";
import Image from "next/image";

interface MateclubesProps {
    events : Array<CalendarEvent>,
}

const MathClubs = ({events}:MateclubesProps) => {
    const downloadForm = (filename:string) => {
        const downloadFunction = () => {
        const link = document.createElement("a");
        link.href = `/files/${filename}`;
        link.target = `_blank`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);}
        return downloadFunction;
      };
    return(
        <>
            <h1 className={styles.title}>Mateclubes</h1>
            <AllDatesBanner dates={events} category="Mateclubes"/>
            {/*<section className={styles.section}>
                <h2 className={styles.section_title}>Mateclubes 3era Ronda</h2>
                <p className={styles.text}>Para la competencia necesitamos:</p>
                <ul className={styles.dropPoints}>
                    <li className={styles.text}><span className={styles.bold}>AUTORIZACIÓN:</span> (puede ser la de OMA o Ñandú ) que se bajan de esta página. Por favor verifiquen que esté <span className={styles.bold}>COMPLETA</span>, que no falten sellos ni firmas, caso contrario <span className={styles.bold}>NO PUEDEN RENDIR</span></li>
                    <li className={styles.text}><span className={styles.bold}>COMPROBANTE ORIGINAL</span> de depósito o transferencia</li>
                </ul>
                <p className={styles.text}>Si lo desean pueden llevar algo para merienda</p>
                <p className={styles.text}>La prueba dura 2 horas, comienza a las 14, por favor presentarse media hora antes del inicio</p>
                <h3 className={styles.section_subtitle}>Sedes</h3>
                <p className={styles.text}>A continuación pueden descargar las planillas con la distribución de colegios por sede:</p>
                <div className={styles.buttons}>
                <div className={styles.button_container}>
                    <Button content="Sedes San Isidro" onClick={downloadForm("SEDES MATECLUBES REGIÓN SAN ISIDRO 2023.xlsx")}><Image className={styles.arrow} width={30} height={30} src='/images/newsArrow.svg' alt="Ícono de descarga"/></Button>
                </div>
                <div className={styles.button_container}>
                    <Button content="Sedes Tigre" onClick={downloadForm("SEDES MATECLUBES EN TIGRE.xlsx")}><Image className={styles.arrow} width={30} height={30} src='/images/newsArrow.svg' alt="Ícono de descarga"/></Button>
                </div>
                </div>
            </section>
            <section className={styles.section}>
                <p className={styles.text}>Para más información mandar un mail a Gloria Sampablo: <a href="mailto:gloriasampablo@gmail.com">gloriasampablo@gmail.com</a></p>
            </section>*/}
        </>
    )
}

export default MathClubs