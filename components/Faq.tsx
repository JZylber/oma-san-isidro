import FaqItem from './FaqItem'
import styles from './styles/FAQ.module.css'

export default function Faq(){
    return(
    <div className={styles.container}>
        <FaqItem question='¿OMA o Ñandú?' answer='OMA es para 2°, 3°, 4°, 5°, 6° y 7° (colegios técnicos) secundario. Ñandú es para 5° y 6° primario y 1° secundario'></FaqItem>
        <FaqItem question='¿Y las charito?' answer='Las rondas charito no son parte de la OMA. Nosotros no las organizamos'></FaqItem>
    </div>)
}