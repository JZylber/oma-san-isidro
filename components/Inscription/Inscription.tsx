import { Button } from "../buttons/Button"
import Arrow from "../../public/images/newsArrow.svg"
import styles from "./Inscription.module.scss"
import BankInformation from "./BankInformation"

export const Inscripcion = ( { type } : {type : string} ) => {
    const downloadForm = () => {
        const link = document.createElement("a");
        link.href = `/files/planilla_datos_${type.toLowerCase()}.xls`;
        link.target = `_blank`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };
    return(
        <>
        <div className={styles.type}>{type == "OMA"?"Oma":"Ñandú"}</div>
        <h1 className={styles.title}>Inscripción</h1>
        <div className={styles.container}>
            <div className={styles.step_information}>
                <h1>1. Pago</h1>
                <p>El pago por alumno este año es de: <span className={styles.step_information_bold}>$3.000</span>.</p>
                <p>Se debe realizar un solo depósito por la totalidad de alumnos inscriptos en la cuenta de la Olimpíada.</p>
                <p>La inscripción incluye la participación al torneo de geometría. Como este ocurre primero, aquellos alumnos que participen en el torneo de geometría <span className={styles.step_information_bold}>no deben abonar la inscripción a {type}</span>. El costo de inscripción para participar del torneo de geometría solamente es también de $3000.</p>
                <BankInformation/>
                <p>La inscripción a la competencia de Mateclubes es gratuita y se hace desde la página de OMA. Recién se paga en la tercera ronda (que es presencial) y el costo de la competencia es de $6.000 por club. No se exime de pago por haber participado en otro torneo.</p>
           </div>
           <div className={styles.step_information}>
            <h1>2. Inscripción</h1>
            <ol className={styles.step_information_substeps}>
                <li>Los profesores encargados de OMA deberán realizar la inscripción para la instancia intercolegial en el siguiente enlace:</li>
                <div className={styles.button_container}>
                    <Button content={type == "OMA"?"(Todavía no disponible)":"Link de Inscripción"} onClick={() => type == "OMA"?null:window.location.href = "https://oma.org.ar/virtual/inscripcion.php?competencia=OMN&region=53&hash=02609c0a&ano=2023"}>
                        <>
                            {type !== "OMA" && <Arrow className={styles.arrow}/>}
                        </>
                    </Button>
                </div>
                <li>Luego, deben completar la planilla de datos con los datos pedidos</li>
                <div className={styles.button_container}>
                    <Button content="Planilla de Datos" onClick={downloadForm}><Arrow className={[styles.arrow,styles.download].join(" ")}/></Button>
                </div>
                <li>Enviar la planilla de datos y el comprobante de pago escaneado a la responsable de su zona<span className={styles.step_information_bold}> hasta el {type == "OMA"?"5 de mayo":"21 de abril"}</span>.</li>
                <p>Aquellos que precisen factura C deberán también enviar los siguiente datos:</p>
                <div>
                    <ul>
                        <li>CUIL/CUIT</li>
                        <li>Condición frente al IVA y dirección postal si tuvieran más de una.</li>
                        <li>Email</li>
                        <li>Concepto a facturar</li>
                        <li>Importe de la transferencia</li>
                    </ul>
                </div>
                <div className={styles.contact_information}>
                    <div className={styles.zone}>
                        <h4>San Fernando, San Isidro y Vicente López</h4>
                        <ul>
                            <li className={styles.mail_text}><a href="mailto:elena@oma.org.ar?subject=Planila%20de%20inscripcion%20colegio%3A">elena@oma.org.ar</a></li>
                        </ul>
                    </div>
                    <div className={styles.zone}>
                        <h4>Tigre, Don Torcuato, M.Argentinas, San Miguel y José C.Paz</h4>
                        <ul>
                            <li className={styles.mail_text}><a href="mailto:silviachillo@gmail.com?subject=Planila%20de%20inscripcion%20colegio%3A">silviachillo@gmail.com</a></li>
                        </ul>
                    </div>
                </div>
            </ol>
           </div>
           <div className={styles.step_information}>
            <h1>3. Documentos a presentar en el certamen Intercolegial</h1>
            <p>El día del certamen se deberá presentar el comprobante <span className={styles.step_information_bold}>original</span> del depósito bancario para poder entregar el recibo correspondiente.</p>
           </div>
        </div>
        </>
    )
}
