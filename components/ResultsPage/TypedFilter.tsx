import { TypedFilterProps } from "./resultsTypes"
import styles from "./Filter.module.scss"
import { ChangeEvent, ChangeEventHandler, RefObject, useEffect, useRef, useState } from "react"

const TypedFilter = ({category_name,values,update_filter} : TypedFilterProps) => {
    const [value,setValue] = useState("")
    const [suggestions,setSuggestions] = useState<string[]>([])
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

    const getSuggestions = (value : string) => {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;
        return inputLength === 0 ? [] : values.filter(option =>
          option.toLowerCase().replace('.','').normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(inputValue)
        );
      };
    const selectSuggestion = (newValue: string) => {
        setValue(newValue);
        update_filter(value);
        setSuggestions([]);
    }
    const renderSuggestion = (suggestion : string, index: number) => {
        return(
            <li className={styles.filterOptions_item} key={index} onClick={() => selectSuggestion(suggestion)}>{suggestion}</li>
        )
    }
    const searchSuggestions : ChangeEventHandler<HTMLInputElement> = (event : ChangeEvent) => {
        const target = event.target && event.target as HTMLInputElement;
        setValue(target.value);
        update_filter(value);
        setSuggestions(getSuggestions(target.value));
    }
    return(
    <div ref={wrapperRef} className={styles.wrapper}>
        <div className={styles.header}>
            <span>{category_name}</span>
            <div className={styles.icon} onClick={toggleFilter}></div>
        </div>
        <div className={isOpen?styles.filterOptions_open: styles.filterOptions}>
            <input onChange={searchSuggestions} value={value}/>
            <ul className={styles.suggestions}>
                {suggestions.map((suggestion,index) => renderSuggestion(suggestion,index))}
            </ul>
        </div>
    </div>
    
    )
}

export default TypedFilter