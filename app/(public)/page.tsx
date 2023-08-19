import { NewsItemData } from "../../components/News/NewsTypes";
import { getCalendarEvents } from "../../server/app-router-db-calls";
import { prisma } from "../../server/db";
import Home from "./home-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'OMA San Isidro',
  description: 'Página principal de la Secretaría Regional Buenos Aires Norte de la Olimpíadas Matemáticas Argentinas',
}

const getNews = async () => {
    const query = await prisma.noticias.findMany(
      {
        orderBy: [
          {agregado: 'desc'}
        ],
        select: {
          titulo: true,
          link: true,
          visible: true,
        }
      } 
      )
      const results = query
      return (results);
    };


export default async function Page() {
    const newsData = getNews();
    const eventsData = getCalendarEvents(new Date().getFullYear());
    let [news,events] = await Promise.all([newsData,eventsData]);
    const env = process.env.NODE_ENV;
    const vercel_env = process.env.VERCEL_ENV;
    if(env === "production" && (vercel_env?vercel_env === "production":true)){
        news = news.filter((item:NewsItemData) => item.visible)
    }
    const calendar_events = events.map((event) => {return{...event,fecha_fin:event.fecha_fin?event.fecha_fin:undefined}})
    // Forward fetched data to your Client Component
    return <Home news={news} events={calendar_events} />
  }