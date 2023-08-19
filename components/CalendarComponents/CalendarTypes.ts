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