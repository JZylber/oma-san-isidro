import { MapItem } from "../../Map";
import styles from "./Participant.module.scss";

const Special = ({
  participant,
  selected,
}: {
  participant: MapItem;
  selected: boolean;
}) => {
  return (
    <div
      className={[styles.participant, selected ? styles.selected : ""].join(
        " "
      )}
    >
      <div className={styles.participantSpecial}>
        <span>{participant.school.toString()}</span>
      </div>
    </div>
  );
};

export default Special;
