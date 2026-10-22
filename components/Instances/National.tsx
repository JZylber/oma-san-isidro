import Table from "../Table/Table";
import ProvincialParticipantCard from "./ProvincialCard";
import SelectResultCategory from "../ResultsPage/SelectResultCategory";
import Collapsable from "../Collapsable/Collapsable";
import Warning from "../Warning/Warning";
import { Button } from "../buttons/Button";
import Image from "next/image";
import useFilter from "../../hooks/useFilter";
import {
  Filterables,
  FilterObject,
  Participant,
  School,
} from "../../hooks/types";
import { INSTANCIA } from "@prisma/client";
import { trpc } from "../../utils/trpc";
import Loader from "../Loader/Loader";
import React from "react";

interface NationalProps {
  competition: string;
  participants: NationalParticipant[];
  auth_max_date?: Date;
}

export interface NationalParticipant extends FilterObject {
  participante: Participant;
  nivel: number;
  colegio: School;
}

const makeParticipantElement = (
  participant: NationalParticipant,
  index: number,
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
  participant: NationalParticipant,
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

const textClasses =
  "font-montserrat font-light max-tablet:text-[1.4rem] tablet:max-desktop:text-tablet-reading desktop:text-desktop-reading";
const boldClasses = "font-medium";
const listClasses = "ml-[1.6rem] list-disc list-inside [&_li+li]:mt-[.8rem]";
const sectionTitleClasses =
  "font-unbounded font-medium my-[1rem] max-tablet:text-center max-tablet:text-[1.8rem] tablet:text-left tablet:max-desktop:text-[1.5rem] desktop:text-[2.3rem]";
const documentationClasses =
  "flex justify-start gap-x-[2.4rem] max-tablet:flex-col";
const buttonClasses =
  "max-tablet:[flex-grow:1] tablet:max-desktop:[flex-grow:0.5] desktop:[flex-grow:0.3]";
const arrowClasses = "hidden desktop:block desktop:rotate-90";
const formClasses = "flex mt-[1.2rem] max-tablet:flex-col";

const NationalInfo = ({
  competition,
  participants,
  auth_max_date,
}: NationalProps) => {
  //Participants
  const [state, update, filteredValues, options] = useFilter(participants);
  const participant_headers = ["Nivel", "Participante", "Colegio"];
  const downloadParticipantHeaders = ["Nivel", "Nombre", "Apellido", "Colegio"];
  const isOma = competition === "OMA";
  return participants.length > 0 && auth_max_date ? (
    <>
      <Collapsable title="Inscripción">
        <>
          <p className={textClasses}>
            Los colegios deberán completar el siguiente formulario antes del{" "}
            <span className={boldClasses}>{`${auth_max_date.getUTCDate()} de ${
              months[auth_max_date.getUTCMonth()]
            }`}</span>
          </p>
          <div className={buttonClasses}>
            <Button
              content="Formulario de Inscripción"
              onClick={() =>
                (window.location.href = isOma
                  ? "https://script.google.com/macros/s/AKfycbximhOduxVEk97uKMVXa9E-wjRsDWA31uJig0L_fdzBUAEglD-8ekmJjqTaySZnikFk/exec"
                  : "https://script.google.com/macros/s/AKfycbyzUtub27Iupmqy9Nf5YRTY2H2iSG-PMykH8oK1ydb8ib0KlGCE6o_rwC2XQPlh420O/exec")
              }
            ></Button>
          </div>
        </>
        <Warning>
          <p className={textClasses}>
            Recordamos a los colegios que son ellos los responsables de enviar
            la inscripción de sus alumnos, informando a los padres sobre el
            desarrollo de las actividades del Torneo, ya que los alumnos
            participan representando a la escuela.
          </p>
          <p className={textClasses}>
            La Secretaría Regional no puede atender a los padres, ni corresponde
            que lo haga.
          </p>
        </Warning>
      </Collapsable>
      <Collapsable title="Información general y programa">
        <p className={textClasses}>
          El encuentro de la{" "}
          <span className={boldClasses}>
            Olimpíada Nacional {isOma ? "Oma" : "Ñandú"}
          </span>{" "}
          se realizará en la ciudad de La Falda, Córdoba los días{" "}
          {isOma
            ? "15 al 19 de noviembre en el Hotel Edén (Av. Edén 1400)"
            : "20 al 23 de octubre en el Hotel Edén (Av. Edén 1400)"}
          . Cada delegación se trasladará por su cuenta y riesgo, con sus
          profesores acompañantes según las pautas establecidas{" "}
          <span className={boldClasses}>
            (máximo 8 alumnos por cada docente)
          </span>
          {isOma &&
            ". En caso de viajar en micros tipo chárter, estos deberán estar habilitados y contar con la póliza de seguro vigente"}
          . También, como en años anteriores, nos ocuparemos del alojamiento y
          concentración de aquellas delegaciones que lo soliciten.
        </p>
        <p className={textClasses}>
          El alojamiento de las delegaciones que lo soliciten será en diferentes
          hoteles de la ciudad de la falda en habitaciones compartidas con otros
          participantes del encuentro
          {isOma
            ? " (pueden ingresar al hotel a partir de las 15:00 horas del domingo 15 de noviembre)"
            : " (pueden ingresar al hotel a partir de las 15:00 horas del martes 20 de octubre)"}
          . La reserva del alojamiento se hace contra entrega del formulario
          debidamente cumplimentado.
        </p>
        <h4 className={sectionTitleClasses}>Programa</h4>
        <ul className={`${textClasses} ${listClasses}`}>
          <li>
            <span className={boldClasses}>Acreditación:</span>{" "}
            {isOma ? "Domingo 15 de noviembre" : "Martes 20 de octubre"} de
            16:00 a 20:00 horas (en breve informaremos dónde se realizará)
          </li>
          <li>
            <span className={boldClasses}>Prueba escrita:</span>{" "}
            {isOma
              ? "Lunes 16 y Martes 17 de noviembre"
              : "Miércoles 21 y Jueves 22 de octubre"}{" "}
            a las 9:30 horas, en salones del{" "}
            <span className={boldClasses}>Hotel Edén</span>
          </li>
          <li>
            <span className={boldClasses}>Exposición Oral y Premiación:</span>{" "}
            {isOma ? "Jueves 19 de noviembre" : "Viernes 23 de octubre"} de 9:00
            a 12:00 horas en el <span className={boldClasses}>Hotel Edén</span>
          </li>
        </ul>
        <h4 className={sectionTitleClasses}>Hoteles</h4>
        <ul className={`${textClasses} ${listClasses}`}>
          <li>
            <span className={boldClasses}>Hotel 1° de Mayo</span> (sindicato de
            camioneros): Av. Argentina 88
          </li>
          <li>
            <span className={boldClasses}>Hotel L&apos;Hirondelle</span>: Av.
            Edén 861
          </li>
          <li>
            <span className={boldClasses}>Hotel Tomaso di Savoia</span>{" "}
            (sindicato de camioneros de Santa Fe): Av. Edén 732
          </li>
          <li>
            <span className={boldClasses}>Hotel La Falda</span> (mutual del
            banco provincia de Córdoba): Santa Fe esq. Av. Patria
          </li>
          {isOma && (
            <>
              <li>
                <span className={boldClasses}>Hotel Brigadier</span>: Av. Buenos
                Aires 293
              </li>
              <li>
                <span className={boldClasses}>
                  Hotel Reconstrucción Nacional
                </span>{" "}
                (sindicato del seguro): Chubut 48
              </li>
            </>
          )}
        </ul>
        {isOma && (
          <p className={textClasses}>
            Si se completara la capacidad de dichos hoteles, se asignarán otros.
          </p>
        )}
      </Collapsable>
      <Collapsable title="Aranceles">
        <ul className={`${textClasses} ${listClasses}`}>
          <li>
            <span className={boldClasses}>
              Participantes y/o acompañantes que se alojen en el hotel propuesto
              por la olimpíada:
            </span>{" "}
            {isOma ? "$750.000" : "$560.000"}. Incluye desde la cena del día{" "}
            {isOma ? "domingo 15" : "martes 20"} al almuerzo del{" "}
            {isOma ? "jueves 19" : "viernes 23"} (incluye una bebida por
            comida).
          </li>
          <li>
            <span className={boldClasses}>
              Participantes que NO se alojen en el hotel propuesto por la
              olimpíada:
            </span>{" "}
            {isOma ? "$350.000" : "$330.000"}.{" "}
            {isOma
              ? "Incluye el ingreso al acto de premiación, gastos de organización, almuerzos y meriendas de los días de las pruebas escritas (lunes 16 y martes 17) y la merienda del miércoles 18."
              : "Incluye el ingreso al acto de premiación y gastos de organización."}
          </li>
          <li>
            <span className={boldClasses}>
              Acompañantes que NO se alojen en el hotel propuesto por la
              olimpíada:
            </span>{" "}
            {isOma ? "$320.000" : "$290.000"}.{" "}
            {isOma
              ? "Incluye el ingreso al acto de premiación, gastos de organización, almuerzos y meriendas de los días de las pruebas escritas (lunes 16 y martes 17) y la merienda del miércoles 18."
              : "Incluye el ingreso al acto de premiación y gastos de organización."}
          </li>
          <li>
            <span className={boldClasses}>Tarjeta de premiación:</span> $30.000.
            Solo es necesaria la tarjeta para aquellos que no están acreditados
            como acompañantes y que participarán únicamente de la premiación.
            Deben inscribirse junto con los otros participantes en el
            formulario.{" "}
            {!isOma && (
              <span className={boldClasses}>
                Cada persona con tarjeta debe presentar firmado su propio
                Compromiso de Acceso a Premiación (formulario aparte, uno por
                persona).
              </span>
            )}
          </li>
        </ul>
        {/*<Warning>
            <p className={textClasses}>Los aranceles antes mencionados, pueden ser ajustados debido a la situación económica financiera del país, que puede hacer variar nuestros costos. Quienes quieran asegurarse estos aranceles pueden hacer su depósito o trasferencia en los próximos días, enviando el comprobante a <a href="mailto:elena@oma.org.ar">elena@oma.org.ar</a>. En caso de tener que variar los aranceles lo avisaremos oportunamente.</p>
        </Warning>*/}
      </Collapsable>
      <Collapsable title="Pago">
        <p className={textClasses}>
          El pago se hace depositando o transfieriendo a la siguiente cuenta de
          la Fundación Olimpíada Matemática Argentina:
        </p>
        <ul className={textClasses}>
          <li>
            <span className={boldClasses}>BANCO GALICIA</span> (Cuenta
            Corriente)
          </li>
          <li>
            <span className={boldClasses}>N° Cuenta: </span>000267656656
          </li>
          <li>
            <span className={boldClasses}>CBU: </span>0070665620000002676566
          </li>
          <li>
            <span className={boldClasses}>ALIAS: </span>FOMA.OLIMPIADA
          </li>
          <li>
            <span className={boldClasses}>CUIT: </span>30-67928383-5
          </li>
        </ul>
        <p className={textClasses}>
          Recordamos que para la acreditación deben presentar el{" "}
          <span className={boldClasses}>comprobante de pago impreso</span>.
        </p>
        <p className={textClasses}>
          Para solicitar factura electrónica por el pago deben completar el
          siguiente formulario:
          <a
            className="text-blue-600 underline"
            href={
              isOma
                ? "https://forms.gle/dmMYyaUFYuVUsgpV8"
                : "https://forms.gle/RL9WUueiEYW9yWQM7"
            }
          >
            {isOma
              ? "https://forms.gle/dmMYyaUFYuVUsgpV8"
              : "https://forms.gle/RL9WUueiEYW9yWQM7"}
          </a>
        </p>
        <p className={textClasses}>
          Este formulario es solo para solicitar factura electrónica. No es un
          formulario de inscripción: únicamente se deben completar las
          cantidades que correspondan a la factura.
        </p>
        <Warning>
          <p className={textClasses}>
            En el hotel contratado, luego de confirmar el{" "}
            {auth_max_date.getUTCDate()} de{" "}
            {months[auth_max_date.getUTCMonth()]} las plazas reservadas, deberán
            abonarse aunque no se ocupen.
          </p>
          <p className={textClasses}>
            La fecha límite para abonar el total de la inscripción es el{" "}
            <span className={boldClasses}>
              {isOma ? "lunes 9 de noviembre" : "lunes 19 de octubre"}
            </span>
            . Para solicitar la devolución del arancel, la cancelación debe
            notificarse a la Secretaría Regional con al menos 72 horas hábiles
            de anticipación al inicio del evento (hasta el{" "}
            <span className={boldClasses}>
              {isOma ? "martes 10 de noviembre" : "jueves 15 de octubre"}
            </span>
            ).
          </p>
        </Warning>
      </Collapsable>
      <Collapsable title="Documentación">
        <p className={textClasses}>La documentación exigida incluye:</p>
        <ul className={`${textClasses} ${listClasses}`}>
          <li>
            AUTORIZACIÓN de cada alumno (se utilizará la autorización que se
            descarga debajo)
          </li>
          <li>DOCUMENTO original de cada alumno.</li>
          <li>
            COMPROMISO de cada acompañante DOCENTE, PADRE, TUTOR (se utilizará
            el compromiso que se descarga debajo)
          </li>
          {!isOma && (
            <li>
              COMPROMISO DE ACCESO A PREMIACIÓN de{" "}
              <span className={boldClasses}>
                cada persona que ingrese con tarjeta (tipo T)
              </span>
              , en formulario aparte (se descarga debajo)
            </li>
          )}
        </ul>
        <p className={textClasses}>
          La documentación debe ser entregada en la acreditación.
        </p>
        <div className={documentationClasses}>
          <div className={buttonClasses}>
            <Button
              content="Autorización"
              onClick={() =>
                downloadFile(
                  `/nacional/${isOma ? "oma" : "nandu"}/Autorización.pdf`,
                )
              }
            >
              <div className={arrowClasses}>
                <Image
                  src="/images/newsArrow.svg"
                  width={30}
                  height={40}
                  alt="Descargar"
                />
              </div>
            </Button>
          </div>
          <div className={buttonClasses}>
            <Button
              content="Compromiso"
              onClick={() =>
                downloadFile(
                  `/nacional/${isOma ? "oma" : "nandu"}/Compromiso.pdf`,
                )
              }
            >
              <div className={arrowClasses}>
                <Image
                  src="/images/newsArrow.svg"
                  width={30}
                  height={40}
                  alt="Descargar"
                />
              </div>
            </Button>
          </div>
          {!isOma && (
            <div className={buttonClasses}>
              <Button
                content="Acceso Premiación"
                onClick={() =>
                  downloadFile("/nacional/nandu/AccesoPremiacion.pdf")
                }
              >
                <div className={arrowClasses}>
                  <Image
                    src="/images/newsArrow.svg"
                    width={30}
                    height={40}
                    alt="Descargar"
                  />
                </div>
              </Button>
            </div>
          )}
        </div>
      </Collapsable>
      <Collapsable title="Premiación">
        <p className={textClasses}>
          Para evitar inconvenientes y malos entendidos, podrán participar en el
          acto de premiación solo las personas debidamente acreditadas portando
          credencial o “tarjeta de invitación individual”. Se aclara que,
          indefectiblemente, todas aquellas personas que deseen adquirir las
          tarjetas de invitación individual para el Acto de premiación deben
          estar inscriptas con nombre, apellido y documento en el formulario.
        </p>
        {!isOma && (
          <Warning title="Tarjeta de premiación: documentación obligatoria">
            <p className={textClasses}>
              <span className={boldClasses}>
                Cada persona que ingrese con tarjeta (tipo T) debe presentar
                firmado su propio formulario de Acceso a Premiación.
              </span>{" "}
              Es un papel aparte, uno por persona: sin él no se permite el
              ingreso.
            </p>
            <p className={textClasses}>
              La acreditación solo habilita el ingreso al acto de premiación del
              viernes 23 de octubre a las 9:00. Deben acordar de antemano un
              punto de encuentro con el adulto responsable o acompañante.
            </p>
            <div className={buttonClasses}>
              <Button
                content="Acceso Premiación"
                onClick={() =>
                  downloadFile("/nacional/nandu/AccesoPremiacion.pdf")
                }
              >
                <div className={arrowClasses}>
                  <Image
                    src="/images/newsArrow.svg"
                    width={30}
                    height={40}
                    alt="Descargar"
                  />
                </div>
              </Button>
            </div>
          </Warning>
        )}
      </Collapsable>
      <Collapsable title="Participantes Clasificados">
        <p className={textClasses}>
          Los participantes que clasifican a la instancia nacional son aquellos
          que hayan aprobado la instancia regional.
        </p>
        <form className={formClasses}>
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
          values={filteredValues as NationalParticipant[]}
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
          } Nacional ${new Date().getFullYear()}`}
        />
      </Collapsable>
      <Collapsable title="Reglamento">
        <ul className={`${textClasses} ${listClasses}`}>
          <li>
            Toda otra persona (padre, tutor, etc.) que desee integrar la
            delegación debe comprometerse a cumplir todas las normas
            establecidas para la delegación.
          </li>
          <li>
            Solo podrá asistir a las actividades programadas dentro de los
            espacios establecidos (esto incluye el ingresar, permanecer y
            circular por el mismo) quien se acredite debidamente el día{" "}
            {isOma ? "15 de noviembre" : "20 de octubre"}.
          </li>
          <li>
            Se recuerda a los responsables de las delegaciones, se alojen o no
            en el hotel propuesto por la olimpíada, que durante todo el tiempo
            estarán a cargo de los alumnos y deberán participar de las
            actividades programadas con sus alumnos
          </li>
          <li>
            Bajo ningún concepto los participantes podrán circular o permanecer
            fuera de su lugar de alojamiento después de las 00:00 hs
          </li>
          <li>
            Todos deberán abstenerse de: transportar, ingerir o consumir
            alcohol, bebidas energizantes u otros estimulantes, fumar en los
            lugares cerrados, como habitaciones, el comedor, o donde se
            desarrollen las actividades de la competencia
          </li>
        </ul>
        <p className={textClasses}>
          Ante cualquier irregularidad o muestra de inconducta las personas
          involucradas serán sancionadas debiendo regresar de inmediato a su
          lugar de origen.
        </p>
      </Collapsable>
    </>
  ) : (
    <p className={textClasses}>Proximamente...</p>
  );
};

const National = ({ competition }: { competition: string }) => {
  const instance = INSTANCIA.NACIONAL;
  const venueData = trpc.instance.nationalInstance.useQuery({
    competition: competition,
    instance: instance,
  });
  if (venueData.isLoading) {
    return <Loader />;
  } else if (venueData.isSuccess) {
    const data = {
      competition: competition,
      auth_max_date: venueData.data.auth_max_date,
      participants: venueData.data.participants.map((participant) => {
        return {
          participante: new Participant(
            participant.nombre,
            participant.apellido,
          ),
          colegio: new School(
            participant.colegio.nombre,
            participant.colegio.sede ? participant.colegio.sede : undefined,
          ),
          nivel: participant.nivel,
        };
      }),
    };
    return data.participants.length > 0 && data.auth_max_date ? (
      <NationalInfo {...data} />
    ) : (
      <p className="font-montserrat text-5xl py-6">Proximamente...</p>
    );
  } else {
    return <div>Error</div>;
  }
};

export default National;
