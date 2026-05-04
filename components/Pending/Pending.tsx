const Pending: ({ text }: { text: string }) => JSX.Element = ({ text }) => {
  return (
    <div className="flex flex-col items-center pt-[2rem]">
      <h1 className="font-unbounded font-semibold max-tablet:text-[3.6rem] max-tablet:mt-[calc(2.5*var(--mobile-spacing))] max-tablet:mb-[calc(1.5*var(--mobile-spacing))] tablet:text-[4.8rem] tablet:mb-[2.4rem]">
        ¡Un momento!
      </h1>
      <h2 className="font-unbounded font-medium max-desktop:text-[2.4rem] max-desktop:mb-[var(--mobile-spacing)] desktop:text-[3.4rem] desktop:mb-[2rem]">
        Página desactualizada
      </h2>
      <p className="font-montserrat font-light text-mobile-reading tablet:text-tablet-reading desktop:text-desktop-reading">
        {text}
      </p>
    </div>
  );
};

export default Pending;
