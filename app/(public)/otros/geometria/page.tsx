import { Metadata } from "next";
import { getCalendarEvents } from "../../../lib/app-router-db-calls";
import GeometryPage from "./geometria";

export const metadata: Metadata = {
    title: 'Geometría e Imaginación',
    description: 'Información general del torneo de geometría e imaginación',
}

export default async function Geometry() {
    const year = new Date().getFullYear()
    const available = await getCalendarEvents(year,"Geometría")
    const events = available.map((event) => {return{...event,fecha_fin:event.fecha_fin?event.fecha_fin:undefined}});
    return <GeometryPage events={events} year={year}/>
}