import Link from "next/link";
import { CalendarEvent } from "../CalendarTypes";
import Image from "next/image";

interface DateBannerProps {
  dates: CalendarEvent[];
  displayAmount?: number;
  displayCategory?: string;
  ignoreCurrentDate?: boolean;
}

const DateBanner = ({
  dates,
  displayAmount = 3,
  displayCategory,
  ignoreCurrentDate = false,
}: DateBannerProps) => {
  const showCategory = !displayCategory;
  const category_filter = showCategory ? "" : `?categoria=${displayCategory}`;
  const currentDate = new Date();
  const upcomingDates = dates.filter(
    (date) => date.fecha_inicio >= currentDate
  );
  upcomingDates.sort(function (a, b) {
    var distancea = Math.abs(currentDate.getTime() - a.fecha_inicio.getTime());
    var distanceb = Math.abs(currentDate.getTime() - b.fecha_inicio.getTime());
    return distancea - distanceb;
  });
  const datesAvailable: boolean = upcomingDates.length > 0;
  const datesToRender = ignoreCurrentDate ? dates : upcomingDates;
  const months = [
    "ENE","FEB","MAR","ABR","MAY","JUN","JUL","AGO","SEP","OCT","NOV","DIC",
  ];
  const getEndDate = (cevent: CalendarEvent) => {
    if (cevent.fecha_fin) {
      return ` - ${cevent.fecha_fin.getUTCDate()}`;
    } else {
      return "";
    }
  };
  const renderDate = (
    date: CalendarEvent,
    idx: number,
    dates: CalendarEvent[]
  ) => {
    return (
      <div className="w-full flex flex-col [&:not(:first-child)]:pt-[.8rem] [&:not(:last-child)]:border-b-2 [&:not(:last-child)]:border-b-primary-black" key={idx}>
        <div className="font-montserrat font-normal flex items-center order-2 max-tablet:text-[1.5rem] max-tablet:py-[.8rem] tablet:py-[1.6rem] tablet:max-desktop:text-tablet-reading desktop:text-desktop-reading">
          <span>{`${date.fecha_inicio.getUTCDate()} ${getEndDate(date)} ${
            months[date.fecha_inicio.getMonth()]
          }`}</span>
        </div>
        <div className="flex justify-start items-center font-unbounded font-normal order-1 max-tablet:text-[2.4rem] max-tablet:leading-[2.8rem] tablet:max-desktop:text-tablet-actionable desktop:text-desktop-actionable">{date.texto}</div>
        <div className="flex order-3 max-tablet:flex-col max-tablet:justify-end max-tablet:items-start tablet:justify-between tablet:items-end">
          {showCategory && (
            <div className="flex items-center bg-primary-light-blue border-2 border-primary-black rounded-[9px] w-fit font-unbounded font-medium max-tablet:text-[1.5rem] max-tablet:my-[.8rem] max-tablet:p-[.4rem] tablet:py-[.8rem] tablet:px-[1.6rem] tablet:text-[1.2rem]">{date.tipo}</div>
          )}
          {idx === dates.length - 1 && (
            <Link href={`/otros/calendario${category_filter}`}>
              <div className="text-primary-black flex underline font-unbounded font-normal max-tablet:text-mobile-actionable max-tablet:mt-[2.2rem] tablet:max-desktop:text-tablet-actionable desktop:text-desktop-reading">
                <div className="max-tablet:w-[19px] max-tablet:h-[19px] max-tablet:order-1 tablet:max-desktop:w-[20px] tablet:max-desktop:h-[20px] tablet:max-desktop:order-2 desktop:w-[25px] desktop:h-[25px] desktop:order-2">
                  <Image src={"/images/pageLinkIcon.svg"} alt="link" width={25} height={25} />
                </div>
                <span className="max-tablet:order-2 tablet:order-1">Ver calendario completo</span>
              </div>
            </Link>
          )}
        </div>
      </div>
    );
  };
  return (
    <div
      className={[
        "bg-primary-white border-2 border-primary-black rounded-[9px] mt-[2.4rem] overflow-hidden flex max-tablet:py-[2.4rem] max-tablet:px-[1.6rem] tablet:p-[3.2rem]",
        !showCategory && "tablet:max-desktop:max-w-[60rem] desktop:max-w-[90rem]",
      ].join(" ")}
    >
      {displayAmount === 1 && (
        <div className="max-tablet:hidden tablet:inline-block tablet:relative tablet:mr-[3.2rem] tablet:max-desktop:h-[105px] desktop:h-[127px] tablet:aspect-square">
          <Image src={"/images/calendarIcon.svg"} alt="calendar" fill={true} />
        </div>
      )}
      <div className="flex flex-col flex-grow">
        {datesAvailable ? (
          datesToRender
            .filter(
              (date) =>
                displayCategory === undefined || displayCategory === date.tipo
            )
            .slice(0, displayAmount)
            .map(renderDate)
        ) : (
          <div className="flex justify-center items-center w-full h-full">
            <div className="flex justify-start items-center font-unbounded font-normal max-tablet:text-[2.4rem] max-tablet:leading-[2.8rem] tablet:max-desktop:text-tablet-actionable desktop:text-desktop-actionable">
              Todavía no hay información sobre próximas fechas
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DateBanner;
