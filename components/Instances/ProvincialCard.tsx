import styles from "./Card.module.scss";
import {participantName, schoolName } from "./Venues";
import { CardType } from "../Table/types";
import { ProvincialParticipant } from "./Provincial";

const ProvincialParticipantCard: CardType<ProvincialParticipant> = ({value}) => {
    const {nivel,nombre,apellido,colegio} = value;
    return(
        <div className={styles.container}>
            <div className={styles.info}>
                <p className={styles.name}>{participantName(nombre,apellido)}</p>
                <div className={styles.category}>
                    <p className={styles.title}>Colegio</p>
                    <p className={styles.value}>{schoolName(colegio)}</p>
                </div>
            </div>
        </div>
    )
}

export default ProvincialParticipantCard