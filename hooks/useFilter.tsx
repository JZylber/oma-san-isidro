import { useReducer } from "react";
import { Filterable, Filterables } from "./types";

interface ChangeValueAction<S> {
    type: string,
    value: S
}


const reducer = <S,>(state : Partial<S>,action: ChangeValueAction<Partial<S>>) => {
    const {type,value} = action;
    switch (type) {
        case "update":
            return {...state,...value};
        default:
            return {...state};
    }
};

const useFilter = <S extends Record<string,Filterables>>(values: S[]) => {
    const [state,dispatch] = useReducer(reducer<S>,{});
    const filterFunction = (value: S,filter: Partial<S>) => {
        const isFilterCompliant = Object.keys(filter).every((key) => 
        {const property = value[key];
            if(filter[key] !== undefined){
                if(typeof property !== "object"){
                    if(value[key] !== filter[key]){
                        return false;
                    }
                } else {
                    const filterable = property as Filterable<any>;
                    if(!filterable.isFilteredBy(filter[key])){
                        return false;
                    }
                }
            }
            return true;})
        return isFilterCompliant;
    }
    const filteredValues = values.filter((value) => filterFunction(value,state));
    const update = (newValue : Partial<S> ) => {
        dispatch({type:"update",value: newValue});
    }
    let options : Partial<Record<keyof S,Filterables[]>> = {};
    Object.keys(values[0]).forEach((key) => {
        const stateWithoutKey = {...state,[key as keyof S]:undefined}
        if(typeof values[0][key as keyof S] !== "object"){
            options[key as keyof S] = Array.from(new Set(values.filter((value) => filterFunction(value,stateWithoutKey)).map((value) => value[key as keyof S])));
        } else {
            const uniqueValues = values
                .filter((value) => filterFunction(value,stateWithoutKey))
                .map((value) => value[key as keyof S] as Filterable<any>)
                .filter((value,index,self) => self.findIndex((v) => v.isFilteredBy(value)) === index);
            const genericValues = uniqueValues
                .map((value) => value.generic)
                .filter((value) => value !== undefined)
                .filter((value,index,self) => self.findIndex((v) => v.isFilteredBy(value)) === index);
            options[key as keyof S] = uniqueValues.concat(genericValues);
        }
        
    });
    return {state,update,filteredValues,options};
};

export default useFilter;