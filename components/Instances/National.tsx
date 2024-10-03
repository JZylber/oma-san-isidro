import Table from "../Table/Table";
import styles from "./Provincial.module.scss";
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
  participant: NationalParticipant
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
        <p className={styles.text}>
          Los colegios deberán comunicar antes del{" "}
          <span className={styles.bold}>{`${auth_max_date.getUTCDate()} de ${
            months[auth_max_date.getUTCMonth()]
          }`}</span>{" "}
          la nómina de personas que viajan,
          <span className={styles.bold}>
            {" "}
            completando la planilla de inscripción
          </span>{" "}
          y enviándola por correo electrónico a:{" "}
          <a href="mailto:elena@oma.org.ar">elena@oma.org.ar</a>
        </p>

        <h4 className={styles.section_title}>
          Instructivo para llenar la planilla:
        </h4>
        <ul className={`${styles.text} ${styles.list}`}>
          <li>
            <span className={styles.bold}>Región:</span> San Isidro o 53
          </li>
          <li>
            <span className={styles.bold}>Colegio:</span> Nombre del
            Establecimiento del alumno
          </li>
          <li>
            <span className={styles.bold}>Localidad:</span> Lugar donde se
            encuentra el colegio
          </li>
          <li>
            <span className={styles.bold}>Nivel:</span> Nivel de Olimpíada del
            participante (1, 2 ó 3). Para los acompañantes el nivel es 0 (cero).
          </li>
          <li>
            <span className={styles.bold}>Sexo:</span> Completar con F
            (femenino) o M (masculino) (no usar mujer y varón)
          </li>
          <li>
            <span className={styles.bold}>Tipo:</span> Usar el siguiente código:
            A para los alumnos; D para los docentes acompañantes, P para el
            acompañante familiar y T para los que asistan a la premiación
            únicamente. En el caso de los familiares, indicar en la columna
            observaciones el grado de parentesco y de quién.
          </li>
          <li>
            <span className={styles.bold}>Alojamiento:</span> Usar el siguiente
            código: S si se alojan en el hotel propuesto por olimpíadas; N si se
            alojan por su cuenta.
          </li>
          <li>
            <span className={styles.bold}>Dieta:</span> Notificar los celiacos,
            vegetarianos, veganos, etc.
          </li>
          <li>
            <span className={styles.bold}>
              Vianda almuerzo {isOma ? 17 : 23}:
            </span>{" "}
            Usar el siguiente código: S si se retiran con vianda luego de la
            premiación de olimpíadas; N si almuerzan.
          </li>
          <li>
            <span className={styles.bold}>Observaciones:</span> Espacio para
            aclaraciones como por ejemplo parentesco con el alumno.{" "}
          </li>
          <li>
            <span className={styles.bold}>Celular del responsable:</span> Número
            de teléfono celular de contacto del responsable.{" "}
          </li>
          <li>
            <span className={styles.bold}>Mail:</span> Por favor agregar mail
            del responsable por cualquier consulta.
          </li>
        </ul>
        <div className={styles.documentation}>
          <div className={styles.button}>
            <Button
              content="Planilla Inscripción"
              onClick={() =>
                downloadFile(
                  `/nacional/${isOma ? "oma" : "nandu"}/PlanillaNacional.xlsx`
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

        <Warning>
          <p className={styles.text}>
            <span className={styles.bold}>
              Se ruega enviar toda la documentación junta:
            </span>{" "}
            los datos pedidos anteriormente, el comprobante de pago, y el pedido
            de la factura electrónica (si fuese necesaria).
          </p>
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
            Olimpíada Nacional {isOma ? "Oma" : "Ñandú"}
          </span>{" "}
          se realizará en la ciudad de La Falda, Córdoba los días{" "}
          {isOma
            ? "13 al 17 de noviembre en el Hotel Edén (Av. Edén 1400)"
            : "20 al 23 de octubre en el Hotel Edén (Av. Edén 1400)"}
          . Cada delegación se trasladará por su cuenta y riesgo, con sus
          profesores acompañantes según las pautas establecidas{" "}
          <span className={styles.bold}>
            (máximo 8 alumnos por cada docente)
          </span>
          . También, como en años anteriores, nos ocuparemos del alojamiento y
          concentración de aquellas delegaciones que lo soliciten.
        </p>
        <p className={styles.text}>
          El alojamiento de las delegaciones que lo soliciten será en{" "}
          {isOma ? "el Hotel FATSA" : "el Hotel FATSA"} de la ciudad de la falda
          en habitaciones compartidas con otros participantes del encuentro
          {!isOma &&
            ", hasta completar su capacidad, luego serán derivados a otros hoteles de la ciudad"}
          . La reserva del alojamiento se hace contra entrega de las planillas
          debidamente cumplimentadas.
        </p>
        <h4 className={styles.section_title}>Programa</h4>
        <ul className={`${styles.text} ${styles.list}`}>
          <li>
            <span className={styles.bold}>Acreditación:</span>{" "}
            {isOma ? (
              <>
                Lunes 13 de noviembre de 16:00 a 20:00 horas en el{" "}
                <span className={styles.bold}>
                  hotel donde se aloje la delegación de la región
                </span>
              </>
            ) : (
              <>
                Domingo 20 de octubre de 16:00 a 20:00 horas en el{" "}
                <span className={styles.bold}>
                  en el Hotel donde se aloje la delegación de la región
                </span>
              </>
            )}{" "}
          </li>
          <li>
            <span className={styles.bold}>Prueba escrita:</span>{" "}
            {isOma ? (
              <>
                Martes 14 y Miércoles 15 de noviembre a las 9:30hs en el{" "}
                <span className={styles.bold}>Hotel Edén</span>
              </>
            ) : (
              <>
                Lunes 21 y Martes 22 de octubre a las 9:30 horas, en salones del{" "}
                <span className={styles.bold}>Hotel Edén</span>
              </>
            )}
          </li>
          <li>
            <span className={styles.bold}>Exposición Oral y Premiación:</span>{" "}
            {isOma ? (
              <>
                Viernes 17 de noviembre a las 9:30hs horas en el{" "}
                <span className={styles.bold}>Hotel Edén</span>
              </>
            ) : (
              <>
                Miércoles 23 de octubre a de 9:00 a 12:00 horas en el{" "}
                <span className={styles.bold}>Hotel Edén</span>
              </>
            )}
          </li>
        </ul>
      </Collapsable>
      <Collapsable title="Aranceles">
        <ul className={`${styles.text} ${styles.list}`}>
          <li>
            <span className={styles.bold}>
              Participantes y/o acompañantes que se alojen en el hotel propuesto
              por la olimpíada:
            </span>{" "}
            {isOma ? "$120.000" : "$290.000"}. Incluye desde la cena del día{" "}
            {isOma ? "lunes 13" : "domingo 20"} al almuerzo del{" "}
            {isOma ? "viernes 17" : "miércoles 23"} (incluye una bebida por
            comida).
          </li>
          <li>
            <span className={styles.bold}>
              Participantes que NO se alojen en el hotel propuesto por la
              olimpíada:
            </span>{" "}
            {isOma ? "$39.000" : "$120.000"}.{" "}
            <span className={styles.bold}>
              Incluye los almuerzos y meriendas de los días de las pruebas
              escritas (
              {isOma ? (
                <>martes 14 y miércoles 15</>
              ) : (
                <>lunes 21 y martes 23</>
              )}
              ).
            </span>
          </li>
          <li>
            <span className={styles.bold}>
              Acompañantes que NO se alojen en el hotel propuesto por la
              olimpíada:
            </span>{" "}
            {isOma ? "$32.000" : "$110.000"}.{" "}
            <span className={styles.bold}>
              Incluye los almuerzos y meriendas de los días de las pruebas
              escritas (
              {isOma ? (
                <>martes 14 y miércoles 15</>
              ) : (
                <>lunes 21 y martes 22</>
              )}
              ).
            </span>{" "}
          </li>
          <li>
            <span className={styles.bold}>Tarjeta de premiación:</span> $12.000.
            Solo es necesaria la tarjeta para aquellos que no están acreditados
            como acompañantes y que participarán únicamente de la premiación.
            Deben inscribirse junto con los otros participantes en la planilla.
          </li>
        </ul>
        {/*<Warning>
            <p className={styles.text}>Los aranceles antes mencionados, pueden ser ajustados debido a la situación económica financiera del país, que puede hacer variar nuestros costos. Quienes quieran asegurarse estos aranceles pueden hacer su depósito o trasferencia en los próximos días, enviando el comprobante a <a href="mailto:elena@oma.org.ar">elena@oma.org.ar</a>. En caso de tener que variar los aranceles lo avisaremos oportunamente.</p>
        </Warning>*/}
      </Collapsable>
      <Collapsable title="Pago">
        <p className={styles.text}>
          El pago se hace depositando o transfieriendo a la siguiente cuenta de
          la Fundación Olimpíada Matemática Argentina:
        </p>
        <ul className={`${styles.text} ${styles.list}`}>
          <li>
            <span className={styles.bold}>BANCO HSBC</span> (Cuenta Corriente)
            Sucursal Los Arcos (ex Salguero).
          </li>
          <li>
            <span className={styles.bold}>N° Cuenta: </span>6093228419
          </li>
          <li>
            <span className={styles.bold}>CBU: </span>1500609900060932284196
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
          Si necesitan factura electrónica o factura C, por favor completar la
          planilla y enviar a{" "}
          <a href="mailto:elena@oma.org.ar">elena@oma.org.ar</a> junto con el
          comprobante de pago.
        </p>
        <div className={styles.documentation}>
          <div className={styles.button}>
            <Button
              content="Planilla Facturación"
              onClick={() =>
                downloadFile(
                  `/nacional/${isOma ? "oma" : "nandu"}/PedidoFactura.xlsx`
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
        <Warning>
          <p className={styles.text}>
            <span className={styles.bold}>
              Se ruega enviar toda la documentación junta:
            </span>{" "}
            el comprobante de pago, el pedido de la factura electrónica (si
            fuese necesaria) y los datos necesarios para la inscripción.
          </p>
          {!isOma && (
            <p className={styles.text}>
              En el hotel contratado, luego de confirmar el{" "}
              {auth_max_date.getUTCDate()} de{" "}
              {months[auth_max_date.getUTCMonth()]} las plazas reservadas,
              deberán abonarse aunque no se ocupen.
            </p>
          )}
        </Warning>
      </Collapsable>
      <Collapsable title="Documentación">
        <p className={styles.text}>La documentación exigida incluye:</p>
        <ul className={`${styles.text} ${styles.list}`}>
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
                  `/nacional/${isOma ? "oma" : "nandu"}/Autorización.docx`
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
                  `/nacional/${isOma ? "oma" : "nandu"}/Compromiso.docx`
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
          estar inscriptas con nombre, apellido y documento en la planilla.
        </p>
      </Collapsable>
      <Collapsable title="Participantes Clasificados">
        <p className={styles.text}>
          Los participantes que clasifican a la instancia nacional son aquellos
          que hayan aprobado la instancia regional.
        </p>
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
        <ul className={`${styles.text} ${styles.list}`}>
          <li>
            Toda otra persona (padre, tutor, etc.) que desee integrar la
            delegación debe comprometerse a cumplir todas las normas
            establecidas para la delegación.
          </li>
          <li>
            Solo podrá asistir a las actividades programadas dentro de los
            espacios establecidos (esto incluye el ingresar, permanecer y
            circular por el mismo) quien se acredite debidamente el día{" "}
            {isOma ? "27 de septiembre" : "20 de octubre"}.
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
            participant.apellido
          ),
          colegio: new School(
            participant.colegio.nombre,
            participant.colegio.sede ? participant.colegio.sede : undefined
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
