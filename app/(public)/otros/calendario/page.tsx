import { Metadata } from "next";
import CalendarPage from "./calendario";
import { getCalendarEvents } from "../../../../server/app-router-db-calls";
import { unstable_cache } from "next/cache";
import { CalendarEvent } from "components/CalendarComponents/CalendarTypes";

export const metadata: Metadata = {
  title: "Calendario",
  description:
    "Calendario anual de todas las competencias matemáticas del país",
};

const getEvents = unstable_cache(
  async (year: number, type?: string) => {
    const query = await getCalendarEvents(year, type);
    return JSON.stringify(query);
  },
  ["dates"],
  { tags: ["dates"] }
);

const Calendar = async () => {
  const year = new Date().getFullYear();
  const available = await getEvents(year);
  const events = (JSON.parse(available) as CalendarEvent[]).map((event) => {
    return {
      ...event,
      fecha_inicio: new Date(event.fecha_inicio),
      fecha_fin: event.fecha_fin ? new Date(event.fecha_fin) : undefined,
    };
  });
  return <CalendarPage events={events} year={year} />;
};

export default Calendar;
