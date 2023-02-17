import styles from "./Auth.module.scss";
import NewsArrow from "../../img/newsArrow.svg";
import Warning from "../../img/warning.svg";
import { AuthItem } from "./AuthItem";
import { Button } from "../buttons/Button";
import Footer from "../Footer/Footer";

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
    text: "lo tanto deberán presentar la actualizada que puedan bajar aquí.",
  },
];

export const Authorization = ({ type }: { type: string }) => {
  const handleClick = () => {
    const link = document.createElement("a");
    link.href = `/files/autorizacion-${type}.pdf`;
    link.target = `_blank`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={styles.main}>
      <div className={styles.type}>{type == "oma"?"Oma":"Ñandú"}</div>
      <h1>Autorización</h1>
      <div className={styles.container}>
        <div className={styles.title}>
          <h3>Tener en cuenta</h3>
          <Warning className={styles.warning} />
        </div>
        <div className={styles.items}>
          {specs.map((spec, i) => {
            return <AuthItem key={i} {...spec} />;
          })}
        </div>
      </div>
      <div className={styles.button}>
        <Button content="Descargar autorización" onClick={handleClick}>
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
