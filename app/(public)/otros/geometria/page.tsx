import { Metadata } from "next";
import { getCalendarEvents } from "../../../../server/app-router-db-calls";
import GeometryPage from "./geometria";
import { unstable_cache } from "next/cache";
import { CalendarEvent } from "components/CalendarComponents/CalendarTypes";

export const metadata: Metadata = {
  title: "Geometría e Imaginación",
  description: "Información general del torneo de geometría e imaginación",
};

const getEvents = unstable_cache(
  async (year: number, type?: string) => {
    const query = await getCalendarEvents(year, type);
    return JSON.stringify(query);
  },
  ["dates"],
  { tags: ["dates"] }
);

export default async function Geometry() {
  const year = new Date().getFullYear();
  const available = await getEvents(year, "Geometría");
  const events = (JSON.parse(available) as CalendarEvent[]).map((event) => {
    return {
      ...event,
      fecha_inicio: new Date(event.fecha_inicio),
      fecha_fin: event.fecha_fin ? new Date(event.fecha_fin) : undefined,
    };
  });
  return <GeometryPage events={events} year={year} />;
}
