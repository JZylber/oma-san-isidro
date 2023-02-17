import { ChangeEvent, ChangeEventHandler, RefObject, useEffect, useRef, useState } from "react"
import {OptionFilterProps } from "./resultsTypes"
import styles from "./Filter.module.scss"



const OptionSelectFilter = ({category_name,values,update_filter,includeSearchBar=false} : OptionFilterProps) => {
    const [selectedValues,setSelectedValues] = useState(values)
    const [displayedOptions, setDisplayedOptions] = useState(values)
    const [isOpen,setIsOpen] = useState(false)
    const toggleFilter = () => {
        setIsOpen(!isOpen)
    }
    //Close when clicked outside
    const useOutsideAlerter = (ref : RefObject<HTMLDivElement>) => {
        useEffect(() => {
          const handleClickOutside = (event : MouseEvent) => {
            const target = event.target && event.target as Node
            if (ref.current && !ref.current.contains(target)) {
              setIsOpen(false);
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


    useEffect(() => {update_filter(selectedValues)},[selectedValues])
    const allOptions : ChangeEventHandler<HTMLInputElement> = (event : ChangeEvent) => {
        const target = event.target && event.target as HTMLInputElement
        if(!target.checked && selectedValues.length === values.length){
            setSelectedValues([])
        } else if(target.checked){
            setSelectedValues(values)
        }
    }
    const toggleOption : ChangeEventHandler<HTMLInputElement> = (event : ChangeEvent) => {
        const target = event.target && event.target as HTMLInputElement
        let newSelectedValues = [...selectedValues]
        if(!target.checked){
            const optionIndex = newSelectedValues.findIndex((value) => value === target.value)
            newSelectedValues.splice(optionIndex,1)
        } else {
            newSelectedValues.push(target.value)
        }
        setSelectedValues(newSelectedValues)
    }
    const searchOptions : ChangeEventHandler<HTMLInputElement> = (event : ChangeEvent) => {
        const target = event.target && event.target as HTMLInputElement
        if(target.value.length === 0){
            setDisplayedOptions(values)
        } else {
            values && setDisplayedOptions(values.filter((value : string) => value.toLowerCase().replace('.','').normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(target.value)))
        }
    }
    return(
    <div ref={wrapperRef} className={styles.wrapper}>
        <div className={styles.header}>
            <span>{category_name}</span>
            <div className={styles.icon} onClick={toggleFilter}></div>
        </div>
        <div className={isOpen?styles.filterOptions_open: styles.filterOptions}>
            {includeSearchBar && <input onChange={searchOptions}/>}
            <div className={styles.filterOptions_item}>
                <input type="checkbox" value="all" key="all" onChange={allOptions} checked={selectedValues.length === values.length}/>
                <label>Todos</label>
            </div>
            {displayedOptions.map((value) => 
            <div className={styles.filterOptions_item} key={value}>
                <input type="checkbox" value={value} key={value} onChange={toggleOption} checked={selectedValues.includes(value)}/>
                <label>{value}</label>
            </div>)}
            </div>
    </div>)
}

export default OptionSelectFilter