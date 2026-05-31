interface FaqItemProps {
  question: string;
  answer: string;
}

export default function FaqItem(props: FaqItemProps) {
  return (
    <div className="block max-tablet:max-w-[calc(37.5*var(--mobile-spacing))] [&:not(:last-child)]:max-tablet:mb-[2.4rem] tablet:box-border tablet:max-w-[50%] tablet:px-[1rem] tablet:py-[2rem] desktop:px-[1.6rem] desktop:py-[2.4rem]">
      <h3 className="font-unbounded font-medium text-mobile-actionable leading-[calc(2.375*var(--mobile-spacing))] mb-[0.5rem] inline-block tablet:text-tablet-actionable tablet:leading-[calc(2.3125*var(--tablet-spacing))] tablet:mb-[calc(0.5*var(--tablet-spacing))] tablet:inline desktop:text-desktop-actionable desktop:leading-[2.8rem] desktop:mb-[calc(3*var(--desktop-spacing))]">
        {props.question}
      </h3>
      <p className="font-montserrat font-normal m-0 block text-mobile-reading leading-[1.6rem] tablet:text-tablet-reading desktop:text-desktop-reading desktop:leading-[2.4rem]">
        {props.answer}
      </p>
    </div>
  )
}
