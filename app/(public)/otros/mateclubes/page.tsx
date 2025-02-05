import { Metadata } from "next";
import { getCalendarEvents } from "../../../../server/app-router-db-calls";
import MathClubs from "./mateclubes";
import { unstable_cache } from "next/cache";

export const metadata: Metadata = {
  title: "Mateclubes",
  description: "Información general de los mateclubes",
};

const getEvents = unstable_cache(
  async (year: number, type?: string) => getCalendarEvents(year, type),
  ["dates"],
  { tags: ["dates"] }
);

export default async function Mateclubes() {
  const year = new Date().getFullYear();
  const available = await getEvents(year, "Mateclubes");
  const events = available.map((event) => {
    return {
      ...event,
      fecha_fin: event.fecha_fin ? event.fecha_fin : undefined,
    };
  });
  return <MathClubs events={events} />;
}
