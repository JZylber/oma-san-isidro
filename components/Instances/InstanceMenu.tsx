import { Fragment, useEffect, useState } from "react";
import styles from "./InstanceMenu.module.scss";
import InstanceData from "./Instance";
import { useRouter } from "next/router";

export interface Instance {
    instancia: string,
    fecha: Date
}

interface InstanceMenuProps {
    competition:string, 
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
        date.setDate(date.getDate() - 1);
        return date > new Date();
    });
    if(index !== -1){
        return index;
    }
    return 0;
}

const Instances = ({competition,instances}: InstanceMenuProps) => {
    const router = useRouter();
    const {query} = router
    const [currentInstance,setCurrentInstance] = useState<number>(getInitialInstance(instances,query.instancia as string));
    useEffect(() => {
        if(query.instancia){
            setCurrentInstance(getInitialInstance(instances,query.instancia as string));
        }
    },[query.instancia,instances])
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