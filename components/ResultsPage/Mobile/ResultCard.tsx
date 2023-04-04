import { participantName } from "../ResultTable";
import { TestQueryResults } from "../resultsTypes";
import styles from "./ResultCard.module.scss";
import ExpandArrow from "../../../public/images/menuArrow.svg"

const ResultCard = ({result}:{result: TestQueryResults}) => {
    return(
        <div className={styles.container}>
            <div className={styles.header}>
                <span>{participantName(result)}</span>
                <ExpandArrow className={styles.arrow}/>
            </div>
            <div className={[styles.passed,result.aprobado?"":styles.not_passed].join(" ")}>
                <span>APROBADO</span>
            </div>
        </div>
    )
}

export default ResultCard