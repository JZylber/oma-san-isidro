import { ReactMarkdown } from "react-markdown/lib/react-markdown"
import {CalendarEvent} from "../CalendarTypes";

interface MarkdownCalendarProps{
    year: number,
    events: {name: string, events: CalendarEvent []}[]
}

const MarkdownCalendar = ({year,events}: MarkdownCalendarProps) => {
    let markdown = `# Calendario ${year}`
    events.forEach((month) => {
        if(month.events.length > 0){
            let newMonth = `\n## ${month.name}`
            month.events.forEach((event) => {
                let newEvent = `\n- *${event.fecha_inicio.getDate()}${event.fecha_fin?"-"+event.fecha_fin.getDate():""}* **(${event.tipo})** ${event.texto}`;
                newMonth += newEvent;
            })
            markdown += newMonth;
        }
    })
    return(
        <ReactMarkdown>
            {markdown}
        </ReactMarkdown>
    )
}

export default MarkdownCalendar