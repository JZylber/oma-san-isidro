import { Button } from "../buttons/Button";
import Image from "next/image";
import BankInformation from "./BankInformation";
import Link from "next/link";
import Pending from "../Pending/Pending";
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

const typeClasses = "block font-unbounded font-normal text-[2.1rem] tablet:hidden";
const titleClasses = "font-unbounded font-semibold max-tablet:text-[3.6rem] max-tablet:[margin-top:5vmin] max-tablet:[margin-bottom:5vmin] tablet:text-[4.8rem] tablet:mb-[3.2rem]";
const containerClasses = "flex flex-col";
const stepInfoClasses = "mt-[2rem] [&_h1]:font-unbounded [&_h1]:font-medium [&_h1]:max-tablet:text-[2.4rem] [&_h1]:max-tablet:w-full [&_h1]:max-tablet:mb-[16px] [&_h1]:tablet:self-center [&_h1]:tablet:text-[3.2rem] [&_h2]:font-unbounded [&_h2]:font-medium [&_h2]:underline [&_h2]:mt-[1.6rem] [&_h2]:max-tablet:text-[2rem] [&_h2]:max-tablet:w-full [&_h2]:max-tablet:mb-[16px] [&_h2]:tablet:self-center [&_h2]:tablet:text-[2.8rem] [&_p]:font-montserrat [&_p]:font-light [&_p]:mt-[1.6rem] [&_p]:max-tablet:text-[1.4rem] [&_p]:tablet:max-desktop:text-tablet-reading [&_p]:desktop:text-[1.7rem] [&_li]:font-montserrat [&_li]:font-light [&_li]:max-tablet:text-[1.4rem] [&_li]:tablet:max-desktop:text-tablet-reading [&_li]:desktop:text-[1.7rem] [&_li+li]:mt-[1.6rem]";
const stepInfoBoldClasses = "font-montserrat font-semibold";
const buttonContainerClasses = "max-tablet:w-full max-tablet:text-center tablet:max-desktop:w-[63.5%] tablet:max-desktop:mt-[calc(200vmin/104.25)] desktop:w-[47.5%] desktop:mt-[calc(400vmin/128)]";
const contactInfoClasses = "box-border border-2 border-primary-black rounded-[9px] mt-[3.2rem] mb-[3.2rem] max-tablet:px-[16px] tablet:px-[3.2rem]";
const zoneClasses = "flex w-full mt-[3.2rem] mb-[3.2rem] max-tablet:flex-col max-tablet:items-center";
const arrowClasses = "hidden desktop:block desktop:w-[30px]";
const downloadClasses = "rotate-90";
const dropPointsClasses = "list-none";

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
        <div className={typeClasses}>{name}</div>
        <h1 className={titleClasses}>Inscripción</h1>
        <div className={containerClasses}>
          <div className={stepInfoClasses}>
            <h1>1. Pago</h1>
            <p>
              El pago por alumno este año es de:{" "}
              <span className={stepInfoBoldClasses}>$26.000</span>.
            </p>
            <p>
              Se debe realizar un solo depósito por la totalidad de alumnos
              inscriptos en la cuenta de la Olimpíada.
            </p>
            <p>
              La inscripción incluye la participación al torneo de geometría y
              al torneo de literatura y matemática. El costo de inscripción para
              participar solamente de estos torneos es también de $26.000.
            </p>
            <BankInformation />
            <p>
              La inscripción a la competencia de Mateclubes es gratuita y se
              hace desde la página de OMA. Recién se paga en la tercera ronda
              (que es presencial) y el costo de la competencia es de $52000 por
              club. No se exime de pago por haber participado en otro torneo.
            </p>
            <p>
              El día del certamen se deberá presentar el comprobante{" "}
              <span className={stepInfoBoldClasses}>original</span> del
              depósito bancario para poder entregar el recibo correspondiente.
            </p>
          </div>
          <div className={stepInfoClasses}>
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
            <div className={buttonContainerClasses}>
              <Button content="Planilla de Datos" onClick={downloadForm}>
                <Image src="/images/newsArrow.svg" width={34} height={32} alt="" className={`${arrowClasses} ${downloadClasses}`} />
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
                href="https://forms.gle/BQKZaVRuMUU7DG3w8"
              >
                https://forms.gle/BQKZaVRuMUU7DG3w8
              </a>
              <span className={stepInfoBoldClasses}>IMPORTANTE: </span>{" "}
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
            <div className={contactInfoClasses}>
              <div className={zoneClasses}>
                <h4 className="font-montserrat font-semibold max-tablet:text-[1.4rem] max-tablet:mb-[1.6rem] tablet:w-[70%] tablet:text-desktop-reading">San Fernando, San Isidro y Vicente López</h4>
                <ul className="list-none tablet:w-[30%]">
                  <li className="max-tablet:mb-[.8rem]">
                    <a href="mailto:elenaguille2014@gmail.com?subject=Planila%20de%20inscripcion%20colegio%3A">
                      elenaguille2014@gmail.com
                    </a>
                  </li>
                </ul>
              </div>
              <div className={zoneClasses}>
                <h4 className="font-montserrat font-semibold max-tablet:text-[1.4rem] max-tablet:mb-[1.6rem] tablet:w-[70%] tablet:text-desktop-reading">
                  Tigre, Don Torcuato, M.Argentinas, San Miguel y José C.Paz
                </h4>
                <ul className="list-none tablet:w-[30%]">
                  <li className="max-tablet:mb-[.8rem]">
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
            <p>Ingresar los datos de los participantes en el siguiente link:</p>
            <div className={buttonContainerClasses}>
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
                <>{link_inscripcion && <Image src="/images/newsArrow.svg" width={34} height={32} alt="" className={arrowClasses} />}</>
              </Button>
            </div>
          </div>
          <div className={stepInfoClasses}>
            <h1>
              3. Autorizaciones: hasta el{" "}
              {authMaxDate
                ? `${authMaxDate.getUTCDate()} de ${monthNames[
                    authMaxDate.getUTCMonth()
                  ].toLocaleLowerCase()}`
                : "(a determinar)"}
            </h1>

            <p>
              <span className={stepInfoBoldClasses}>
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
              <span className={stepInfoBoldClasses}>completas</span>{" "}
              con las{" "}
              <span className={stepInfoBoldClasses}>
                firmas y sellos correspondientes
              </span>
              . Estas se pueden entregar hasta el{" "}
              <span className={stepInfoBoldClasses}>
                {authMaxDate
                  ? `${authMaxDate.getUTCDate()}/${
                      authMaxDate.getUTCMonth() + 1
                    }`
                  : "(A definir)"}
              </span>{" "}
              en los siguientes puntos:
            </p>
            <ul className={dropPointsClasses}>
              {dropPoints &&
                dropPoints.map((dropPoint, index) => {
                  const { localidad, nombre, direccion, aclaracion } =
                    dropPoint;
                  return (
                    <li key={index}>
                      <span className={stepInfoBoldClasses}>
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
