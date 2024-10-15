import Image from "next/image";
import { useRef } from "react";

interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Switch = ({ ...props }: SwitchProps) => {
  const ref = useRef<HTMLInputElement>(null);
  const checked =
    (ref.current && ref.current.checked) ||
    (!ref.current && props.defaultChecked);
  return (
    <div
      className={`transition relative border rounded-full w-[52px] h-[32px] flex items-center  border-black ${
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
          <Image src={`/icons/check.svg`} width={16} height={16} alt="check" />
        )}
      </div>
      <input
        ref={ref}
        type="checkbox"
        {...props}
        className="absolute cursor-pointer w-full h-full opacity-0"
      />
    </div>
  );
};

export default Switch;
