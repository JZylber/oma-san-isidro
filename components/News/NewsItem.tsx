import styles from "./NewsItem.module.scss";
import NewsArrow from "../../img/newsArrow.svg";

interface NewsItemProps {
  content: string;
}

export default function NewsItem(props: NewsItemProps) {
  return (
    <div className={styles.container}>
      <span>{props.content} </span>
      <NewsArrow className={styles.arrow} />
    </div>
  );
}
