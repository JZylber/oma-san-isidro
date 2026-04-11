"use client";
import { CalendarEvent } from "../../../../components/CalendarComponents/CalendarTypes";
import styles from "./Geometria.module.scss";
import BankInformation from "../../../../components/Inscription/BankInformation";
import AllDatesBanner from "../../../../components/CalendarComponents/DateBanner/NextDatesBanner";
import Warning from "../../../../components/Warning/Warning";
import Pending from "../../../../components/Pending/pending";

interface GeometryPageProps {
  events: Array<CalendarEvent>;
  year: number;
}

const GeometryPage = ({ events }: GeometryPageProps) => {
  return (
    <>
      <h1 className={styles.title}>Torneo de Geometría e Imaginación</h1>
      <AllDatesBanner dates={events} category="Geometría" />
      <section className={styles.section}>
        <h2 className={styles.section_title}>
          Festival de Problemas: Primera Ronda TGI
        </h2>
        <div className={styles.section_content}>
          <p>
            El próximo <span className={styles.bold}>sábado 30 de mayo</span>,
            se celebra la primera instancia del Torneo de Geometría e
            Imaginación (TGI). Este evento está diseñado como un espacio de
            exploración y creatividad, donde el uso de herramientas como
            GeoGebra y la visualización geométrica son los protagonistas.
          </p>
          <p>
            Es importante destacar que los alumnos pueden participar en las
            distintas rondas de este torneo de forma{" "}
            <span className={styles.bold}>independiente</span>. No es requisito
            haber participado en instancias previas ni existe la obligación de
            continuar en las siguientes; cada encuentro es una oportunidad única
            para disfrutar de la matemática.
          </p>
          <ul>
            <li>
              <span className={[styles.level, styles.bold].join(" ")}>
                Nivel:
              </span>{" "}
              Los participantes podrán elegir libremente los problemas que
              deseen desarrollar, más allá del nivel sugerido.
            </li>
            <li>
              <span className={[styles.level, styles.bold].join(" ")}>
                Ambiente:
              </span>{" "}
              El festival busca fomentar la sociabilización entre alumnos y
              docentes, cerrando la jornada con juegos matemáticos y actividades
              lúdicas.
            </li>
            <li>
              <span className={[styles.level, styles.bold].join(" ")}>
                Dinámica:
              </span>{" "}
              Se trabajará durante todo el día en dos bloques (mañana y tarde)
              con un espacio para el almuerzo y la discusión de soluciones.
            </li>
          </ul>
        </div>
      </section>
      <section className={styles.section}>
        <h3 className={styles.section_title}>Sede y Logística</h3>
        <div className={styles.section_content}>
          <p>
            Para la región de{" "}
            <span className={styles.bold}>
              AMBA y Provincia de Buenos Aires
            </span>
            , el festival se centralizará en la siguiente sede:
          </p>
          <ul>
            <li>
              <span className={[styles.level, styles.bold].join(" ")}>
                Lugar:
              </span>{" "}
              Colegio Belgrano, Localidad de Lomas de Zamora (incluye a las
              zonas de La Plata y Pilar).
            </li>
            <li>
              <span className={[styles.level, styles.bold].join(" ")}>
                Costo:
              </span>{" "}
              Los participantes de las rondas de TGI tienen cubierta la
              inscripción a las dos primeras instancias con el pago de los
              certámenes de OMA/Ñandú. Los secretarios responsables coordinarán
              localmente el costo de las colaciones y el almuerzo.
            </li>
          </ul>
        </div>
      </section>
      <section className={styles.section}>
        <h3 className={styles.section_title}>Inscripción</h3>
        <div className={styles.section_content}>
          <p>
            Contactarse vía correo electrónico con la organizadora regional{" "}
            <span className={styles.bold}>Claudia Iravedra</span> a la
            dirección:
            <a href="mailto:omaclaudia@hotmail.com">omaclaudia@hotmail.com</a>.
          </p>
          <p>
            ¡Recuerden que el costo está cubierto por la inscripción de
            OMA/Ñandú!
          </p>
        </div>
      </section>

      {/*<section className={styles.section}>
                    <h3 className={styles.section_title}>Inscripción</h3>
                    <div className={styles.section_content}>
                        <ol>
                            <li>Abonar $3000 por participante. Se debe realizar un solo depósito por la totalidad de alumnos inscriptos. <span className={styles.bold}>Los participantes del torneo de geometría no deben abonar luego la inscripción a OMA/Ñandú.</span></li>
                            <BankInformation/>
                            <li>Completar una planilla con los datos de los alumnos. Deben consignar apellido y nombre, DNI, nivel y año que cursan. Esta planilla deben enviarla a Roxana Magistrali: <a href="mailto:roxana.magistrali@gmail.com">roxana.magistrali@gmail.com</a> antes del 12 de abril junto con el comprobante de pago escaneado.</li>
                            <li>El día de la primera instancia, llevar el comprobante de pago para poder entregarles un recibo</li>
                        </ol>
                    </div>
                </section>
                <section className={styles.section}>
                    <h3 className={styles.section_title}>Información General</h3>
                    <div className={styles.section_content}>
                        <p>Les proponemos como siempre, resolver problemas de Geometría desde una mirada creativa, libre y que permita desarrollar en los alumnos la visualización del problema con diferentes herramientas.</p>
                        <p>Como es característico de este TORNEO las rondas son presenciales y no son eliminatorias, pueden incorporarse alumnos (inscriptos en las actividades de OMA), en cualquiera de las tres rondas. De no haberse inscripto en las actividades de OMA, deberá abonar cuando participe del Torneo la correspondiente inscripción.</p>
                        <p>Les recordamos también que en este TORNEO, el alumno es libre de llevar a la prueba escrita el material que prefiera y crea necesario para resolver los problemas. Siempre les recomendamos utilizar las NOTAS DE GEOMETRÍA que publica la OMA para entrenamiento y material de consulta en las pruebas.</p>
                        <p>En <a href="https://www.oma.org.ar/problemas/index.php/problemas-de-geometria">https://www.oma.org.ar/problemas/index.php/problemas-de-geometria</a> , están los problemas de entrenamiento del 2022 y 2023, (sus respectivas soluciones, como siempre, están en la quinta temporada de Las Leñitas Geométricas), que pueden ser de mucha ayuda.</p>
                        <p>Los alumnos podrán utilizar en las pruebas el GeoGebra en sus computadoras, Tablet o teléfonos, en el modo examen.</p>
                    </div>
                </section>
                <section className={styles.section}>
                    <h3 className={styles.section_title}>Niveles</h3>
                    <div className={styles.section_content}>
                        <ul>
                            <li><span className={[styles.level,styles.bold].join(" ")}>Nivel Inicial:</span><span className={styles.years}> 4° y 5° año de escolaridad</span></li>
                            <li><span className={[styles.level,styles.bold].join(" ")}>Primer Nivel:</span><span className={styles.years}> 6° y 7° año de escolaridad</span></li>
                            <li><span className={[styles.level,styles.bold].join(" ")}>Segundo Nivel:</span><span className={styles.years}> 8° y 9° año de escolaridad</span></li>
                            <li><span className={[styles.level,styles.bold].join(" ")}>Tercer Nivel:</span><span className={styles.years}> 10°, 11° y 12° año de escolaridad</span></li>
                        </ul>
                    </div>
                </section>
                <Warning>
                    <p className={styles.warning_box_content}>Como la Primera Ronda del Torneo Geometría e Imaginación es la primera actividad/certamen que participan los alumnos en 2023, se deberán abonar los 3000 pesos por alumno de inscripción anual en el momento de inscribirse a esta. Si esto ocurre, NO se deben abonar luego las inscripciones para OMA o Ñandú.</p>
                </Warning>
                <section className={styles.section}>
                    <h3 className={styles.section_title}>Consultas</h3>
                    <div className={styles.section_content}>
                        <p>Para más información, escribir a <a href="mailto:roxana.magistrali@gmail.com">roxana.magistrali@gmail.com</a></p>
                    </div>
                </section>*/}
    </>
  );
};

export default GeometryPage;
