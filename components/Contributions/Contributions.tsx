import Image from "next/image";
import styles from "./Contributions.module.scss";

const Contributions = () => {
    return(
    <div className={styles.contributionContainer}>
        <div className={styles.contributions_icon}><Image src="/images/donateIcon.svg" fill={true} alt=""/></div>
        <div>
        <a href="https://oma.org.ar/donaciones/" className={styles.title}>
                        <div className={styles.title_image}><Image src="/images/pageLinkIcon.svg" fill={true} alt=""/></div>
                        <span>Hacé tu aporte acá</span>
        </a>
        <p className={styles.text}>OMA es principalmente financiada por sus participantes. Para soportar los crecientes costos de funcionamiento, agredeceríamos muchísimo si pueden contribuir con lo que puedan.</p>
        </div>
    </div>
    );
}

export default Contributions;