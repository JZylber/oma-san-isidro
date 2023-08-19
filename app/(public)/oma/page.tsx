import { Metadata } from "next"
import { getCalendarEvents } from "../../../server/app-router-db-calls"
import OMAHome from "./home";

export const metadata : Metadata = {
    title: 'OMA',
    description: 'Paǵina principal de OMA',
}

export default async function Oma() {
    const events = await getCalendarEvents(new Date().getFullYear(), "OMA");
    const dates = events.map((event) => {return{...event,fecha_fin: event.fecha_fin?event.fecha_fin:undefined}});
    return <OMAHome events={dates}/>
}