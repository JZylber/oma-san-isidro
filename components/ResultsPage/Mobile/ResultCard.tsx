import { Result, TestQueryResults } from "../resultsTypes";
import styles from "./ResultCard.module.scss";
import ExpandArrow from "../../../public/images/menuArrow.svg"
import {useEffect, useState } from "react";
import { CardType } from "../../Table/types";

const ResultCard : CardType<Result> = ({value}) => {
    const [expanded, setExpanded] = useState(false);
    useEffect(() => {
        setExpanded(false);
    },[value]);
    const hasPoints = value.presente && !value.aclaracion;
    return(
        <div className={styles.container} onClick={() => setExpanded(!expanded)}>
            <div className={styles.info}>
                <p className={styles.name}>{value.participante.toString()}</p>
                <div className={[styles.passed,value.aprobado?"":styles.not_passed].join(" ")}>
                    <span>APROBADO</span>
                </div>
                {expanded && <div className={styles.extra_information}>
                    <div className={styles.category}>
                        <p className={styles.title}>Colegio</p>
                        <p className={styles.value}>{value.colegio.toString()}</p>
                    </div>
                    <div className={styles.category}>
                        <p className={styles.title}>Nivel</p>
                        <p className={styles.value}>{value.nivel}</p>
                    </div>
                    {value.cantidad_problemas > 0 && hasPoints && 
                    <div className={styles.results}>
                        {value.resultados.problems.map((point,index) =>{ 
                            return(<div key={index} className={styles.category}>
                                <p className={styles.title}>P{index + 1}</p>
                                <p className={styles.value}>{point.toString()}</p>
                            </div>)
                        })}
                        <div className={styles.total_container}>
                            <div className={styles.category}>
                                <p className={styles.title}>Total</p>
                                <p className={styles.value}>{value.resultados.total}</p>
                            </div>
                        </div>
                    </div>}
                    {!hasPoints && <div className={styles.category}><p className={styles.value}>{value.aclaracion?value.aclaracion.toUpperCase():"AUSENTE"}</p></div>}
                </div>}
            </div>
            <ExpandArrow className={[styles.arrow,expanded?styles.rotated:""].join(" ")}/>
        </div>
    )
}

export default ResultCard