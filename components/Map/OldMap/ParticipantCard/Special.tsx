import { MapItem } from "../../Map";

const participantClasses = "flex font-montserrat font-medium text-[1.5rem] border border-black rounded-[4px] min-w-full [transition:font-weight_0.3s_ease] bg-primary-white hover:font-semibold hover:w-fit hover:z-[1]";
const participantSpecialClasses = "py-[.5rem] px-[.75rem] w-full flex justify-center overflow-hidden whitespace-nowrap text-ellipsis";
const selectedClasses = "invert";

const Special = ({
  participant,
  selected,
}: {
  participant: MapItem;
  selected: boolean;
}) => {
  return (
    <div className={[participantClasses, selected ? selectedClasses : ""].join(" ")}>
      <div className={participantSpecialClasses}>
        <span>{participant.school.toString()}</span>
      </div>
    </div>
  );
};

export default Special;
