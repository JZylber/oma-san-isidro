import {RefObject, useEffect, useRef, useState } from "react"
import SelectIcon from "../../public/images/menuSelectIcon.svg";
import styles from "./SelectResultCategory.module.scss"

interface SelectResultProps<T>{
    category: string,
    value: T | null,
    setValue: (option: T) => void,
    options: T [];
}


const SelectResultCategory = <T extends string|number,>({category,value,setValue,options}:SelectResultProps<T>) => {
    const [canOpen,setCanOpen] = useState(false)
    const toggleFilter = () => {
        setCanOpen(!canOpen)
    }
    const displayOption = (option: T) => {
      if(typeof option === "number"){
        return `${option}`;
      } else {
        return `${option.slice(0,1)}${option.slice(1).toLocaleLowerCase()}`
      }
    }
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
    const isOpen = canOpen && options.length > 0
  return (
    <div className={styles.category_container}>
      <p className={styles.category}>{category}</p>
      <div className={styles.filter_box_container}>
        <div className={styles.filter_box} ref={wrapperRef}>
          <div onClick={toggleFilter} className={[styles.filterText,styles.filterTitle,isOpen?styles.filterTitleOpen:""].join(" ")}><span>{value?displayOption(value):`-`}</span><div className={styles.filterTitleEnd}><SelectIcon/></div></div>
          {isOpen && 
              <ul className={styles.dropdownFilter}>
                  {options.map((option,idx) => <li onClick={() => {setValue(option);toggleFilter()}} className={[styles.filterText,styles.filterOption].join(" ")} key={idx}><span>{displayOption(option)}</span></li>)}
              </ul>}
        </div>
      </div>
    </div>
  );
}

export default SelectResultCategory