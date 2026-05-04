import NewsItem from "./NewsItem";
import { NewsItemData } from "./NewsTypes";

export default function News({ newsData }: { newsData: NewsItemData[] }) {
  const now = new Date();
  const daysApart = 45;
  const newsToDisplay = newsData.slice(0, 3).filter((newsItemData) => {
    return (
      new Date(newsItemData.agregado).getTime() >=
      now.getTime() - 1000 * 60 * 60 * 24 * daysApart
    );
  });
  const newsAvailable: boolean = newsToDisplay.length > 0;
  return (
    <div>
      {newsAvailable ? (
        newsToDisplay.map((newsItemData, index) => (
          <NewsItem
            content={newsItemData.titulo}
            link={newsItemData.link}
            key={index}
          />
        ))
      ) : (
        <div className="font-unbounded font-medium pt-[2rem] text-mobile-actionable max-tablet:mt-[calc(2.5*var(--mobile-spacing))] max-tablet:mb-[calc(1.5*var(--mobile-spacing))] tablet:text-desktop-actionable tablet:mb-[2.4rem]">
          No hay novedades
        </div>
      )}
    </div>
  );
}
