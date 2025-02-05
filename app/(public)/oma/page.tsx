import { Metadata } from "next";
import { getCalendarEvents } from "../../../server/app-router-db-calls";
import OMAHome from "./home";
import { unstable_cache } from "next/cache";
import { CalendarEvent } from "components/CalendarComponents/CalendarTypes";

export const metadata: Metadata = {
  title: "OMA",
  description: "Paǵina principal de OMA",
};

const getEvents = unstable_cache(
  async (year: number, type?: string) => {
    const query = await getCalendarEvents(year, type);
    return JSON.stringify(query);
  },
  ["dates"],
  { tags: ["dates"] }
);

export default async function Oma() {
  const events = await getEvents(new Date().getFullYear(), "OMA");
  const dates = (JSON.parse(events) as CalendarEvent[]).map((event) => {
    return {
      ...event,
      fecha_inicio: new Date(event.fecha_inicio),
      fecha_fin: event.fecha_fin ? new Date(event.fecha_fin) : undefined,
    };
  });
  return <OMAHome events={dates} />;
}
