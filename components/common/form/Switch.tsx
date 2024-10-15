import Image from "next/image";
import { useRef } from "react";

interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Switch = ({ ...props }: SwitchProps) => {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <div
      className={`relative border-2 border-black w-fit p rounded-full flex justify-center items-center w-[24px] h-[24px]`}
    >
      <input
        ref={ref}
        type="checkbox"
        {...props}
        className="absolute cursor-pointer w-full h-full opacity-0"
      />
      {((ref.current && ref.current.checked) ||
        (!ref.current && props.defaultChecked)) && (
        <Image src={`/icons/check.svg`} width={16} height={16} alt="check" />
      )}
    </div>
  );
};

export default Switch;
