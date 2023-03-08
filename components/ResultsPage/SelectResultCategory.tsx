import {RefObject, useEffect, useRef, useState } from "react"
import SelectIcon from "../../img/menuSelectIcon.svg";
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
    <>
    <div className={styles.filter_box_container}>
      <div className={styles.filter_box} ref={wrapperRef}>
        <div onClick={toggleFilter} className={[styles.filterText,styles.filterTitle,isOpen?styles.filterTitleOpen:""].join(" ")}><span>{value?value:`Seleccionar ${category.toLowerCase()}`}</span><div className={styles.filterTitleEnd}><SelectIcon/></div></div>
        {isOpen && 
            <ul className={styles.dropdownFilter}>
                {options.map((option,idx) => <li onClick={() => setValue(option)} className={[styles.filterText,styles.filterOption].join(" ")} key={idx}><span>{option}</span></li>)}
            </ul>}
      </div>
    </div>
    </>
  );
}

export default SelectResultCategory