import Image from "next/image";
import {useEffect, useState } from "react";
import { CardType } from "../../Table/types";
import { ProvincialResult } from "../ProvincialTable";

const containerClasses = "bg-primary-white border-2 border-primary-black rounded-[9px] p-[2rem] flex";
const infoClasses = "flex flex-col w-0 flex-[1_1_0] gap-y-[1.6rem]";
const arrowClasses = "w-[1.6rem]";
const rotatedClasses = "rotate-90";
const nameClasses = "font-unbounded font-normal text-[2.4rem]";
const passedClasses = "bg-primary-light-blue border-2 border-primary-black rounded-[9px] py-[.8rem] px-[1.6rem] flex items-center justify-center w-fit font-unbounded font-normal text-[1.2rem]";
const notPassedClasses = "bg-primary-white [&_span::before]:content-['NO_']";
const extraInfoClasses = "flex flex-col gap-y-[3rem]";
const categoryClasses = "flex flex-col gap-y-[.4rem]";
const categoryTitleClasses = "font-montserrat font-normal text-[1.4rem]";
const categoryValueClasses = "font-montserrat font-medium text-[2.2rem]";

const NationalResultCard : CardType<ProvincialResult> = ({value}) => {
    const {participante,colegio,nivel,resultado,aprobado} = value;
    const [expanded, setExpanded] = useState(false);
    useEffect(() => {
        setExpanded(false);
    },[value]);
    return(
        <div className={containerClasses} onClick={() => setExpanded(!expanded)}>
            <div className={infoClasses}>
                <p className={nameClasses}>{participante.toString()}</p>
                <div className={[passedClasses, value.aprobado ? "" : notPassedClasses].join(" ")}>
                    <span>APROBADO</span>
                </div>
                {expanded && <div className={extraInfoClasses}>
                    <div className={categoryClasses}>
                        <p className={categoryTitleClasses}>Colegio</p>
                        <p className={categoryValueClasses}>{colegio.toString()}</p>
                    </div>
                    <div className={categoryClasses}>
                        <p className={categoryTitleClasses}>Nivel</p>
                        <p className={categoryValueClasses}>{nivel}</p>
                    </div>
                    {resultado !== "" &&
                        <div className={categoryClasses}>
                            <p className={categoryTitleClasses}>Premio</p>
                            <p className={categoryValueClasses}>{resultado}</p>
                        </div>
                    }
                </div>}
            </div>
            <div className={[arrowClasses, expanded ? rotatedClasses : ""].join(" ")}><Image src="/images/menuArrow.svg" width={14} height={25} alt="" /></div>
        </div>
    )
}

export default NationalResultCard