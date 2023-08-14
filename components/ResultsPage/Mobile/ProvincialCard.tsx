import styles from "./ResultCard.module.scss";
import ExpandArrow from "../../../public/images/menuArrow.svg"
import {useEffect, useState } from "react";
import { CardType } from "../../Table/types";
import { ProvincialResult } from "../ProvincialTable";

const ProvincialResultCard : CardType<ProvincialResult> = ({value}) => {
    const {participante,colegio,nivel,resultado} = value;
    const [expanded, setExpanded] = useState(false);
    useEffect(() => {
        setExpanded(false);
    },[value]);
    return(
        <div className={styles.container} onClick={() => setExpanded(!expanded)}>
            <div className={styles.info}>
                <p className={styles.name}>{participante.toString()}</p>
                <div className={styles.passed}>
                        <span>{resultado}</span>
                    </div>
                {expanded && <div className={styles.extra_information}>
                    <div className={styles.category}>
                        <p className={styles.title}>Colegio</p>
                        <p className={styles.value}>{colegio.toString()}</p>
                    </div>
                    <div className={styles.category}>
                        <p className={styles.title}>Nivel</p>
                        <p className={styles.value}>{nivel}</p>
                    </div>
                </div>}
            </div>
            <ExpandArrow className={[styles.arrow,expanded?styles.rotated:""].join(" ")}/>
        </div>
    )
}

export default ProvincialResultCard