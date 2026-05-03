import Image from "next/image";

const level_data : {[key: string]:string[]} = {
    nandu: ["5to primario","6to primario","1ero secundario"],
    oma: ["2do y 3ero secundario","4to y 5to secundario","6to y 7mo (colegios técnicos) secundario"]
}

const Levels = ({category}:{category : string}) => {
    const data = level_data[category];
    return(
        <ul>
            {data.map((level,index) => {return(
                <li key={index} className="flex items-center mb-[1.3rem] last:mb-0 max-tablet:flex-col max-tablet:gap-y-[.8rem] tablet:max-desktop:gap-x-[2rem] desktop:gap-x-[2.4rem]">
                    <div className="bg-primary-light-blue border-2 border-primary-black rounded-[9px] flex justify-center font-unbounded font-medium max-tablet:p-[.4rem] max-tablet:w-[7.2rem] max-tablet:text-[1.5rem] tablet:max-desktop:p-[.4rem] tablet:max-desktop:w-[7.2rem] tablet:max-desktop:text-[1.4rem] desktop:p-[.6rem] desktop:w-[10.4rem] desktop:text-[1.6rem]">{index + 1}</div>
                    <div className="max-tablet:hidden tablet:max-desktop:w-[64px] desktop:w-[96px]"><Image src="/images/LongArrow.svg" width={98} height={24} alt="" /></div>
                    <span className="font-montserrat font-normal max-tablet:text-center max-desktop:text-[2rem] desktop:text-[2.4rem]">{level}</span>
                </li>
            )})}
        </ul>
    )
}

export default Levels