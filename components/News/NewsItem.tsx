import NewsArrow from "../../public/images/newsArrow.svg";
import Link from "next/link";

interface NewsItemProps {
  content: string;
  link: string;
}

export default function NewsItem(props: NewsItemProps) {
  return (
    <Link href={props.link} className="no-underline text-primary-black">
      <div className="box-border bg-primary-light-blue border-2 border-black rounded-[9px] flex flex-row justify-center items-center text-center font-unbounded font-medium mt-[1.6rem] shadow-[0px_0.6rem_black] h-[7.2rem] max-tablet:mb-[2.4rem] text-mobile-actionable leading-[calc(2.375*var(--mobile-spacing))] tablet:h-[6.4rem] tablet:text-tablet-actionable tablet:leading-[calc(2.5*var(--tablet-max-spacing))] tablet:first:mt-[calc(2*var(--tablet-y-spacing))] desktop:h-[8rem] desktop:first:mt-[calc(2*var(--desktop-spacing))] desktop:text-desktop-actionable desktop:leading-[3rem] desktop:mt-[calc(2*var(--desktop-spacing))] desktop:mb-[calc(3*var(--desktop-spacing))] desktop:shadow-[0px_0.8rem_black]">
        <span className="w-full desktop:w-4/5">{props.content}</span>
        <NewsArrow className="hidden desktop:inline desktop:float-right desktop:w-[30px] desktop:translate-x-[calc(3*var(--desktop-x-spacing))]" />
      </div>
    </Link>
  );
}
