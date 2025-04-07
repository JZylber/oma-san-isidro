import { Button } from "../buttons/Button";
import Arrow from "../../public/images/newsArrow.svg";
import styles from "./Inscription.module.scss";
import BankInformation from "./BankInformation";
import Link from "next/link";
import Pending from "../Pending/pending";
import { DropPoint } from "../Instances/Venues";

export interface InscriptionData {
  fecha_inscripcion_nacional?: Date;
  fecha_inscripcion_regional?: Date;
  link_inscripcion?: string;
}

interface InscriptionProps {
  type: string;
  data: InscriptionData;
  authMaxDate?: Date;
  dropPoints?: Array<DropPoint>;
}

const monthNames = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

export const Inscripcion = ({
  type,
  data,
  authMaxDate,
  dropPoints,
}: InscriptionProps) => {
  const name = type === "OMA" ? "Oma" : "Ñandú";
  const availableData: boolean =
    data.fecha_inscripcion_nacional !== undefined ||
    data.fecha_inscripcion_regional !== undefined ||
    data.link_inscripcion !== undefined;
  const {
    fecha_inscripcion_nacional,
    fecha_inscripcion_regional,
    link_inscripcion,
  } = data;
  const downloadForm = () => {
    const link = document.createElement("a");
    link.href = `/files/planilla_datos_${type.toLowerCase()}.xlsx`;
    link.target = `_blank`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  if (!availableData) {
    return (
      <Pending text="Todavía no hay información para la inscripción de este año" />
    );
  } else {
    return (
      <>
        <div className={styles.type}>{name}</div>
        <h1 className={styles.title}>Inscripción</h1>
        <div className={styles.container}>
          <div className={styles.step_information}>
            <h1>1. Pago</h1>
            <p>
              El pago por alumno este año es de:{" "}
              <span className={styles.step_information_bold}>$20.000</span>.
            </p>
            <p>
              Se debe realizar un solo depósito por la totalidad de alumnos
              inscriptos en la cuenta de la Olimpíada.
            </p>
            <p>
              La inscripción incluye la participación al torneo de geometría y
              al torneo de literatura y matemática. El costo de inscripción para
              participar solamente de estos torneos es también de $20.000.
            </p>
            <BankInformation />
            <p>
              La inscripción a la competencia de Mateclubes es gratuita y se
              hace desde la página de OMA. Recién se paga en la tercera ronda
              (que es presencial) y el costo de la competencia es de $40.000 por
              club. No se exime de pago por haber participado en otro torneo.
            </p>
            <p>
              El día del certamen se deberá presentar el comprobante{" "}
              <span className={styles.step_information_bold}>original</span> del
              depósito bancario para poder entregar el recibo correspondiente.
            </p>
          </div>
          <div className={styles.step_information}>
            <h1>2. Inscripción</h1>
            <p>
              Los profesores encargados de {name} deben realizar la inscripción
              que consiste de 2 pasos.
            </p>
            <h2>
              Paso 1: hasta el{" "}
              {fecha_inscripcion_regional
                ? `${fecha_inscripcion_regional.getUTCDate()} de ${monthNames[
                    fecha_inscripcion_regional.getUTCMonth()
                  ].toLocaleLowerCase()}`
                : "(a determinar)"}
            </h2>
            <p>Completar la planilla de datos con los datos pedidos:</p>
            <div className={styles.button_container}>
              <Button content="Planilla de Datos" onClick={downloadForm}>
                <Arrow className={[styles.arrow, styles.download].join(" ")} />
              </Button>
            </div>
            <p>
              Enviar la planilla de datos y el comprobante de pago escaneado a
              la responsable de su zona.
            </p>
            <p>
              Aquellos que precisen factura electrónica deben completar el
              siguiente link:{" "}
              <a
                className="text-blue-700 cursor-pointer"
                href="https://forms.gle/zRK3sBoV6h62bmva6"
              >
                https://forms.gle/zRK3sBoV6h62bmva6
              </a>
              .{" "}
              <span className={styles.step_information_bold}>IMPORTANTE: </span>{" "}
              Como en el mismo deben cargar el archivo de pago, para abrirlo,
              necesitarán tener iniciada la sesión de Gmail, de lo contrario no
              podrán abrir el formulario para completarlo.
            </p>
            {/*<p>
              Aquellos que precisen factura C deberán también enviar los
              siguiente datos:
            </p>
            <div>
              <ul>
                <li>CUIL/CUIT</li>
                <li>
                  Condición frente al IVA y dirección postal si tuvieran más de
                  una.
                </li>
                <li>Email</li>
                <li>Concepto a facturar</li>
                <li>Importe de la transferencia</li>
              </ul>
            </div>*/}
            <div className={styles.contact_information}>
              <div className={styles.zone}>
                <h4>San Fernando, San Isidro y Vicente López</h4>
                <ul>
                  <li className={styles.mail_text}>
                    <a href="mailto:elena@oma.org.ar?subject=Planila%20de%20inscripcion%20colegio%3A">
                      elena@oma.org.ar
                    </a>
                  </li>
                </ul>
              </div>
              <div className={styles.zone}>
                <h4>
                  Tigre, Don Torcuato, M.Argentinas, San Miguel y José C.Paz
                </h4>
                <ul>
                  <li className={styles.mail_text}>
                    <a href="mailto:silviachillo@gmail.com?subject=Planila%20de%20inscripcion%20colegio%3A">
                      silviachillo@gmail.com
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <h2>
              Paso 2: hasta el{" "}
              {fecha_inscripcion_nacional
                ? `${fecha_inscripcion_nacional.getUTCDate()} de ${monthNames[
                    fecha_inscripcion_nacional.getUTCMonth()
                  ].toLocaleLowerCase()}`
                : "(a determinar)"}
            </h2>
            <p>
              <strong>
                Este paso solo se puede realizar habiendo completado el paso 1
              </strong>
            </p>
            <p>
              Al completar el paso 1, se les enviará un link en donde deben
              ingresar los datos de todos los participates.
            </p>
            {/*<p>Ingresar los datos de los participantes en el siguiente link:</p>
            <div className={styles.button_container}>
              <Button
                content={
                  link_inscripcion ? "Link de Inscripción" : "(No Disponible)"
                }
                onClick={() => {
                  link_inscripcion
                    ? (window.location.href = link_inscripcion)
                    : null;
                }}
              >
                <>{link_inscripcion && <Arrow className={styles.arrow} />}</>
              </Button>
            </div>*/}
          </div>
          <div className={styles.step_information}>
            <h1>
              3. Autorizaciones: hasta el{" "}
              {authMaxDate
                ? `${authMaxDate.getUTCDate()} de ${monthNames[
                    authMaxDate.getUTCMonth()
                  ].toLocaleLowerCase()}`
                : "(a determinar)"}
            </h1>

            <p>
              <span className={styles.step_information_bold}>
                Este año, las autorizaciones se entregan una única vez antes de
                la primera instancia. Las autorizaciones se encuentran{" "}
                <Link
                  href={
                    type === "OMA" ? "/oma/autorizacion" : "/nandu/autorizacion"
                  }
                >
                  acá
                </Link>
                .
              </span>
            </p>
            <p>
              Las autorizaciones deben estar{" "}
              <span className={styles.step_information_bold}>completas</span>{" "}
              con las{" "}
              <span className={styles.step_information_bold}>
                firmas y sellos correspondientes
              </span>
              . Estas se pueden entregar hasta el{" "}
              <span className={styles.step_information_bold}>
                {authMaxDate
                  ? `${authMaxDate.getUTCDate()}/${
                      authMaxDate.getUTCMonth() + 1
                    }`
                  : "(A definir)"}
              </span>{" "}
              en los siguientes puntos:
            </p>
            <ul className={styles.dropPoints}>
              {dropPoints &&
                dropPoints.map((dropPoint, index) => {
                  const { localidad, nombre, direccion, aclaracion } =
                    dropPoint;
                  return (
                    <li className={styles.text} key={index}>
                      <span className={styles.step_information_bold}>
                        {localidad}:{" "}
                      </span>
                      {nombre ? `${nombre} - ` : ""}
                      {direccion}
                      {aclaracion ? ` (${aclaracion})` : ""}
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      </>
    );
  }
};
