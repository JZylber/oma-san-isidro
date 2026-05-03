import { CalendarEvent } from "../CalendarTypes";
import DateCard from "../DateCard/DateCard";

interface MonthEventsProps {
    name : string,
    events: CalendarEvent[]
}

const MonthEvents = ({name,events}:MonthEventsProps) => {
    if(events.length > 0){
        return(
            <div className="pt-[5.6rem] tablet:max-desktop:pb-[6.4rem] desktop:pb-[8.6rem] [&:not(:last-child)]:border-b-2 [&:not(:last-child)]:border-b-primary-black">
                <h2 className="font-unbounded font-light tablet:max-desktop:text-[2.8rem] desktop:text-[3.4rem]">{name}</h2>
                <div className="mt-[3.2rem] grid tablet:max-desktop:grid-cols-8 tablet:max-desktop:[column-gap:calc(2.5*var(--tablet-x-spacing))] tablet:max-desktop:gap-y-[2.4rem] desktop:grid-cols-3 desktop:gap-x-[2rem] desktop:gap-y-[5rem]">
                    {events.map((event,idx) => <DateCard key={idx} calendarEvent={event}/>)}
                </div>
            </div>
        )
    } else {
        return(
            <></>
        )
    }
}

export default MonthEvents
