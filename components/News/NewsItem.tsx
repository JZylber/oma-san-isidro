import styles from "./NewsItem.module.scss";
import NewsArrow from "../../public/images/newsArrow.svg";
import Link from "next/link";
import { useContext } from "react";
import { pageLayoutContext } from "../Layout/Layout";

interface NewsItemProps {
  content: string;
  link: string;
}

export default function NewsItem(props: NewsItemProps) {
  const {onRouteChange} = useContext(pageLayoutContext)

  return (
    <Link href={props.link} className={styles.link} onClick={onRouteChange}>
      <div className={styles.container}>
        <span>{props.content} </span>
        <NewsArrow className={styles.arrow} />
      </div>
    </Link>
  );
}
