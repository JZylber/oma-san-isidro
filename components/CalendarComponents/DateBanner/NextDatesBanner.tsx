import { CalendarEvent } from "../CalendarTypes";
import Link from "next/link";
import Image from "next/image";

interface DateBannerProps {
  dates: CalendarEvent[];
  category: string;
}

const smallLinkClasses = "text-primary-black flex underline font-unbounded font-normal max-tablet:text-mobile-actionable max-tablet:mt-[2.2rem] tablet:max-desktop:text-tablet-actionable desktop:text-desktop-reading";
const smallLinkImageClasses = "max-tablet:w-[19px] max-tablet:h-[19px] max-tablet:order-1 tablet:max-desktop:w-[20px] tablet:max-desktop:h-[20px] tablet:max-desktop:order-2 desktop:w-[25px] desktop:h-[25px] desktop:order-2";

const NextDatesBanner = ({ dates, category }: DateBannerProps) => {
  const months = [
    "ENE","FEB","MAR","ABR","MAY","JUN","JUL","AGO","SEP","OCT","NOV","DIC",
  ];
  const current_date = new Date();
  const next_dates = dates
    .filter((date) => date.fecha_inicio > current_date)
    .slice(0, 3);
  return (
    <section>
      <div className="flex items-end max-tablet:justify-center tablet:justify-between">
        <span className="font-unbounded font-medium max-desktop:text-[2.4rem] desktop:text-[3.4rem]">Fechas</span>
        <Link href={`/otros/calendario?categoria=${category}`} className="max-tablet:hidden underline">
          <div className={smallLinkClasses}>
            <div className={smallLinkImageClasses}>
              <Image src="/images/pageLinkIcon.svg" width={25} height={25} alt="" />
            </div>
            <span className="max-tablet:order-2 tablet:order-1">Ver calendario {category}</span>
          </div>
        </Link>
      </div>
      <div className="max-tablet:flex max-tablet:flex-col max-tablet:gap-y-[1.6rem] max-tablet:mt-[1rem] tablet:max-desktop:grid tablet:max-desktop:grid-cols-2 tablet:max-desktop:gap-[1.6rem] tablet:max-desktop:mt-[1.6rem] desktop:grid desktop:grid-cols-3 desktop:gap-[1.6rem] desktop:mt-[1.6rem]">
        {next_dates.map((date, idx) => {
          return (
            <div className={`bg-primary-white border-2 border-primary-black rounded-[9px] flex flex-col max-tablet:py-[1rem] max-tablet:px-[1.6rem] max-tablet:gap-y-[1.6rem] tablet:max-desktop:py-[2.4rem] tablet:max-desktop:px-[2rem] tablet:max-desktop:gap-y-[1.6rem] desktop:py-[4rem] desktop:px-[3.2rem] desktop:gap-y-[1.6rem]${idx === 2 ? " tablet:max-desktop:hidden" : ""}`} key={idx}>
              <span className="font-unbounded font-normal max-desktop:text-[2rem] desktop:text-[2.4rem]">{date.texto}</span>
              <span className="font-montserrat font-normal max-desktop:text-[1.5rem] desktop:text-[2rem]">{`${date.fecha_inicio.getUTCDate()} ${months[date.fecha_inicio.getUTCMonth()]}`}</span>
            </div>
          );
        })}
      </div>
      <div className="max-tablet:flex tablet:hidden">
        <Link href={`/otros/calendario?categoria=${category}`}>
          <div className={smallLinkClasses}>
            <div className={smallLinkImageClasses}>
              <Image src="/images/pageLinkIcon.svg" width={25} height={25} alt="" />
            </div>
            <span className="max-tablet:order-2 tablet:order-1">Ver calendario {category}</span>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default NextDatesBanner;
