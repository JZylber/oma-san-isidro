import styles from "./Card.module.scss";
import { CardType } from "../Table/types";
import { ProvincialParticipant } from "./Provincial";

const ProvincialParticipantCard: CardType<ProvincialParticipant> = ({value}) => {
    const {nivel,participante,colegio} = value;
    return(
        <div className={styles.container}>
            <div className={styles.info}>
                <p className={styles.name}>{participante.toString()}</p>
                <div className={styles.category}>
                    <p className={styles.title}>Colegio</p>
                    <p className={styles.value}>{colegio.toString()}</p>
                </div>
            </div>
            <div className={styles.category}>
                    <p className={styles.title}>Nivel</p>
                    <p className={[styles.value,styles.value_center].join(" ")}>{nivel}</p>
            </div>
        </div>
    )
}

export default ProvincialParticipantCard