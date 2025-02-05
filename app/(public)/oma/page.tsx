import { Metadata } from "next";
import { getCalendarEvents } from "../../../server/app-router-db-calls";
import OMAHome from "./home";
import { unstable_cache } from "next/cache";

export const metadata: Metadata = {
  title: "OMA",
  description: "Paǵina principal de OMA",
};

const getEvents = unstable_cache(
  async (year: number, type?: string) => getCalendarEvents(year, type),
  ["dates"],
  { tags: ["dates"] }
);

export default async function Oma() {
  const events = await getEvents(new Date().getFullYear(), "OMA");
  const dates = events.map((event) => {
    return {
      ...event,
      fecha_fin: event.fecha_fin ? event.fecha_fin : undefined,
    };
  });
  return <OMAHome events={dates} />;
}
