import { Metadata } from "next";
import { getCalendarEvents } from "../../../../server/app-router-db-calls";
import GeometryPage from "./geometria";
import { unstable_cache } from "next/cache";

export const metadata: Metadata = {
  title: "Geometría e Imaginación",
  description: "Información general del torneo de geometría e imaginación",
};

const getEvents = unstable_cache(
  async (year: number, type?: string) => getCalendarEvents(year, type),
  ["dates"],
  { tags: ["dates"] }
);

export default async function Geometry() {
  const year = new Date().getFullYear();
  const available = await getEvents(year, "Geometría");
  const events = available.map((event) => {
    return {
      ...event,
      fecha_fin: event.fecha_fin ? event.fecha_fin : undefined,
    };
  });
  return <GeometryPage events={events} year={year} />;
}
