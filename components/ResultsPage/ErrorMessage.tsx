import styles from "./ErrorMessage.module.scss"
import Warning from "../../public/images/warning.svg"

interface ErrorMessageText{
    title: string,
    paragraphs: string[]
} 

const ErrorTexts : {[key: number]: ErrorMessageText} = {
    400:{   title: "La consulta no arrojó ningún resultado", 
            paragraphs: ["No hay resultados para los filtros seleccionados.", "Cambie los filtros e intente nuevamente."]
        },
    503:{   title: "Error de conexión",
            paragraphs: ["No se pudo establecer una conexión con el servidor.", "Intente nuevamente más tarde."]},
    600:{   title: "Error inesperado",
            paragraphs: ["Ha ocurrido un error inesperado.", "Intente nuevamente más tarde."]}
}

const ErrorMessage = ({status = 400}:{status?: number}) => {
    const {title,paragraphs} = ErrorTexts[status]
    return(
        <div className={styles.container}>
            <div className={styles.icon}>
                <Warning/>
            </div>
            <div className={styles.message}>
                <p className={styles.message_title}>{title}</p>
                <span className={styles.message_body_container}>
                    {paragraphs.map((paragraph,index) => <span key={index} className={styles.message_body}>{paragraph}</span>)}
                </span>
            </div>
        </div>
    )
}

export default ErrorMessage