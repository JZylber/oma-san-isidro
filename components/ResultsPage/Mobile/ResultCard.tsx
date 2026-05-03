import { Result, TestQueryResults } from "../resultsTypes";
import Image from "next/image";
import {useEffect, useState } from "react";
import { CardType } from "../../Table/types";

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
const resultsClasses = "flex gap-x-[2.8rem]";
const totalContainerClasses = "flex w-[0px] flex-[1_1_0] justify-end";

const ResultCard : CardType<Result> = ({value}) => {
    const [expanded, setExpanded] = useState(false);
    useEffect(() => {
        setExpanded(false);
    },[value]);
    const hasPoints = value.presente && !value.aclaracion;
    return(
        <div className={containerClasses} onClick={() => setExpanded(!expanded)}>
            <div className={infoClasses}>
                <p className={nameClasses}>{value.participante.toString()}</p>
                <div className={[passedClasses, value.aprobado ? "" : notPassedClasses].join(" ")}>
                    <span>APROBADO</span>
                </div>
                {expanded && <div className={extraInfoClasses}>
                    <div className={categoryClasses}>
                        <p className={categoryTitleClasses}>Colegio</p>
                        <p className={categoryValueClasses}>{value.colegio.toString()}</p>
                    </div>
                    <div className={categoryClasses}>
                        <p className={categoryTitleClasses}>Nivel</p>
                        <p className={categoryValueClasses}>{value.nivel}</p>
                    </div>
                    {value.cantidad_problemas > 0 && hasPoints &&
                    <div className={resultsClasses}>
                        {value.resultados.problems.map((point,index) =>{
                            return(<div key={index} className={categoryClasses}>
                                <p className={categoryTitleClasses}>P{index + 1}</p>
                                <p className={categoryValueClasses}>{point.toString()}</p>
                            </div>)
                        })}
                        <div className={totalContainerClasses}>
                            <div className={categoryClasses}>
                                <p className={categoryTitleClasses}>Total</p>
                                <p className={categoryValueClasses}>{value.resultados.total}</p>
                            </div>
                        </div>
                    </div>}
                    {!hasPoints && <div className={categoryClasses}><p className={categoryValueClasses}>{value.aclaracion?value.aclaracion.toUpperCase():"AUSENTE"}</p></div>}
                </div>}
            </div>
            <div className={[arrowClasses, expanded ? rotatedClasses : ""].join(" ")}><Image src="/images/menuArrow.svg" width={14} height={25} alt="" /></div>
        </div>
    )
}

export default ResultCard