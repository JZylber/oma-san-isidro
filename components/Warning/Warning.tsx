import Image from "next/image";

interface WarningProps {
  title?: string;
  className?: string;
  children?: React.ReactNode;
}

const Warning = ({
  title = "Importante",
  className,
  children,
}: WarningProps) => {
  return (
    <div
      className={`flex flex-col border-2 border-black rounded-[9px] p-[1.6rem] my-[0.8rem] max-tablet:items-center ${className ?? ""}`}
    >
      <div className="flex justify-start items-center">
        <div className="relative hidden tablet:flex tablet:justify-center tablet:items-center tablet:w-[50px] tablet:h-[50px] desktop:w-[60px] desktop:h-[60px]">
          <Image src="/images/warning.svg" alt="Warning icon" fill={true} />
        </div>
        <p className="font-unbounded font-medium text-[2rem] tablet:text-[2.2rem] tablet:pl-[1.2rem] desktop:pl-[1.6rem] desktop:text-[3.4rem]">
          {title}
        </p>
      </div>
      <div className="p-[1.6rem] flex flex-col">
        <div className="tablet:flex tablet:flex-col">{children}</div>
      </div>
    </div>
  );
};

export default Warning;
