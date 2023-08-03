import { MapItem } from "../Map";
import Participant from "../ParticipantCard/Participant";
import styles from "./Table.module.scss";

interface TableProps {
    participants: Array<MapItem>;
}

const ParticipantTable = ({participants}:TableProps) => {
    return(
        <div className={styles[`table${participants.length}`]}>
            {participants.map((participant) => {
                return(<Participant participant={participant}/>)
            })}
        </div>
    )}

export default ParticipantTable;