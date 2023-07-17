import styles from "./NewsItem.module.scss";
import NewsArrow from "../../public/images/newsArrow.svg";
import Link from "next/link";

interface NewsItemProps {
  content: string;
  link: string;
}

export default function NewsItem(props: NewsItemProps) {
  return (
    <Link href={props.link} className={styles.link}>
      <div className={styles.container}>
        <span>{props.content} </span>
        <NewsArrow className={styles.arrow} />
      </div>
    </Link>
  );
}
