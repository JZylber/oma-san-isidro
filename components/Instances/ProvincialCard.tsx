import { CardType } from "../Table/types";
import { ProvincialParticipant } from "./Provincial";

const ProvincialParticipantCard: CardType<ProvincialParticipant> = ({value}) => {
    const {nivel,participante,colegio} = value;
    return(
        <div className="bg-primary-white border-2 border-primary-black rounded-[9px] p-[2rem] flex">
            <div className="flex flex-col w-0 flex-1 gap-y-[1.6rem]">
                <p className="font-unbounded font-normal text-[2.4rem]">{participante.toString()}</p>
                <div className="flex flex-col gap-y-[.4rem]">
                    <p className="font-montserrat font-normal text-[1.4rem]">Colegio</p>
                    <p className="font-montserrat font-medium text-[2.2rem]">{colegio.toString()}</p>
                </div>
            </div>
            <div className="flex flex-col gap-y-[.4rem]">
                    <p className="font-montserrat font-normal text-[1.4rem]">Nivel</p>
                    <p className="font-montserrat font-medium text-[2.2rem] text-center">{nivel}</p>
            </div>
        </div>
    )
}

export default ProvincialParticipantCard