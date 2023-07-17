'use client'
import styles from "./Home.module.scss";
 
export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <div className={styles.error_container}>
      <h1 className={styles.error_title}>UPS...</h1>
      <h2 className={styles.error_subtitle}>¡Hubo un error!</h2>
      <p className={styles.error_text}>Pedimos disculpas por las molestias ocasionadas, somos un grupo de voluntarios y tenemos tiempo limitado. El error fue enviado a nuestro equipo y lo vamos a arreglar en cuanto podamos.</p>
    </div>
  )
}