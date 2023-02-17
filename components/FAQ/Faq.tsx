import FaqItem from './FaqItem'
import styles from './FAQ.module.scss'

export default function Faq(){
    return(
    <div className={styles.container}>
        <FaqItem question='¿Qué son las Olimpíadas?' answer='Es una competencia en la que se resuelven problemas de matemática usando mucho sentido común y un poco de la matemática escolar elemental.'></FaqItem>
        <FaqItem question='¿OMA o Ñandú?' answer='OMA es para 2°, 3°, 4°, 5°, 6° y 7° (colegios técnicos) secundario. Ñandú es para 5° y 6° primario y 1° secundario'></FaqItem>
        <FaqItem question='¿Cómo funciona?' answer='Son cinco rondas (Escolar, Intercolegial, Zonal, Regional y Nacional). Para pasar de una a otra tenés que hacer bien, por lo menos, dos de los tres problemas que te dan. También podes viajar a las Olimpíadas Provinciales si cumplis con los requisitos.'></FaqItem>
        {/*<FaqItem question='¿Es obligatoria?' answer='¡No! La participación es voluntaria y se puede hacer a través de tu colegio o individualmente'></FaqItem>*/}
        <FaqItem question='¿Y las charito?' answer='Las rondas charito no son parte de la OMA. Nosotros no las organizamos'></FaqItem>
    </div>)
}