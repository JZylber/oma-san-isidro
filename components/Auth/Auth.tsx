import styles from "./Auth.module.scss";
import NewsArrow from "../../img/newsArrow.svg";
import { AuthItem } from "./AuthItem";
import { Button } from "../buttons/Button";

const specs = [
  {
    important: "Solo autorizaciones oficiales de OMA",
    text: "serán aceptadas. Tampoco se aceptarán autorizaciones enviadas por fax o fotocopia",
  },
  {
    important: "La fecha y lugar de entrega de autorizaciones",
    text: "informará una vez que se sepa la cantidad de alumnos inscriptos de cada colegio.",
  },
  {
    important: "No podrá rendir la prueba",
    text: "el alumno que no presente dicha autorizaciones firmada por el padre, madre, tutor o encargado y con la firma y sello del colegio.",
  },
  {
    important: "No se aceptarán autorizaciones con fechas corregidas",
    text: "lo tanto deberán presentar la actualizada (2022) que puedan bajar de esta página en Autorización.",
  },
];

export const Authorization = () => {
  return (
    <div className={styles.main}>
      <h1>Autorización</h1>
      <div className={styles.container}>
        <h3>Tener en cuenta</h3>
        <div className={styles.items}>
          {specs.map((spec, i) => {
            return <AuthItem key={i} {...spec} />;
          })}
        </div>
      </div>
      <div className={styles.button}>
        <Button content="Descargar autorización">
          <NewsArrow className={styles.arrow} />
        </Button>
        <p>
          Al presionar este botón, un PDF con la autorización correspondiente
          debería descargarse automáticamente, si esto no ocurre inténtelo
          nuevamente luego de unos segundos.
        </p>
      </div>
    </div>
  );
};
