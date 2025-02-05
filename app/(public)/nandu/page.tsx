import { Metadata } from "next";
import { getCalendarEvents } from "../../../server/app-router-db-calls";
import NanduHome from "./home";
import { unstable_cache } from "next/cache";

export const metadata: Metadata = {
  title: "Ñandú",
  description: "Paǵina principal de Ñandú",
};

const getEvents = unstable_cache(
  async (year: number, type?: string) => getCalendarEvents(year, type),
  ["dates"],
  { tags: ["dates"] }
);

export default async function Nandu() {
  const events = await getEvents(new Date().getFullYear(), "Ñandú");
  const dates = events.map((event) => {
    return {
      ...event,
      fecha_fin: event.fecha_fin ? event.fecha_fin : undefined,
    };
  });
  return <NanduHome events={dates} />;
}
