type authProps = {
  important: React.ReactNode;
  text: React.ReactNode;
};

export const AuthItem = ({ important, text }: authProps) => {
  return (
    <li className="font-montserrat font-light max-tablet:w-full max-tablet:text-mobile-reading max-tablet:mb-[16px] tablet:w-[calc(38*var(--tablet-x-spacing))] tablet:max-w-[50%] tablet:text-tablet-reading tablet:my-[calc(2*var(--tablet-y-spacing))] desktop:w-[calc(45*var(--desktop-x-spacing))] desktop:max-w-[50%] desktop:text-desktop-reading desktop:pb-[20px]">
      <span className="font-semibold">{important} </span>
      <span>{text}</span>
    </li>
  );
};
