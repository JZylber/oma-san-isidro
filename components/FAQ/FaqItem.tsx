import styles from './FAQItem.module.scss'

interface FaqItemProps{
    question : string,
    answer : string
}

export default function FaqItem(props : FaqItemProps){
    return(
    <div className={styles.item}>
        <h3>{props.question}</h3>
        <p>{props.answer}</p>
    </div>)
}