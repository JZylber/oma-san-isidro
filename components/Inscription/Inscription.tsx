import { Button } from "../buttons/Button"
import styles from "./Inscription.module.scss"

export const Inscripcion = ( { type } : {type : string} ) => {
    return(
        <>
        <h1 className={styles.title}>Inscripción</h1>
        <div className={styles.container}>
           <div className={styles.first}>
            <h1>1. Abonar</h1>
            <div className={styles.payment}>
                <p>El pago por alumno este año es de: $3.000</p>
                <p>Se debe realizar por medio de un depósito en la cuenta de la Olimpíada.</p>
                <p>Se debe efectuar un solo depósito por la totalidad de alumnos inscriptos.</p>
                <p>*Los alumnos que abonen la inscripción presencialmente, en primera ronda, no deberán volver a abonar la inscripción a OMA.</p>
                <p>*La inscripción a la competencia de Mateclubes se hará en tercera ronda y el costo de la competencia es de $6.000 por club.</p>
            </div>
           </div>
           <div>
            <h1>2. Inscripción - Abierta hasta el 30/02</h1>
            <p>Los profesores a encargados de OMA deberán realizar la inscripción para el torneo intercolegial en el siguiente enlace.</p>
            <Button content="Descargar Planilla" />
           </div>
           <div>
          <h2>Enviar planilla y comprobante de pago a la responsable de su zona.</h2>
            <ul>
                <li>San Fernando, San Isidro y Vicente López: <a href="mailto:elena@oma.org.ar?subject=Planila%20de%20inscripcion%20colegio%3A">elena@oma.org.ar</a></li>
                <li>Tigre, Don Torcuato, M.Argentinas, San Miguel y José C.Paz: <a href="mailto:silviachillo@gmail.com?subject=Planila%20de%20inscripcion%20colegio%3A">silviachillo@gmail.com</a></li>
            </ul>   
           </div>
           <div>
            <h1>3. Presentar el comprobante original</h1>
            <p>El día del certamen se deberá presentar el comprobante original del depósito bancario para poder entregar el recibo correspndiente.</p>
            <p>Aquellos que precisen factura C deberán presentar los siguiente datos:</p>
            <ul>
                <li>CUIL/CUIT</li>
                <li>Condición frente al IVA, (dirección postal si tuvieran más de una)</li>
                <li>Email</li>
                <li>Concepto a facturar</li>
                <li>Importe de la trasnferencia</li>
            </ul>
           </div>
        </div>
        </>
    )
}
