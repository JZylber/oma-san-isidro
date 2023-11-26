import styles from "./ResultCard.module.scss";
import ExpandArrow from "../../../public/images/menuArrow.svg"
import {useEffect, useState } from "react";
import { CardType } from "../../Table/types";
import { ProvincialResult } from "../ProvincialTable";

const NationalResultCard : CardType<ProvincialResult> = ({value}) => {
    const {participante,colegio,nivel,resultado,aprobado} = value;
    const [expanded, setExpanded] = useState(false);
    useEffect(() => {
        setExpanded(false);
    },[value]);
    return(
        <div className={styles.container} onClick={() => setExpanded(!expanded)}>
            <div className={styles.info}>
                <p className={styles.name}>{participante.toString()}</p>
                <div className={[styles.passed,value.aprobado?"":styles.not_passed].join(" ")}>
                    <span>APROBADO</span>
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
                    {resultado !== "" && 
                        <div className={styles.category}>
                            <p className={styles.title}>Premio</p>
                            <p className={styles.value}>{resultado}</p>
                        </div>
                    }
                </div>}
            </div>
            <ExpandArrow className={[styles.arrow,expanded?styles.rotated:""].join(" ")}/>
        </div>
    )
}

export default NationalResultCard