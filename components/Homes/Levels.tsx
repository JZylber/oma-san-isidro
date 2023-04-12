import styles from "./Levels.module.scss";
import LongArrow from "../../public/images/LongArrow.svg";

const level_data : {[key: string]:string[]} = {
    nandu: ["5to primario","6to primario","1ero secundario"],
    oma: ["2do y 3ero secundario","4to y 5to secundario","6to y 7mo (colegios técnicos) secundario"]
}

const Levels = ({category}:{category : string}) => {
    const data = level_data[category];
    return(
        <ul className={styles.levels}>
            {data.map((level,index) => {return(
                <li key={index} className={styles.level}>
                    <div className={styles.number}>{index + 1}</div>
                    <div className={styles.arrow}><LongArrow/></div>
                    <span className={styles.text}>{level}</span>
                </li>
            )})}
        </ul>
    )
}

export default Levels