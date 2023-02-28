import { Dispatch, SetStateAction} from "react";
import styles from "./MonthSelect.module.scss";
import MenuArrow from '../../img/menuArrow.svg';
import { useSwipeable } from "react-swipeable";

interface MonthSelectProps {
    displayedMonth : number,
    setDisplayedMonth: Dispatch<SetStateAction<number>>;
}

const MonthSelect = ({displayedMonth,setDisplayedMonth}: MonthSelectProps) => {
    const months = ["ENE","FEB","MAR","ABR","MAY","JUN","JUL","AGO","SEP","OCT","NOV","DIC"]
    const monthClick = (forward: boolean) => {
        setDisplayedMonth(forward? (displayedMonth + 1% months.length): ((displayedMonth - 1) % months.length  + months.length) % months.length)
    }
    const handlers = useSwipeable({
        onSwipedLeft: () => monthClick(false),
        onSwipedRight: () => monthClick(true)
    })
   
    return(
        <div {...handlers} className={styles.container}>
            <span onClick={() => monthClick(false)} className={styles.sideMonth}>{months[((displayedMonth - 1) % months.length  + months.length) % months.length]}</span>
            <MenuArrow onClick={() => monthClick(false)} className={styles.rotated}/>
            <span className={styles.selectedMonth}>{months[(displayedMonth) % months.length]}</span>
            <MenuArrow onClick={() => monthClick(true)}/>
            <span onClick={() => monthClick(true)} className={styles.sideMonth}>{months[(displayedMonth + 1) % months.length]}</span>
        </div>)
}

export default MonthSelect