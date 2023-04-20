import styles from "./AuthItem.module.scss";

type authProps = {
  important: React.ReactNode;
  text: React.ReactNode;
};

export const AuthItem = ({ important, text }: authProps) => {
  return (
    <li className={styles.item}>
      <span className={styles.important}>{important} </span>
      <span>{text}</span>
    </li>
  );
};
