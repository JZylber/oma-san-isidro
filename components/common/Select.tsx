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
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        className="font-unbounded block w-full px-4 py-2 text-2xl bg-primary-white border border-primary-black rounded-md"
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
    </div>
  );
};

export default Select;
