import { Fragment, useState } from "react";
import styles from "./InstanceMenu.module.scss";
import InstanceData from "./Instance";

export interface Instance {
    instancia: string,
    fecha: Date
}

interface InstanceMenuProps {
    competition:string, 
    instances: Instance[]
}

const Instances = ({competition,instances}: InstanceMenuProps) => {
    const [currentInstance,setCurrentInstance] = useState<number>(instances.findIndex((instance) => 
    {
        let date = new Date(instance.fecha);
        date.setDate(date.getDate() - 1);
        return date > new Date();
    }));
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