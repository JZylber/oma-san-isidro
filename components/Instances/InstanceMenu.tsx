import { Fragment, useEffect, useState } from "react";
import styles from "./InstanceMenu.module.scss";
import InstanceData from "./Instance";
import {useSearchParams } from "next/navigation";
import { Competition } from "../../server/app-router-db-calls";

export interface Instance {
    instancia: string,
    fecha: Date
}

interface InstanceMenuProps {
    competition:Competition, 
    instances: Instance[]
}

const getInitialInstance = (instances: Instance[],query: string | undefined) => {
    if(query){
        const index = instances.findIndex((instance) => instance.instancia === query);
        if(index !== -1){
            return index;
        }
    }
    const index = instances.findIndex((instance) => 
    {
        let date = new Date(instance.fecha);
        date.setDate(date.getDate() + 1);
        return date > new Date();
    });
    if(index !== -1){
        return index;
    }
    return 0;
}

const Instances = ({competition,instances}: InstanceMenuProps) => {
    const query = useSearchParams()
    const [currentInstance,setCurrentInstance] = useState<number>(getInitialInstance(instances,query?query.get("instancia") as string:undefined));
    useEffect(() => {
        if(query && query.get("instancia")){
            setCurrentInstance(getInitialInstance(instances,query.get("instancia") as string));
        }
    },[query,instances])
    return(
        <>
        <h1 className={styles.title}>Instancias</h1>
        <ul className={styles.menu_bar}>
            {instances.map((instance,index) => 
            <Fragment key={index}>
                <li onClick={() => setCurrentInstance(index)} className={[styles.menu_bar_item,(index === currentInstance) && styles.menu_bar_item_selected].join(" ")}>{instance.instancia}</li>
                {index < (instances.length - 1) && <li><div className={styles.menu_bar_separator}></div></li>}
            </Fragment>
            )}
        </ul>
        <InstanceData competition={competition} instance={instances[currentInstance]} />
        </>
    )
}

export default Instances