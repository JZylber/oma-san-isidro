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

export const getDateFromJSON = (JSONDate : string) => {
    let date = JSONDate.split('T')[0];
    let [year,month,day] = date.split('-').map((n) => Number(n));
    month = month - 1;
    return(new Date(year,month,day))
}

export const getDatesFromJson = (JSONDates: JSONCalendarEvent []): CalendarEvent [] => {
    return(JSONDates.map((calendarEvent) => {return ({...calendarEvent,fecha_inicio:getDateFromJSON(calendarEvent.fecha_inicio), fecha_fin: calendarEvent.fecha_fin?getDateFromJSON(calendarEvent.fecha_fin):undefined})}))
}