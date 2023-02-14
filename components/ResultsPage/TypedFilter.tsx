import { TypedFilterProps } from "./resultsTypes"
import styles from "./Filter.module.scss"
import { ChangeEvent, ChangeEventHandler, useEffect, useState } from "react"
import Autosuggest from "react-autosuggest"

const TypedFilter = ({category_name,values,update_filter} : TypedFilterProps) => {
    const [value,setValue] = useState("")
    const [suggestions,setSuggestions] = useState<string[]>([])
    const [isOpen,setIsOpen] = useState(false)
    const toggleFilter = () => {
        setIsOpen(!isOpen)
    }
    useEffect(() => update_filter(value),[value])
    const getSuggestions = (value : string) => {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;
        return inputLength === 0 ? [] : values.filter(option =>
          option.toLowerCase().replace('.','').normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(inputValue)
        );
      };
    const selectSuggestion = (newValue: string) => {
        setValue(newValue);
        setSuggestions([])
    }
    const renderSuggestion = (suggestion : string, index: number) => {
        return(
            <li key={index} onClick={() => selectSuggestion(suggestion)}>{suggestion}</li>
        )
    }
    const searchSuggestions : ChangeEventHandler<HTMLInputElement> = (event : ChangeEvent) => {
        const target = event.target && event.target as HTMLInputElement
        setValue(target.value)
        setSuggestions(getSuggestions(target.value))
    }
    return(
    <div className={styles.wrapper}>
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