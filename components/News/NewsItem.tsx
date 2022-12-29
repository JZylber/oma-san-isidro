import styles from './NewsItem.module.scss'

interface NewsItemProps {
    content: string
  }

export default function NewsItem(props:NewsItemProps){
    return(
        <div className={styles.container}>{props.content}</div>
    )
}