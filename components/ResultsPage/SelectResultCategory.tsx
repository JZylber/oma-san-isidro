import { RefObject, useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Filterables } from "../../hooks/types";
import useOutsideClick from "hooks/useOutsideClick";

interface SelectResultProps<T> {
  category: string;
  value: T | undefined;
  setValue: (option: T | undefined) => void;
  options: T[];
  allOptions?: T[];
  input?: boolean;
  clear?: boolean;
  sortOptions?: (option_a: T, option_b: T) => number;
  buttons?: boolean;
}

const normalizeString = (str: string) => {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase();
};

const categoryContainerClasses = "flex flex-col max-tablet:w-full tablet:mr-[2rem] tablet:max-desktop:flex-[1_1_0] tablet:max-desktop:w-0 desktop:min-w-[180px] desktop:w-[19%]";
const categoryClasses = "font-montserrat font-normal pb-[.4rem] max-desktop:text-[1.5rem] desktop:text-[1.6rem]";
const filterBoxContainerClasses = "w-full relative tablet:min-h-[4.8rem]";
const filterBoxClasses = "border-2 border-primary-black rounded-[9px] overflow-hidden box-border bg-primary-white tablet:absolute tablet:w-full tablet:z-[1]";
const filterBoxClosedClasses = "tablet:max-h-full";
const filterBoxOpenClasses = "z-[2] max-h-fit";
const filterTextClasses = "flex items-center font-unbounded font-medium text-[1.5rem] max-tablet:text-center max-tablet:p-[1.4rem_2rem] max-tablet:[&_span]:flex-grow tablet:max-desktop:p-[1.4rem_2rem] desktop:p-[1.4rem_1.8rem]";
const filterTitleClasses = "flex justify-between bg-primary-white";
const filterTitleOpenClasses = "border-b-2 border-b-primary-black";
const filterInputClasses = "flex w-full";
const cleanInputClasses = "appearance-none border-0 outline-none shadow-none focus:outline-none w-full text-ellipsis";
const filterClearClasses = "basis-[content] !pl-0";
const dropdownFilterClasses = "list-none flex-[0_1_auto] overflow-y-scroll max-h-[21.6rem] tablet:[scrollbar-width:none] tablet:[&::-webkit-scrollbar]:hidden";
const filterOptionClasses = "[&:not(:last-child)]:border-b-2 [&:not(:last-child)]:border-b-primary-black box-border";
const buttonsContainerClasses = "flex gap-x-[2rem]";
const buttonClasses = "flex justify-center items-center w-0 flex-[1_1_0] bg-primary-white border-2 border-primary-black rounded-[9px] min-h-[6rem] font-unbounded font-medium text-[2rem]";
const selectedClasses = "bg-primary-black text-primary-white";
const unavailableClasses = "opacity-30 pointer-events-none";

const SelectResultCategory = <T extends Filterables>({
  category,
  value,
  setValue,
  options,
  allOptions,
  input = false,
  clear = false,
  buttons = false,
  sortOptions,
}: SelectResultProps<T>) => {
  if (buttons && (input || clear)) {
    throw Error(
      "SelectResultCategory: Buttons can't be used with input or clear options"
    );
  }
  if (allOptions && !buttons) {
    throw Error(
      "SelectResultCategory: AllOptions can only be used with buttons"
    );
  }
  sortOptions && options.sort(sortOptions);
  const [canOpen, setCanOpen] = useState(false);
  const toggleFilter = () => {
    setCanOpen(!canOpen);
  };
  const displayOption = useCallback((option: T) => {
    if (["number", "string"].includes(typeof option)) {
      return `${option}`;
    } else if (typeof option === "boolean") {
      return option ? "Si" : "No";
    } else if (typeof option === "object") {
      return option.toString();
    } else {
      return "";
    }
  }, []);
  const [tempValue, setTempValue] = useState(value ? displayOption(value) : "");
  const setInputFilter = (option: T) => {
    setValue(option);
    toggleFilter();
  };
  const cleanFilter = useCallback(() => {
    setValue(undefined);
  }, [setValue]);
  useEffect(() => {
    if (input && tempValue === "" && value !== undefined) {
      setTempValue(displayOption(value));
    }
  }, [tempValue, value, cleanFilter, input, displayOption]);
  useEffect(() => {
    if (value === undefined) {
      !canOpen && setTempValue("");
    } else {
      setTempValue(displayOption(value));
    }
  }, [canOpen, value, displayOption]);
  let filteredOptions = options.filter((option) => {
    return normalizeString(displayOption(option)).includes(
      normalizeString(tempValue)
    );
  });

  const wrapperRef = useOutsideClick(() => {
    setCanOpen(false);
  });

  const toggleValue = (option: T) => {
    if (value === option) {
      setValue(undefined);
    } else {
      setValue(option);
    }
    toggleFilter();
  };
  const isOpen = canOpen && options.length > 0;
  const optionsToDisplay = allOptions ? allOptions : options;
  const displayClear = clear && value !== undefined;
  return (
    <div className={categoryContainerClasses}>
      <p className={categoryClasses}>{category}</p>
      {!buttons && (
        <div className={filterBoxContainerClasses}>
          <div
            className={[
              filterBoxClasses,
              isOpen ? filterBoxOpenClasses : filterBoxClosedClasses,
            ].join(" ")}
            ref={wrapperRef}
          >
            {!input ? (
              <div
                onClick={toggleFilter}
                className={[
                  filterTextClasses,
                  filterTitleClasses,
                  isOpen ? filterTitleOpenClasses : "",
                ].join(" ")}
              >
                <span>{value !== undefined ? displayOption(value) : `-`}</span>
                <Image src="/images/menuSelectIcon.svg" width={12} height={10} alt="" />
              </div>
            ) : (
              <div
                className={[
                  filterInputClasses,
                  isOpen ? filterTitleOpenClasses : "",
                ].join(" ")}
              >
                <input
                  className={[
                    cleanInputClasses,
                    filterTextClasses,
                    filterTitleClasses,
                  ].join(" ")}
                  value={tempValue}
                  onChange={(event) => {
                    let newTempValue = event.target.value;
                    setTempValue(newTempValue);
                    if (newTempValue === "") {
                      cleanFilter();
                    }
                    setCanOpen(true);
                  }}
                />
                {value && (
                  <div
                    className={[filterTextClasses, filterClearClasses].join(
                      " "
                    )}
                    onClick={cleanFilter}
                  >
                    X
                  </div>
                )}
              </div>
            )}
            {isOpen && (
              <ul className={dropdownFilterClasses}>
                {displayClear && (
                  <li
                    onClick={() => {
                      setValue(undefined);
                      toggleFilter();
                    }}
                    className={[filterTextClasses, filterOptionClasses].join(
                      " "
                    )}
                  >
                    <span>Quitar filtro</span>
                  </li>
                )}
                {input
                  ? filteredOptions.map((option, idx) => (
                      <li
                        onClick={() => {
                          setInputFilter(option);
                        }}
                        className={[
                          filterTextClasses,
                          filterOptionClasses,
                        ].join(" ")}
                        key={idx}
                      >
                        <span>{displayOption(option)}</span>
                      </li>
                    ))
                  : options.map((option, idx) => (
                      <li
                        onClick={() => {
                          setValue(option);
                          toggleFilter();
                        }}
                        className={[
                          filterTextClasses,
                          filterOptionClasses,
                        ].join(" ")}
                        key={idx}
                      >
                        <span>{displayOption(option)}</span>
                      </li>
                    ))}
              </ul>
            )}
          </div>
        </div>
      )}
      {buttons && (
        <div className={buttonsContainerClasses}>
          {optionsToDisplay.map((option, idx) => (
            <div
              onClick={() => toggleValue(option)}
              className={[
                buttonClasses,
                options.includes(option) ? "" : unavailableClasses,
                value === option ? selectedClasses : "",
              ].join(" ")}
              key={idx}
            >
              <span>{displayOption(option)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectResultCategory;
