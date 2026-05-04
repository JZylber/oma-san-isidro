"use client";
import Faq from "../../components/FAQ/Faq";
import News from "../../components/News/News";
import Title from "../../components/Title/Title";
import Image from "next/image";
import { NewsItemData } from "../../components/News/NewsTypes";
import DateBanner from "../../components/CalendarComponents/DateBanner/DateBanner";
import { CalendarEvent } from "../../components/CalendarComponents/CalendarTypes";
import HomeModal from "../../components/Popups/Main Modal/HomeModal";
import { useState } from "react";
import Contributions from "../../components/Contributions/Contributions";

interface HomeProps {
  news: NewsItemData[];
  events: CalendarEvent[];
}

const Home = ({ news, events }: HomeProps) => {
  const [openModal, setOpenModal] = useState(true);
  return (
    <div className="tablet:grid tablet:grid-rows-[max-content_max-content_max-content_max-content] tablet:max-desktop:grid-cols-8 tablet:max-desktop:[column-gap:calc(2.5*var(--tablet-x-spacing))] desktop:grid-cols-10 desktop:gap-y-0 desktop:[column-gap:calc(2.5*var(--desktop-x-spacing))]">
      <HomeModal open={openModal} setOpen={setOpenModal} />
      <Title />

      {/* NEWS */}
      <section className="max-tablet:mt-[4.8rem] tablet:max-desktop:mt-[2.5rem] tablet:max-desktop:row-start-2 tablet:max-desktop:row-end-3 tablet:max-desktop:col-start-1 tablet:max-desktop:col-end-5 desktop:mt-[2.4rem] desktop:row-start-2 desktop:row-end-3 desktop:col-start-1 desktop:col-end-6">
        <h3 className="text-section-title font-montserrat font-normal max-tablet:text-center max-tablet:[line-height:calc(3*var(--mobile-spacing))] tablet:max-desktop:text-left tablet:max-desktop:[line-height:calc(2.25*var(--tablet-max-spacing))] desktop:text-left desktop:[line-height:calc(3*var(--desktop-spacing))]">Novedades</h3>
        <News newsData={news} />
      </section>

      {/* IMAGE */}
      <div className="flex justify-end content-center max-tablet:hidden tablet:overflow-visible tablet:max-desktop:mt-[2.7rem] tablet:max-desktop:row-start-1 tablet:max-desktop:row-end-3 tablet:max-desktop:col-start-5 tablet:max-desktop:col-end-[-1] tablet:max-desktop:max-h-[55rem] desktop:row-start-1 desktop:row-end-3 desktop:col-start-6 desktop:col-end-[-1] desktop:[padding-top:calc(8*var(--desktop-spacing))]">
        <Image src="/images/mainNandu.svg" width={595} height={842} alt="" className="max-w-full max-h-full" />
      </div>

      {/* Contributions */}
      <section className="max-tablet:mt-[4.8rem] tablet:row-start-3 tablet:row-end-4 tablet:col-span-full tablet:mt-[4.8rem]">
        <Contributions />
      </section>

      {/* Next Events */}
      <section className="max-tablet:mt-[4.8rem] tablet:row-start-4 tablet:row-end-5 tablet:col-span-full tablet:mt-[4.8rem]">
        <h3 className="text-section-title font-montserrat font-normal max-tablet:text-center max-tablet:[line-height:calc(3*var(--mobile-spacing))] tablet:max-desktop:text-left tablet:max-desktop:[line-height:calc(2.25*var(--tablet-max-spacing))] desktop:text-left desktop:[line-height:calc(3*var(--desktop-spacing))]">Próxima fecha</h3>
        <DateBanner dates={events} displayAmount={1} />
      </section>

      {/* FAQ */}
      <section className="max-tablet:mt-[4.8rem] tablet:row-start-5 tablet:row-end-6 tablet:col-span-full tablet:mt-[4.8rem]">
        <h3 className="text-section-title font-montserrat font-normal max-tablet:text-center max-tablet:[line-height:calc(3*var(--mobile-spacing))] tablet:max-desktop:text-left tablet:max-desktop:[line-height:calc(2.25*var(--tablet-max-spacing))] desktop:text-left desktop:[line-height:calc(3*var(--desktop-spacing))]">Preguntas Frecuentes</h3>
        <Faq />
      </section>
    </div>
  );
};
export default Home;
