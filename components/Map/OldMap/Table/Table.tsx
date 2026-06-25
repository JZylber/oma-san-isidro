import { MapItem } from "../../Map";
import Participant from "../ParticipantCard/Participant";
import Special from "../ParticipantCard/Special";

const tableFlexClasses = "flex flex-col-reverse gap-y-[.75rem] w-full max-w-[150px] box-border p-[.5rem] border border-black rounded-[4px] bg-primary-white mx-[.5rem]";
const tableGridClasses = "grid [grid-template-columns:calc(150px_-_1rem)_calc(150px_-_1rem)] grid-rows-2 gap-[.75rem] box-border p-[.5rem] border border-black rounded-[4px] bg-primary-white mx-[.5rem]";

interface TableProps {
  participants: Array<MapItem>;
  isSelected: (item: MapItem) => boolean;
}

const ParticipantTable = ({ participants, isSelected }: TableProps) => {
  return (
    <div className={participants.length === 4 ? tableGridClasses : tableFlexClasses}>
      {participants.map((participant, index) => {
        if (participant.level > 0) {
          return (
            <Participant
              key={index}
              participant={participant}
              selected={isSelected(participant)}
            />
          );
        } else {
          return (
            <Special
              key={index}
              participant={participant}
              selected={isSelected(participant)}
            />
          );
        }
      })}
    </div>
  );
};

export default ParticipantTable;
