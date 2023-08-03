import { MapItem } from "../Map";
import styles from "./Participant.module.scss";

const Participant = ({participant}: {participant: MapItem}) => {
    return(
        <div className={styles.participant}>
            <div className={styles.participantLevel}>
                {participant.level}
            </div>
            <div className={styles.participantName}>
                {participant.school.toString()}
            </div>
        </div>
    )
}

export default Participant;
