import { getDateFromJSON } from "../../lib/aux_functions"

export interface JSONCalendarEvent{
    fecha_inicio: string,
    fecha_fin?: string,
    tipo: string,
    texto: string
}

export interface CalendarEvent{
    fecha_inicio: Date,
    fecha_fin?: Date,
    tipo: string,
    texto: string
}

export const getDatesFromJson = (JSONDates: JSONCalendarEvent []): CalendarEvent [] => {
    return(JSONDates.map((calendarEvent) => {return ({...calendarEvent,fecha_inicio:getDateFromJSON(calendarEvent.fecha_inicio), fecha_fin: calendarEvent.fecha_fin?getDateFromJSON(calendarEvent.fecha_fin):undefined})}))
}