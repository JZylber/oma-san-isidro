import Image from "next/image";
import { CardType } from "../../Table/types";
import { ProblemRow, capitalize, displayLevel } from "../problemsTypes";

const containerClasses = "bg-primary-white border-2 border-primary-black rounded-[9px] p-[2rem] flex justify-between items-center cursor-pointer";
const infoClasses = "flex flex-col gap-y-[1.6rem]";
const instanceClasses = "font-unbounded font-normal text-[2.4rem]";
const fieldsClasses = "flex gap-x-[2.8rem]";
const categoryClasses = "flex flex-col gap-y-[.4rem]";
const categoryTitleClasses = "font-montserrat font-normal text-[1.4rem]";
const categoryValueClasses = "font-montserrat font-medium text-[2.2rem]";

const ProblemCard: CardType<ProblemRow> = ({ value }) => {
  return (
    <a href={value.link} target="_blank" rel="noreferrer" className={containerClasses}>
      <div className={infoClasses}>
        <p className={instanceClasses}>{capitalize(value.instancia)}</p>
        <div className={fieldsClasses}>
          <div className={categoryClasses}>
            <p className={categoryTitleClasses}>Año</p>
            <p className={categoryValueClasses}>{value.año}</p>
          </div>
          <div className={categoryClasses}>
            <p className={categoryTitleClasses}>Nivel</p>
            <p className={categoryValueClasses}>{displayLevel(value.nivel)}</p>
          </div>
        </div>
      </div>
      <Image src="/images/menuArrow.svg" width={14} height={22} alt="" />
    </a>
  );
};

export default ProblemCard;
