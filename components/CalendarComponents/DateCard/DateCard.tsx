import { CalendarEvent } from "../CalendarTypes";

const DateCard = ({calendarEvent}:{calendarEvent : CalendarEvent}) => {
    const months = ["ENE","FEB","MAR","ABR","MAY","JUN","JUL","AGO","SEP","OCT","NOV","DIC"]
    const getEndDate = (cevent : CalendarEvent) => {
        if(cevent.fecha_fin){
            return(` - ${cevent.fecha_fin.getUTCDate()} ${months[cevent.fecha_fin.getUTCMonth()]}`)
        } else {
            return("")
        }
    }
    return(
        <div className="border-2 border-primary-black rounded-[9px] flex flex-col items-start flex-wrap bg-primary-light-blue box-border max-tablet:p-[1.6rem] max-tablet:mt-[2.4rem] max-tablet:mb-[2.4rem] max-tablet:min-h-[20.8rem] tablet:max-desktop:col-span-4 tablet:max-desktop:min-h-[24rem] tablet:max-desktop:py-[2.4rem] tablet:max-desktop:pl-[calc(4*var(--tablet-x-spacing))] tablet:max-desktop:pr-[calc(4*var(--tablet-x-spacing))] desktop:min-h-[27.6rem] desktop:py-[3.2rem] desktop:pl-[calc(3*var(--desktop-x-spacing))] desktop:pr-[calc(3*var(--desktop-x-spacing))]">
            <p className="hyphens-auto break-words max-w-full font-unbounded max-tablet:font-normal max-tablet:text-[2.4rem] tablet:max-desktop:font-medium tablet:max-desktop:text-[2.2rem] tablet:max-desktop:leading-[3rem] desktop:font-medium desktop:text-[3.4rem] desktop:leading-[3.8rem] desktop:flex-grow">{calendarEvent.texto}</p>
            <span className="font-montserrat font-normal py-[1.6rem] max-tablet:text-[1.6rem] tablet:max-desktop:text-tablet-reading desktop:text-desktop-reading">{`${calendarEvent.fecha_inicio.getUTCDate()} ${months[calendarEvent.fecha_inicio.getUTCMonth()]}${getEndDate(calendarEvent)}`}</span>
            <div className="flex-grow flex flex-col-reverse">
                <div className="font-unbounded font-medium bg-primary-white border-2 border-primary-black rounded-[9px] text-[1.2rem] max-tablet:py-[.4rem] max-tablet:px-[.8rem] tablet:max-desktop:py-[.8rem] tablet:max-desktop:px-[2.4rem] desktop:py-[.8rem] desktop:px-[3rem]">{calendarEvent.tipo}</div>
            </div>
        </div>
    )
}

export default DateCard
