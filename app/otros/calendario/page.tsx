import { Metadata } from "next"
import CalendarPage from "./calendario"
import { getCalendarEvents } from "../../../lib/app-router-db-calls"

export const metadata: Metadata = {
    title: 'Calendario',
    description: 'Calendario anual de todas las competencias matemáticas del país',
  }

const Calendar = async () => {
    const year = new Date().getFullYear()
    const available = await getCalendarEvents(year)
    const events = available.map((event) => {return{...event,fecha_fin:event.fecha_fin?event.fecha_fin:undefined}})
    return <CalendarPage events={events} year={year}/>
}

export default Calendar