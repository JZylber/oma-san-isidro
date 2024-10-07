import Image from "next/image";
import { useRef } from "react";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  width?: number;
  height?: number;
}

const Checkbox = ({ width, height, ...props }: CheckboxProps) => {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <div
      className={`relative border-2 border-black w-fit p rounded-xl flex justify-center items-center`}
    >
      <input
        ref={ref}
        type="checkbox"
        {...props}
        className="absolute pointer-cursor w-full h-full opacity-0"
      />
      <Image
        src={`/icons/${
          ref.current
            ? ref.current.checked
              ? "check"
              : "close"
            : props.defaultChecked
            ? "check"
            : "close"
        }.svg`}
        width={width}
        height={height}
        alt="check"
      />
    </div>
  );
};

export default Checkbox;
