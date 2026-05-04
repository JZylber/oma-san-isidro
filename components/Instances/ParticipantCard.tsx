import Image from "next/image";
import { useEffect, useState } from "react";
import { CardType } from "../Table/types";
import { VenueParticipant } from "./Venues";

const ParticipantCard: CardType<VenueParticipant> = ({value}) => {
    const {nivel,participante,colegio,sede} = value;
    const [expanded, setExpanded] = useState(false);
    useEffect(() => {
        setExpanded(false);
    },[value]);
    return(
        <div className="bg-primary-white border-2 border-primary-black rounded-[9px] p-[2rem] flex" onClick={() => setExpanded(!expanded)}>
            <div className="flex flex-col w-0 flex-1 gap-y-[1.6rem]">
                <p className="font-unbounded font-normal text-[2.4rem]">{participante.toString()}</p>
                <div className="flex flex-col gap-y-[.4rem]">
                        <p className="font-montserrat font-normal text-[1.4rem]">Rinde en:</p>
                        <p className="font-montserrat font-medium text-[2.2rem]">{sede}</p>
                    </div>
                {expanded && <div className="flex flex-col gap-y-[3rem]">
                    <div className="flex flex-col gap-y-[.4rem]">
                        <p className="font-montserrat font-normal text-[1.4rem]">Nivel</p>
                        <p className="font-montserrat font-medium text-[2.2rem]">{nivel}</p>
                    </div>
                    <div className="flex flex-col gap-y-[.4rem]">
                        <p className="font-montserrat font-normal text-[1.4rem]">Colegio</p>
                        <p className="font-montserrat font-medium text-[2.2rem]">{colegio.toString()}</p>
                    </div>
                </div>}
            </div>
            <div className={expanded ? "w-[1.6rem] rotate-90" : "w-[1.6rem]"}><Image src="/images/menuArrow.svg" width={14} height={25} alt="" /></div>
        </div>
    )
}

export default ParticipantCard