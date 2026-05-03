import { MapItem } from "../../Map";

const participantClasses = "flex font-montserrat font-medium text-[1.5rem] border border-black rounded-[4px] min-w-full [transition:font-weight_0.3s_ease] bg-primary-white hover:font-semibold hover:w-fit hover:z-[1]";
const participantLevelClasses = "py-[.5rem] flex justify-center max-w-[25px] min-w-[25px] border-r border-black";
const participantNameClasses = "py-[.5rem] px-[.75rem] overflow-hidden whitespace-nowrap text-ellipsis";
const selectedClasses = "invert";

const Participant = ({
  participant,
  selected,
}: {
  participant: MapItem;
  selected: boolean;
}) => {
  return (
    <div className={[participantClasses, selected ? selectedClasses : ""].join(" ")}>
      <div className={participantLevelClasses}>{participant.level}</div>
      <div className={participantNameClasses}>
        {participant.school.toString()}
      </div>
    </div>
  );
};

export default Participant;
