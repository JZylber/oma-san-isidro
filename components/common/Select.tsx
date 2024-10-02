import Image from "next/image";

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
  return (
    <div className="flex grow basis-0 flex-col gap-y-2">
      {label && (
        <label className="font-montserrat text-xl font-semibold">{label}</label>
      )}
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value as T)}
          className="font-unbounded block w-full pl-6 pr-12 py-4 text-2xl bg-primary-white border-2 border-primary-black rounded-xl appearance-none"
        >
          <option value="" disabled selected hidden>
            -
          </option>
          {options.map((option, i) => (
            <option key={i} value={option}>
              {option}
            </option>
          ))}
        </select>
        <Image
          src={"/images/menuSelectIcon.svg"}
          width={16}
          height={16}
          alt=""
          className="pointer-events-none absolute z-10 top-1/2 right-4 transform -translate-y-1/2"
        />
      </div>
    </div>
  );
};

export default Select;
