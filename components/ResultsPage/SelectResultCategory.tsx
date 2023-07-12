import {RefObject, useCallback, useEffect, useMemo, useRef, useState } from "react"
import SelectIcon from "../../public/images/menuSelectIcon.svg";
import { School } from "./resultsTypes";
import styles from "./SelectResultCategory.module.scss"
import {Filterables } from "../../hooks/types";

interface SelectResultProps<T>{
    category: string,
    value: T | undefined,
    setValue: (option: T | undefined) => void,
    options: T [],
    allOptions?: T[],
    input?: boolean,
    clear?: boolean,
    sortOptions?: (option_a : T,option_b: T) => number;
    buttons?: boolean;
}

const normalizeString = (str : string) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase();
}

const SelectResultCategory = <T extends Filterables>({category,value,setValue,options,allOptions,input = false,clear=false,buttons=false,sortOptions}:SelectResultProps<T>) => {
    if(buttons && (input || clear)){
      throw Error("SelectResultCategory: Buttons can't be used with input or clear options");
    }
    if(allOptions && !buttons){
      throw Error("SelectResultCategory: AllOptions can only be used with buttons");
    }
    sortOptions && options.sort(sortOptions);
    const [canOpen,setCanOpen] = useState(false)
    const toggleFilter = () => {
        setCanOpen(!canOpen)
    }
    const displayOption = useCallback((option: T) => {
      if(["number","string"].includes(typeof option)){
        return `${option}`;
      } else if(typeof option === 'boolean') {
        return option?"Si":"No"
      }else if (typeof option === 'object'){
        return option.toString();
      }else{
        return "";
      }
    },[]);
    const [tempValue,setTempValue] = useState(value?displayOption(value):"");
    const setInputFilter = (option : T) => {
      setValue(option);
      toggleFilter();
    }
    const cleanFilter = useCallback(() => {
      setValue(undefined);
    },[setValue]);
    useEffect(() => {
      if(input && tempValue === "" && value !== undefined){
          cleanFilter();
      }
    },[tempValue,value,cleanFilter,input])
    useEffect(() => {
        if(value === undefined){
          !canOpen && setTempValue("");
        }else{
          setTempValue(displayOption(value));
        }
    },[canOpen,value,displayOption])
    let filteredOptions = options.filter((option) => {return normalizeString(displayOption(option)).includes(normalizeString(tempValue))});
    const useOutsideAlerter = (ref : RefObject<HTMLDivElement>) => {
        useEffect(() => {
          const handleClickOutside = (event : MouseEvent) => {
            const target = event.target && event.target as Node
            if (ref.current && !ref.current.contains(target)) {
              setCanOpen(false);
            }
          }
          document.addEventListener("mousedown", handleClickOutside);
          return () => {
            document.removeEventListener("mousedown", handleClickOutside);
          };
        }, [ref]);
      }
    const wrapperRef = useRef<HTMLDivElement>(null);
    useOutsideAlerter(wrapperRef);
    const toggleValue = (option : T) => {
      if(value === option){
        setValue(undefined);
      }else{
        setValue(option);
      }
      toggleFilter();
    }
    const isOpen = canOpen && options.length > 0;
    const optionsToDisplay = allOptions?allOptions:options;
    const displayClear = clear && value !== undefined;
    return (
      <div className={styles.category_container}>
        <p className={styles.category}>{category}</p>
        {!buttons && <div className={styles.filter_box_container}>
          <div className={[styles.filter_box,isOpen && styles.filter_box_open].join(" ")} ref={wrapperRef}>
            {!input?
              <div onClick={toggleFilter} className={[styles.filterText,styles.filterTitle,isOpen?styles.filterTitleOpen:""].join(" ")}>
                <span>{value!==undefined?displayOption(value):`-`}</span>
                <div className={styles.filterTitleEnd}>
                  <SelectIcon/>
                </div>
              </div>
              :
              <div className={[styles.filter_input,isOpen?styles.filterTitleOpen:""].join(" ")}>
              <input 
                className={[styles.clean_input,styles.filterText,styles.filterTitle].join(" ")} 
                value={tempValue}
                onChange={(event) => {setTempValue(event.target.value);setCanOpen(true)}}
              />
              {value&&<div className={[styles.filterText,styles.filter_clear].join(" ")} onClick={cleanFilter}>X</div>}
              </div>
              }
            {isOpen &&
                <ul className={styles.dropdownFilter}>
                    {displayClear && <li onClick={() => {setValue(undefined);toggleFilter()}} className={[styles.filterText,styles.filterOption].join(" ")}><span>Quitar filtro</span></li>}
                    {input?
                      filteredOptions.map((option,idx) => <li onClick={() => {setInputFilter(option)}} className={[styles.filterText,styles.filterOption].join(" ")} key={idx}><span>{displayOption(option)}</span></li>)
                      :options.map((option,idx) => <li onClick={() => {setValue(option);toggleFilter()}} className={[styles.filterText,styles.filterOption].join(" ")} key={idx}><span>{displayOption(option)}</span></li>)}
                </ul>}
          </div>
        </div>}
        {buttons &&
              <div className={styles.buttons_container}>
                {
                optionsToDisplay.map((option,idx) => <div onClick={() => toggleValue(option)} className={[styles.button,options.includes(option)?"":styles.unavailable,value === option?styles.selected:""].join(" ")} key={idx}><span>{displayOption(option)}</span></div>)
                }
              </div>
        }
      </div>
    );
}

export default SelectResultCategory