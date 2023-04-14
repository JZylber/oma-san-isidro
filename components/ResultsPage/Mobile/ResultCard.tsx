import { participantName, schoolName } from "../ResultTable";
import { TestQueryResults } from "../resultsTypes";
import styles from "./ResultCard.module.scss";
import ExpandArrow from "../../../public/images/menuArrow.svg"
import { useState } from "react";

const ResultCard = ({result}:{result: TestQueryResults}) => {
    const [expanded, setExpanded] = useState(false);
    return(
        <div className={styles.container} onClick={() => setExpanded(!expanded)}>
            <div className={styles.info}>
                <p className={styles.name}>{participantName(result)}</p>
                <div className={[styles.passed,result.aprobado?"":styles.not_passed].join(" ")}>
                    <span>APROBADO</span>
                </div>
                {expanded && <div className={styles.extra_information}>
                    <div className={styles.category}>
                        <p className={styles.title}>Colegio</p>
                        <p className={styles.value}>{schoolName(result)}</p>
                    </div>
                    <div className={styles.category}>
                        <p className={styles.title}>Nivel</p>
                        <p className={styles.value}>{result.participacion.nivel}</p>
                    </div>
                    {result.prueba.cantidad_problemas > 0 && result.presente && <div className={styles.results}>
                        {result.resultados.map((point,index) =>{ 
                            if(index < result.prueba.cantidad_problemas){
                                return(<div key={index} className={styles.category}>
                                    <p className={styles.title}>P{index + 1}</p>
                                    <p className={styles.value}>{point}</p>
                                </div>)
                            } else {
                                return(
                                <div key={index} className={styles.total_container}>
                                    <div className={styles.category}>
                                        <p className={styles.title}>Total</p>
                                        <p className={styles.value}>{point}</p>
                                    </div>
                                </div>)
                            }
                        })}
                    </div>}
                    {!result.presente && <div className={styles.category}><p className={styles.value}>AUSENTE</p></div>}
                </div>}
            </div>
            <ExpandArrow className={[styles.arrow,expanded?styles.rotated:""].join(" ")}/>
        </div>
    )
}

export default ResultCard