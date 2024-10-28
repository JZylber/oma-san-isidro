import Image from "next/image";
import { useEffect, useState } from "react";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  width?: number;
  height?: number;
}

const Checkbox = ({ width, height, ...props }: CheckboxProps) => {
  const [checked, setChecked] = useState(props.defaultChecked);
  useEffect(() => {
    if (props.checked !== undefined) {
      setChecked(props.checked);
    }
  }, [props.checked, setChecked]);
  return (
    <div
      className={`relative border-2 border-black w-fit p rounded-xl flex justify-center items-center`}
    >
      <input
        type="checkbox"
        {...props}
        onChange={(e) => {
          setChecked(e.target.checked);
          if (props.onChange) props.onChange(e);
        }}
        checked={checked}
        className="absolute cursor-pointer w-full h-full opacity-0"
      />
      <Image
        src={`/icons/${checked ? "check" : "close"}.svg`}
        width={width}
        height={height}
        alt="check"
      />
    </div>
  );
};

export default Checkbox;
