import { Metadata } from "next";
import { getCalendarEvents } from "../../../../lib/app-router-db-calls";
import MathClubs from "./mateclubes";


export const metadata : Metadata = {
    title: 'Mateclubes',
    description: 'Información general de los mateclubes',
}

export default async function Mateclubes() {
    const year = new Date().getFullYear();
    const available = await getCalendarEvents(year,"Mateclubes");
    const events = available.map((event) => {return{...event,fecha_fin:event.fecha_fin?event.fecha_fin:undefined}});
    return <MathClubs events={events}/>
}