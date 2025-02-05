import { unstable_cache } from "next/cache";
import { NewsItemData } from "../../components/News/NewsTypes";
import { getCalendarEvents } from "../../server/app-router-db-calls";
import { prisma } from "../../server/db";
import Home from "./home-page";
import { Metadata } from "next";
import { CalendarEvent } from "components/CalendarComponents/CalendarTypes";

export const metadata: Metadata = {
  title: "OMA San Isidro",
  description:
    "Página principal de la Secretaría Regional Buenos Aires Norte de la Olimpíadas Matemáticas Argentinas",
};

const getNews = unstable_cache(
  async () => {
    const query = await prisma.noticias.findMany({
      orderBy: [{ agregado: "desc" }],
      select: {
        titulo: true,
        link: true,
        visible: true,
        agregado: true,
      },
    });
    const results = query;
    return JSON.stringify(results);
  },
  ["news"],
  { tags: ["news"] }
);

const getEvents = unstable_cache(
  async (year: number, type?: string) => {
    const query = await getCalendarEvents(year, type);
    return JSON.stringify(query);
  },
  ["dates"],
  { tags: ["dates"] }
);

export default async function Page() {
  const newsData = getNews();
  const eventsData = getEvents(new Date().getFullYear());
  let [cachedNews, cachedEvents] = await Promise.all([newsData, eventsData]);
  const env = process.env.NODE_ENV;
  const vercel_env = process.env.VERCEL_ENV;
  let news = JSON.parse(cachedNews) as NewsItemData[];
  let events = JSON.parse(cachedEvents) as CalendarEvent[];
  if (
    env === "production" &&
    (vercel_env ? vercel_env === "production" : true)
  ) {
    news = news.filter((item: NewsItemData) => item.visible);
  }
  const calendar_events = events.map((event) => {
    return {
      ...event,
      fecha_inicio: new Date(event.fecha_inicio),
      fecha_fin: event.fecha_fin ? new Date(event.fecha_fin) : undefined,
    };
  });
  // Forward fetched data to your Client Component
  return <Home news={news} events={calendar_events} />;
}
