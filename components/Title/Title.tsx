export default function Title() {
  return (
    <div
      className="
        flex flex-col
        mt-[6.4rem]
        tablet:mt-0 tablet:row-start-1 tablet:row-end-2 tablet:col-start-1 tablet:col-end-5
        desktop:col-end-6 desktop:mt-[calc(4*var(--desktop-spacing))] desktop:mb-[2rem]
      "
    >
      <h1
        className="
          font-unbounded font-normal leading-none
          text-[calc(11*var(--mobile-x-spacing))]
          tablet:text-[calc(16*var(--tablet-x-spacing))]
          desktop:text-[calc(26.875*var(--desktop-x-spacing))]
          largest:text-[226.65px]
        "
      >
        oma
      </h1>
      <h2
        className="
          font-montserrat font-normal capitalize tracking-[-0.04em] leading-none
          text-[calc(8.7*var(--mobile-x-spacing))]
          tablet:text-[calc(9.5*var(--tablet-x-spacing))]
          desktop:text-[calc(15.475*var(--desktop-x-spacing))]
          largest:text-[130.51px]
        "
      >
        San Isidro
      </h2>
      <p
        className="
          font-montserrat font-normal leading-snug mt-[0.5em]
          text-[calc(1.78*var(--mobile-x-spacing))]
          tablet:text-[calc(1.96*var(--tablet-x-spacing))]
          desktop:text-[calc(3.225*var(--desktop-x-spacing))]
          largest:text-[26.35px]
        "
      >
        Secretaría Regional Buenos Aires Norte de <br /> las Olimpiadas de
        Matemática Argentinas.
      </p>
    </div>
  );
}
