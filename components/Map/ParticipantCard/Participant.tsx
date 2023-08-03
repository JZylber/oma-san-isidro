import { MapItem } from "../Map";
import styles from "./Participant.module.scss";

const Participant = ({participant,selected}: {participant: MapItem,selected: boolean}) => {
    return(
        <div className={[styles.participant,selected?styles.selected:""].join(" ")}>
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
