import { MapItem } from "../Map";
import Participant from "../ParticipantCard/Participant";
import styles from "./Table.module.scss";

interface TableProps {
    participants: Array<MapItem>;
    isSelected: (item:MapItem) => boolean;
}

const ParticipantTable = ({participants,isSelected}:TableProps) => {
    return(
        <div className={styles[`table${participants.length}`]}>
            {participants.map((participant) => {
                return(<Participant participant={participant} selected={isSelected(participant)}/>)
            })}
        </div>
    )}

export default ParticipantTable;