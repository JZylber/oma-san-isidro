import Link from "next/link";
import { CalendarEvent } from "../CalendarComponents/CalendarTypes";
import AllDatesBanner from "../CalendarComponents/DateBanner/NextDatesBanner";
import Levels from "./Levels";
import Image from "next/image";

interface HomeProps {
    competition: string
    dates: Array<CalendarEvent>
}

const Home = ({competition,dates}:HomeProps) => {
    return(
        <>
        <h1 className="font-unbounded font-semibold max-tablet:text-[3rem] max-tablet:[margin-top:calc(4*var(--mobile-spacing))] max-tablet:[margin-bottom:calc(2.5*var(--mobile-spacing))] tablet:text-[4.8rem] tablet:leading-[2.5]">{competition}</h1>
        <AllDatesBanner dates={dates} category={competition}/>
        <section className="max-desktop:mt-[2.4rem] desktop:mt-[4.8rem]">
            <h2 className="font-unbounded font-medium mb-[1.2rem] max-tablet:text-center max-desktop:text-[2.4rem] desktop:text-[3.4rem]">Próxima instancia</h2>
            <div className="font-montserrat font-normal max-desktop:text-[1.5rem] desktop:text-[2rem]">Para información de la próxima instancia como los puntos de entrega de autorizaciones, o los colegios asignados para rendir la prueba, podés ir a la sección <Link href={`/${competition === "OMA"?"oma":"nandu"}/instancias`} className="text-primary-black font-montserrat font-semibold">instancias</Link><div className="relative inline-block ml-[.4rem] w-[17px] h-[17px]"><Image src="/images/pageLinkIcon.svg" fill={true} alt=""/></div>.</div>
        </section>
        <section className="max-desktop:mt-[2.4rem] desktop:mt-[4.8rem]">
            <h2 className="font-unbounded font-medium mb-[1.2rem] max-tablet:text-center max-desktop:text-[2.4rem] desktop:text-[3.4rem]">Niveles</h2>
            <Levels category={competition === "OMA"?"oma":"nandu"}/>
        </section>
        <section className="max-desktop:mt-[2.4rem] desktop:mt-[4.8rem]">
        </section>
        </>
    )
}

export default Home
