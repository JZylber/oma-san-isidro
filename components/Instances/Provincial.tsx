import Table from "../Table/Table";
import styles from "./Provincial.module.scss";
import ProvincialParticipantCard from "./ProvincialCard";
import SelectResultCategory from "../ResultsPage/SelectResultCategory";
import Collapsable from "../Collapsable/Collapsable";
import Warning from "../Warning/Warning";
import { Button } from "../buttons/Button";
import Image from "next/image";
import useFilter from "../../hooks/useFilter";
import { Filterables, Participant, School } from "../../hooks/types";
import React from "react";

interface ProvincialProps {
  competition: string;
  participants: ProvincialParticipant[];
  auth_max_date?: Date;
}

export interface ProvincialParticipant extends Record<string, Filterables> {
  participante: Participant;
  nivel: number;
  colegio: School;
}

const makeParticipantElement = (
  participant: ProvincialParticipant,
  index: number
) => {
  return (
    <tr key={index}>
      <td>{participant.nivel}</td>
      <td>{participant.participante.toString()}</td>
      <td>{participant.colegio.toString()}</td>
    </tr>
  );
};

const downloadParticipantData = (
  participant: ProvincialParticipant
): Array<string> => {
  return [
    participant.nivel.toString(),
    participant.participante.name,
    participant.participante.surname,
    participant.colegio.toString(),
  ];
};

const months = [
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

const downloadFile = (filename: string) => {
  const link = document.createElement("a");
  link.href = `/files/${filename}`;
  link.target = `_blank`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const Provincial = ({
  competition,
  participants,
  auth_max_date,
}: ProvincialProps) => {
  //Participants
  const [state, update, filteredValues, options] = useFilter(participants);
  const participant_headers = ["Nivel", "Participante", "Colegio"];
  const downloadParticipantHeaders = ["Nivel", "Nombre", "Apellido", "Colegio"];
  const isOma = competition === "OMA";
  return participants.length > 0 && auth_max_date ? (
    <>
      {!isOma && (
        <p className={styles.text}>
          Los alumnos que aprobaron el zonal pasan al regional participen o no
          del provincial.
        </p>
      )}
      <Collapsable title="Inscripción">
        {!isOma && (
          <>
            <p className={styles.text}>
              Los colegios deberán comunicar antes del{" "}
              <span
                className={styles.bold}
              >{`${auth_max_date.getUTCDate()} de ${
                months[auth_max_date.getUTCMonth()]
              }`}</span>{" "}
              la nómina de personas que viajan, por correo electrónico a:{" "}
              <a href="mailto:elena@oma.org.ar">elena@oma.org.ar</a>
            </p>
            <h4 className={styles.section_title}>
              Datos que deben enviar para la inscripción:
            </h4>
            <ul className={styles.text}>
              <li>Nombre y apellido de los alumnos que participan.</li>
              <li>
                Nombre, apellido y número de documento del o los acompañantes,
                indicando si es docente o familiar.
              </li>
              <li>
                Indicar si se hospedan por medio de la olimpíada o por su
                cuenta.
              </li>
              <li>
                En caso de solicitar sólo tarjeta para la premiación, indicar
                nombre y apellido y número de documento de la persona para la
                cual se solicita.
              </li>
            </ul>
          </>
        )}
        {isOma && (
          <>
            <p className={styles.text}>
              Los colegios deberán completar el siguiente formulario antes del{" "}
              <span
                className={styles.bold}
              >{`${auth_max_date.getUTCDate()} de ${
                months[auth_max_date.getUTCMonth()]
              }`}</span>
            </p>
            <div className={styles.button}>
              <Button
                content="Formulario de Inscripción"
                onClick={() => (window.location.href = "")}
              ></Button>
            </div>
          </>
        )}
        <p className={styles.text}>
          <span className={styles.bold}>
            Cuando tengamos el Hotel asignado para nuestra delegación, se
            informará por acá y esto no se puede hacer hasta no tener todas las
            inscripciones.
          </span>
        </p>
        <Warning>
          <p className={styles.text}>
            Recordamos a los colegios que son ellos los responsables de enviar
            la inscripción de sus alumnos, informando a los padres sobre el
            desarrollo de las actividades del Torneo, ya que los alumnos
            participan representando a la escuela.
          </p>
          <p className={styles.text}>
            La Secretaría Regional no puede atender a los padres, ni corresponde
            que lo haga.
          </p>
        </Warning>
      </Collapsable>
      <Collapsable title="Información general y programa">
        <p className={styles.text}>
          El encuentro de la{" "}
          <span className={styles.bold}>
            Olimpíada Regional {isOma ? "OMA" : " Ñandú"} Metropolitana
          </span>{" "}
          se realizará en la ciudad de{" "}
          {isOma ? "Mar del Plata" : "Mar del Plata"} los días{" "}
          {isOma ? "17, 18 y 19 de septiembre" : "12, 13 y 14 de agosto"}{" "}
          {!isOma &&
            "(OJO:este año por el feriado del viernes 15 el encuentro será de martes a jueves)"}
          . Cada delegación se trasladará por su cuenta y riesgo, con sus
          profesores acompañantes según las pautas establecidas{" "}
          <span className={styles.bold}>
            (máximo 8 alumnos por cada docente)
          </span>
          . También, como en años anteriores, nos ocuparemos del alojamiento y
          concentración de aquellas delegaciones que lo soliciten.
        </p>
        {true ? (
          <p className={styles.text}>
            El alojamiento de las delegaciones que lo soliciten será en Hoteles
            de la mencionada ciudad en habitaciones compartidas con otros
            participantes del encuentro. La reserva del alojamiento se hace
            contra{" "}
            {isOma
              ? "el correcto completado del formulario "
              : "entrega de las planillas debidamente cumplimentadas"}
            .
          </p>
        ) : (
          <>
            <p className={styles.text}>
              El alojamiento en la ciudad de Mar del Plata será en los hoteles:
            </p>
            <ul className={styles.text}>
              <li>Estocolmo (Santa Fe 2070)</li>
              <li>Garden (Moreno 2393)</li>
              <li>Novi (H. Yrigoyen 1311)</li>
              <li>ATILRA o 10 de Septiembre (3 de Febrero 2975)</li>
              <li>Nuevo Ostende (H. Yrigoyen 1737)</li>
            </ul>
            <p className={styles.text}>
              Actividades en salones del Hotel Sheraton.{" "}
              {!isOma &&
                "La organización <span className={styles.bold}>NO CONTEMPLA</span> alojamiento en el Hotel Sheraton, allí sólo se desarrollarán las actividades académicas."}
            </p>
          </>
        )}
        <h4 className={styles.section_title}>Programa</h4>
        <ul className={styles.text}>
          <li>
            <span className={styles.bold}>Acreditación:</span>{" "}
            {isOma ? "Miércoles 17 de septiembre" : "Martes 12 de agosto"} de
            15:00 a 20:00 horas en el hotel asignado a su delegación
          </li>
          <li>
            <span className={styles.bold}>Prueba escrita:</span>{" "}
            {isOma
              ? "Jueves 18 de septiembre a las 9:00 horas, Salones Sheraton Hotel - Mar del Plata"
              : "Miércoles 13 de agosto a las 9:00 horas, Salones Sheraton Hotel - Mar del Plata"}
          </li>
          <li>
            <span className={styles.bold}>Exposición Oral y Premiación:</span>{" "}
            {isOma
              ? "Viernes 19 de septiembre a las 9:00 horas, Salones Sheraton Hotel - Mar del Plata"
              : "Jueves 14 de agosto a las 9:00 horas, Sala Astor Piazzolla - Teatro Auditorium - Mar del Plata"}
          </li>
        </ul>
      </Collapsable>
      <Collapsable title="Aranceles">
        <ul className={styles.text}>
          <li>
            <span className={styles.bold}>
              Participantes y/o acompañantes que se alojen en el hotel propuesto
              por la olimpíada:
            </span>{" "}
            {isOma ? "$420.000" : "$398.000"}. Incluye desde la cena del día{" "}
            {isOma ? "miércoles 17" : "martes 12"} al almuerzo del{" "}
            {isOma ? "viernes 19" : "jueves 14"} (incluye una bebida por
            comida).
          </li>
          <li>
            <span className={styles.bold}>
              Participantes que NO se alojen en el hotel propuesto por la
              olimpíada:
            </span>{" "}
            {isOma ? "$200.000" : "$150.000"}.
          </li>
          <li>
            <span className={styles.bold}>
              Acompañantes que NO se alojen en el hotel propuesto por la
              olimpíada:
            </span>{" "}
            {isOma ? "$160.000" : "$110.000"}. (menores de 3 años no pagan)
          </li>
          <li>
            <span className={styles.bold}>Tarjeta de premiación:</span>{" "}
            {isOma ? "$40.000" : "$36.000"}. Solo es necesaria la tarjeta para
            aquellos que no están acreditados como acompañantes y que
            participarán únicamente de la premiación. Deben inscribirse junto
            con los otros participantes en
            {isOma ? " el formulario" : " la planilla"}. Menores de 3 años no
            pagan. <span className={styles.bold}>CUPOS LIMITADOS</span>
          </li>
        </ul>
        <Warning>
          <p className={styles.text}>
            Los aranceles antes mencionados, pueden ser ajustados debido a la
            situación económica financiera del país, que puede hacer variar
            nuestros costos. Quienes quieran asegurarse estos aranceles pueden
            hacer su depósito o trasferencia en los próximos días, enviando el
            comprobante a{" "}
            <a
              href={
                isOma
                  ? "mailto:silviachillo@gmail.com"
                  : "mailto:elena@oma.org.ar"
              }
            >
              {isOma ? "silviachillo@gmail.com" : "elena@oma.org.ar"}
            </a>
            . En caso de tener que variar los aranceles lo avisaremos
            oportunamente.
          </p>
        </Warning>
      </Collapsable>
      <Collapsable title="Pago">
        <p className={styles.text}>
          El pago se hace depositando o transfieriendo a la siguiente cuenta de
          la Fundación Olimpíada Matemática Argentina:
        </p>
        <ul className={styles.text}>
          <li>
            <span className={styles.bold}>BANCO GALICIA</span> (Cuenta
            Corriente)
          </li>
          <li>
            <span className={styles.bold}>N° Cuenta: </span>000267656656
          </li>
          <li>
            <span className={styles.bold}>CBU: </span>0070665620000002676566
          </li>
          <li>
            <span className={styles.bold}>ALIAS: </span>FOMAHSBCCC
          </li>
          <li>
            <span className={styles.bold}>CUIT: </span>30-67928383-5
          </li>
        </ul>
        <p className={styles.text}>
          Recordamos que para la acreditación deben presentar el{" "}
          <span className={styles.bold}>ORIGINAL</span> de dicho depósito.
        </p>
        <p className={styles.text}>
          Para solicitar factura electrónica por el pago deben completar el
          siguiente formulario:
          <a
            className="text-blue-600 underline"
            href={
              isOma
                ? "https://forms.gle/zaRDFJoFCmH6dt6L7"
                : "https://forms.gle/pe3i1TWV1bgv6Rv39"
            }
          >
            {isOma
              ? "https://forms.gle/zaRDFJoFCmH6dt6L7"
              : "https://forms.gle/pe3i1TWV1bgv6Rv39"}
          </a>
        </p>
        <p className={styles.text}>
          Los recibos son entregados en el momento de la acreditación a la
          persona que la efectúa (docente, pariente, etc.). Por eso, se
          recomienda no perder el recibo y entregarlo a quien corresponda a su
          regreso. No podemos anular y rehacer recibos o facturas sin la
          presentación del original. Para todo tipo de reclamo hay un plazo de
          30 días
        </p>
        {/*<div className={styles.documentation}>
          <div className={styles.button}>
            <Button
              content="Planilla Facturación"
              onClick={() =>
                downloadFile(
                  `/provincial/${isOma ? "oma" : "nandu"}/PedidoFactura.xlsx`
                )
              }
            >
              <div className={styles.arrow}>
                <Image
                  src="/images/newsArrow.svg"
                  width={30}
                  height={40}
                  alt="Descargar"
                />
              </div>
            </Button>
          </div>
        </div>*/}
      </Collapsable>
      <Collapsable title="Documentación">
        <p className={styles.text}>La documentación exigida incluye:</p>
        <ul className={styles.text}>
          <li>
            AUTORIZACIÓN de cada alumno (se utilizará la autorización que se
            descarga debajo)
          </li>
          <li>DOCUMENTO original de cada alumno.</li>
          <li>
            COMPROMISO de cada acompañante DOCENTE, PADRE, TUTOR (se utilizará
            el compromiso que se descarga debajo)
          </li>
        </ul>
        <p className={styles.text}>
          La documentación debe ser entregada en la acreditación.
        </p>
        <div className={styles.documentation}>
          <div className={styles.button}>
            <Button
              content="Autorización"
              onClick={() =>
                downloadFile(
                  `/provincial/${
                    isOma ? "oma/Autorización.docx" : "nandu/Autorización.pdf"
                  }`
                )
              }
            >
              <div className={styles.arrow}>
                <Image
                  src="/images/newsArrow.svg"
                  width={30}
                  height={40}
                  alt="Descargar"
                />
              </div>
            </Button>
          </div>
          <div className={styles.button}>
            <Button
              content="Compromiso"
              onClick={() =>
                downloadFile(
                  `/provincial/${
                    isOma ? "oma/Compromiso.docx" : "nandu/Compromiso.pdf"
                  }`
                )
              }
            >
              <div className={styles.arrow}>
                <Image
                  src="/images/newsArrow.svg"
                  width={30}
                  height={40}
                  alt="Descargar"
                />
              </div>
            </Button>
          </div>
        </div>
      </Collapsable>
      <Collapsable title="Premiación">
        <p className={styles.text}>
          Para evitar inconvenientes y malos entendidos, podrán participar en el
          acto de premiación solo las personas debidamente acreditadas portando
          credencial o “tarjeta de invitación individual”. Se aclara que,
          indefectiblemente, todas aquellas personas que deseen adquirir las
          tarjetas de invitación individual para el Acto de premiación deben
          estar inscriptas con nombre, apellido y documento en
          {isOma ? " el formulario" : " la planilla"}.
        </p>
        <p className={styles.text}>
          {" "}
          Costo de la tarjeta {isOma ? "$40.000" : "$36.000"}.- CUPOS LIMITADOS
          (menores de 3 años no pagan){" "}
        </p>
      </Collapsable>
      <Collapsable title="Participantes Clasificados">
        {isOma ? (
          <p className={styles.text}>
            Los participantes que clasifican a la instancia provincial son
            aquellos que sumen 5 puntos entre las instancias Zonal e
            Interescolar.
          </p>
        ) : (
          <p className={styles.text}>
            Los participantes que clasifican a la instancia provincial son
            aquellos que sumen 5 puntos entre las instancias Zonal e
            Interescolar.
          </p>
        )}
        <form className={styles.form}>
          <SelectResultCategory
            category="Participante"
            value={state.participante}
            setValue={(option?: Participant) =>
              update({ participante: option })
            }
            options={options["participante"]}
            input={true}
          />
          <SelectResultCategory
            category="Colegio"
            value={state.colegio}
            setValue={(option?: School) => update({ colegio: option })}
            options={options["colegio"]}
            input={true}
          />
          <SelectResultCategory
            category="Nivel"
            value={state.nivel}
            setValue={(option?: number) => update({ nivel: option })}
            options={options["nivel"]}
            clear={true}
          />
        </form>
        <Table
          values={filteredValues as ProvincialParticipant[]}
          allValues={participants}
          headers={participant_headers}
          Card={ProvincialParticipantCard}
          elements_per_page={20}
          download={true}
          downloadHeaders={downloadParticipantHeaders}
          process_data={downloadParticipantData}
          make_element={makeParticipantElement}
          testInfo={`${
            competition == "OMA" ? "OMA" : "Ñandú"
          } Provincial ${new Date().getFullYear()}`}
        />
      </Collapsable>
      <Collapsable title="Reglamento">
        <ul className={styles.text}>
          <li>
            Toda otra persona (padre, tutor, etc.) que desee integrar la
            delegación debe comprometerse a cumplir todas las normas
            establecidas para la delegación.
          </li>{" "}
          <li>
            Los que solicitaron alojamiento en las secretarías regionales,
            podrán hacerlo a partir de las 15:00 horas del día{" "}
            {isOma ? "17 de septiembre" : "12 de agosto"}.
          </li>
          <li>
            Solo podrá asistir a las actividades programadas dentro de los
            espacios establecidos (esto incluye el ingresar, permanecer y
            circular por el mismo) quien se acredite debidamente el día{" "}
            {isOma ? "17 de septiembre" : "12 de agosto"}.
          </li>
          <li>
            Se recuerda a los responsables de las delegaciones, se alojen o no
            en el hotel propuesto por la olimpíada, que durante todo el tiempo
            estarán a cargo de los alumnos y deberán participar de las
            actividades programadas con sus alumnos.
          </li>
          <li>
            Bajo ningún concepto los participantes podrán circular o permanecer
            fuera de su lugar de alojamiento después de las 00:00 hs.
          </li>
          <li>
            Todos deberán abstenerse de: transportar, ingerir o consumir
            alcohol, bebidas energizantes u otros estimulantes, fumar en los
            lugares cerrados, como habitaciones, el comedor, o donde se
            desarrollen las actividades de la competencia.
          </li>
        </ul>
        <p className={styles.text}>
          Ante cualquier irregularidad o muestra de inconducta las personas
          involucradas serán sancionadas debiendo regresar de inmediato a su
          lugar de origen.
        </p>
      </Collapsable>
    </>
  ) : (
    <p className={styles.text}>Proximamente...</p>
  );
};

export default Provincial;
