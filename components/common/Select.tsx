import useOutsideClick from "hooks/useOutsideClick";
import Image from "next/image";
import { useState } from "react";

const Select = <T extends string | number | readonly string[]>({
  options,
  value,
  onChange,
  label,
}: {
  options: T[];
  value: T;
  onChange: (newValue: T) => void;
  label?: string;
}) => {
  const [open, setOpen] = useState(false);
  const ref = useOutsideClick(() => setOpen(false));
  return (
    <div className={`flex grow basis-0 flex-col gap-y-2`} ref={ref}>
      {label && <label className="font-montserrat text-2xl">{label}</label>}

      <div
        onClick={() => setOpen(!open)}
        className={`flex font-unbounded w-full px-6 py-4 text-2xl bg-primary-white border-2 border-primary-black rounded-t-xl relative Class
Properties
box-border ${
          options.length === 0
            ? "pointer-events-none opacity-25"
            : "cursor-pointer"
        } ${!open && "rounded-b-xl"}`}
      >
        <span className="grow">{value ? value : "-"}</span>
        <Image
          src={"/images/menuSelectIcon.svg"}
          width={16}
          height={16}
          alt=""
        />
        <div
          className={`absolute flex flex-col top-[calc(100%+2px)] -left-[2px] overflow-hidden z-10 w-[calc(100%+4px)] bg-primary-white rounded-b-xl divide-y-2 max-h-0 transition-[max-height] ${
            open &&
            "!max-h-[300px] overflow-y-scroll border-x-2 border-b-2 border-black"
          }`}
        >
          {options.map((option, i) => (
            <div className="px-6 py-4" key={i} onClick={() => onChange(option)}>
              {option}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Select;
