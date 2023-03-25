import { Dispatch, RefObject, SetStateAction, useEffect, useRef, useState } from "react";
import styles from "./DateFilter.module.scss";
import SelectIcon from "../../../public/images/menuSelectIcon.svg";
import FilterIcon from "../../../public/images/filter.svg";

interface DateFilterProps{
    availableCategories: string [],
    categories: string [],
    setCategories: Dispatch<SetStateAction<string []>>
}

const DateFilter = ({availableCategories,categories,setCategories}:DateFilterProps) => {
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
    const addFilter = (category: string) => {
        setCategories([...categories,category]);
        setCanOpen(false);
    }
    const clearFilters = () => {
        setCategories([]);
    }
    const isOpen = canOpen && (availableCategories.length - categories.length > 0);
    const unSelectedFilters = availableCategories.filter((category) => !categories.includes(category));
  return (
    <div className={styles.filter_container}>
      <div className={styles.filter_box_container}>
        <div className={styles.filter_box} ref={wrapperRef}>
          <div onClick={toggleFilter} className={[styles.filterText,styles.filterTitle,isOpen ? styles.filterTitleOpen : ""].join(" ")}>
            <div className={styles.filterTitleStart}><FilterIcon/></div>
            <span>Filtrar</span>
            <div className={styles.filterTitleEnd}><SelectIcon/></div>
          </div>
          {isOpen && 
              <ul className={styles.dropdownFilter}>
                  {unSelectedFilters.map((category,idx) => <li onClick={() => addFilter(category)} className={[styles.filterText,styles.filterOption].join(" ")} key={idx}><span>{category}</span></li>)}
              </ul>}
        </div>
      </div>
      {categories.length>0 && <div className={styles.currentFilter}>
          <div onClick={clearFilters} className={[styles.currentFilter_chip,styles.currentFilter_chip_clear].join(" ")}><span>X</span></div>
          {categories.map((category,idx) => <div className={styles.currentFilter_chip} key={idx}><span key={idx}>{category}</span></div>)}
      </div>}
    </div>
  );
};

export default DateFilter;
