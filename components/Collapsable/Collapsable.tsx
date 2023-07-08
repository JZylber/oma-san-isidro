import { useState } from "react";
import styles from "./Collapsable.module.scss";
import Image from "next/image";

interface CollapsableProps {
    title: string,
    children: React.ReactNode
}

const Collapsable = ({title,children}:CollapsableProps) => {
    const [open,setOpen] = useState<boolean>(false);
    return (
    <section className={styles.collapsable}>
        <div className={[styles.header,open?styles.selected:""].join(" ")} onClick={()=>setOpen(!open)}>
            <h3>{title}</h3>
            <div className={[styles.arrow,open?styles.rotated:""].join(" ")}>
                <Image src="/images/menuArrow.svg" alt="arrow" width={20} height={20}/>
            </div>
        </div>
        {open && 
        <div className={styles.content}>
            {children}
        </div>}
    </section>
  );
};

export default Collapsable;