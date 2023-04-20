import styles from "./Auth.module.scss";
import NewsArrow from "../../public/images/newsArrow.svg";
import Warning from "../../public/images/warning.svg";
import { AuthItem } from "./AuthItem";
import { Button } from "../buttons/Button";
import Link from "next/link";
import Image from "next/image";

export const Authorization = ({ type }: { type: string }) => {
  const specs = [
    {
      important: "Solo autorizaciones oficiales de OMA",
      text: "serán aceptadas. Deben estar completas y con la firma ORIGINAL. Tampoco se aceptarán autorizaciones enviadas por fax o fotocopia",
    },
    {
      important: "No podrá rendir la prueba",
      text: "el alumno que no presente dicha autorizaciones firmada por el padre, madre, tutor o encargado y con la firma y sello del colegio.",
    },
    {
      important: "La fecha y lugar de entrega de autorizaciones",
      text: <>de la siguiente instancia se encuentran en <Link href={type == "oma"?"/oma/sedes":"/nandu/sedes"}>sedes</Link><div className={styles.icon}><Image src="/images/pageLinkIcon.svg" fill={true} alt=""/></div>.</>,
    },
    {
      important: "No se aceptarán autorizaciones con fechas corregidas",
      text: "lo tanto deberán presentar la actualizada que puedan bajar aquí.",
    },
  ];
  const handleClick = () => {
    const link = document.createElement("a");
    link.href = `/files/autorizacion-${type}.pdf`;
    link.target = `_blank`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <div className={styles.type}>{type == "oma"?"Oma":"Ñandú"}</div>
      <h1 className={styles.main_title}>Autorización</h1>
      <div className={styles.container}>
        <div className={styles.title}>
          <h2>Tener en cuenta</h2>
          <Warning className={styles.warning} />
        </div>
        <ul className={styles.items}>
          {specs.map((spec, i) => {
            return <AuthItem key={i} {...spec} />;
          })}
        </ul>
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
    </>
  );
};
