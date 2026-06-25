import { useState } from "react";
import Image from "next/image";

interface CollapsableProps {
  title: string;
  children: React.ReactNode;
}

const Collapsable = ({ title, children }: CollapsableProps) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <section className="mt-[1.2rem] overflow-hidden">
      <div
        className={`flex justify-between items-center p-[1rem] rounded-[9px] border-2 border-black/50 transition-colors duration-200 ease-in-out hover:cursor-pointer ${open ? "bg-primary-light-blue" : ""}`}
        onClick={() => setOpen(!open)}
      >
        <h3 className="font-unbounded font-medium text-[2rem] tablet:text-left tablet:text-[1.6rem] desktop:text-[2.6rem]">
          {title}
        </h3>
        <div className={`transition-transform duration-200 ease-in-out ${open ? "rotate-90" : ""}`}>
          <Image src="/images/menuArrow.svg" alt="arrow" width={20} height={20} />
        </div>
      </div>
      <div
        className={`overflow-hidden px-[1rem] transition-[padding] duration-[400ms] ease-out ${open ? "max-h-[1000rem] py-[1.2rem]" : "max-h-0 py-0"}`}
      >
        {children}
      </div>
    </section>
  );
};

export default Collapsable;
