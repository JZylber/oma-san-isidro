import { debug } from "console";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Switch = ({ ...props }: SwitchProps) => {
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    if (props.checked !== undefined) setChecked(props.checked);
  }, [props, setChecked]);
  return (
    <div
      className={`transition relative border-2 rounded-full w-[54px] h-[32px] flex items-center  border-black ${
        checked ? "bg-primary-light-blue" : "bg-primary-white"
      }`}
    >
      <div
        className={`transition rounded-full flex justify-center items-center box-border w-[24px] h-[24px] ${
          checked
            ? "bg-primary-white translate-x-[24px]"
            : "bg-gray-500 translate-x-[2px]"
        }`}
      >
        {checked && (
          <Image src={`/icons/check.svg`} width={18} height={18} alt="check" />
        )}
      </div>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => {
          setChecked(e.target.checked);
          if (props.onChange) props.onChange(e);
        }}
        className="absolute cursor-pointer w-full h-full opacity-0"
      />
    </div>
  );
};

export default Switch;
