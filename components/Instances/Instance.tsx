import styles from "./Instance.module.scss";
import { useState } from "react";
import { Instance } from "./InstanceMenu";

interface InstanceProps {
    competition: string,
    instance: Instance
}

const months = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"]

const InstanceData = ({competition,instance}:InstanceProps) => {
    const [instanceIsLoading,setInstanceIsLoading] = useState<boolean>(false);
    const {instancia,fecha} = instance;
    return(
        <>
        <h2 className={styles.title}>{instancia[0] + instancia.slice(1).toLocaleLowerCase()}</h2>
        <h3 className={styles.subtitle}>{`${fecha.getDate()} de ${months[fecha.getMonth()]}`}</h3>
        </>
    )
}

export default InstanceData