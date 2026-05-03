import Image from "next/image";
import styles from "./Card.module.scss";
import { useEffect, useState } from "react";
import { CardType } from "../Table/types";
import { VenueParticipant } from "./Venues";

const ParticipantCard: CardType<VenueParticipant> = ({value}) => {
    const {nivel,participante,colegio,sede} = value;
    const [expanded, setExpanded] = useState(false);
    useEffect(() => {
        setExpanded(false);
    },[value]);
    return(
        <div className={styles.container} onClick={() => setExpanded(!expanded)}>
            <div className={styles.info}>
                <p className={styles.name}>{participante.toString()}</p>
                <div className={styles.category}>
                        <p className={styles.title}>Rinde en:</p>
                        <p className={styles.value}>{sede}</p>
                    </div>
                {expanded && <div className={styles.extra_information}>
                    <div className={styles.category}>
                        <p className={styles.title}>Nivel</p>
                        <p className={styles.value}>{nivel}</p>
                    </div>
                    <div className={styles.category}>
                        <p className={styles.title}>Colegio</p>
                        <p className={styles.value}>{colegio.toString()}</p>
                    </div>
                </div>}
            </div>
            <div className={[styles.arrow,expanded?styles.rotated:""].join(" ")}><Image src="/images/menuArrow.svg" width={14} height={25} alt="" /></div>
        </div>
    )
}

export default ParticipantCard