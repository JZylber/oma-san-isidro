import { Metadata } from "next"
import { getCalendarEvents } from "../../../server/app-router-db-calls"
import NanduHome from "./home";

export const metadata : Metadata = {
    title: 'Ñandú',
    description: 'Paǵina principal de Ñandú',
}

export default async function Nandu() {
    const events = await getCalendarEvents(new Date().getFullYear(), "Ñandú");
    const dates = events.map((event) => {return{...event,fecha_fin: event.fecha_fin?event.fecha_fin:undefined}});
    return <NanduHome events={dates}/>
}