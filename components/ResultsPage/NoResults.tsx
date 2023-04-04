import styles from "./NoResults.module.scss"
import Warning from "../../public/images/warning.svg"

const NoResults = () => {
    return(
        <div className={styles.container}>
            <div className={styles.icon}>
                <Warning/>
            </div>
            <div className={styles.message}>
                <p className={styles.message_title}>La consulta no arrojó ningún resultado :(</p>
                <span className={styles.message_body_container}>
                    <span className={styles.message_body}>No hay resultados para los filtros seleccionados.</span>
                    <span className={styles.message_body}>Cambie los filtros e intente nuevamente.</span>
                </span>
            </div>
        </div>
    )
}

export default NoResults