import { Metadata } from "next";
import { getCalendarEvents } from "../../../../server/app-router-db-calls";
import MathClubs from "./mateclubes";
import { unstable_cache } from "next/cache";
import { CalendarEvent } from "components/CalendarComponents/CalendarTypes";

export const metadata: Metadata = {
  title: "Mateclubes",
  description: "Información general de los mateclubes",
};

const isDev = process.env.NODE_ENV === "development";

const fetchEvents = async (year: number, type?: string) => {
  const query = await getCalendarEvents(year, type);
  return JSON.stringify(query);
};

const getEvents = isDev
  ? fetchEvents
  : unstable_cache(fetchEvents, ["dates"], { tags: ["dates"] });

export default async function Mateclubes() {
  const year = new Date().getFullYear();
  const available = await getEvents(year, "Mateclubes");
  const events = (JSON.parse(available) as CalendarEvent[]).map((event) => {
    return {
      ...event,
      fecha_inicio: new Date(event.fecha_inicio),
      fecha_fin: event.fecha_fin ? new Date(event.fecha_fin) : undefined,
    };
  });
  return <MathClubs events={events} />;
}
