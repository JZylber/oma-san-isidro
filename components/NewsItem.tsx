import styles from './styles/NewsItem.module.css'

interface NewsItemProps {
    content: string
  }

export default function NewsItem(props:NewsItemProps){
    return(
        <div className={styles.container}>{props.content}</div>
    )
}