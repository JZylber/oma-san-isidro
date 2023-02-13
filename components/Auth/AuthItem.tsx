import styles from "./AuthItem.module.scss";

type authProps = {
  important: string;
  text: string;
};

export const AuthItem = ({ important, text }: authProps) => {
  return (
    <li className={styles.item}>
      <b>{important}</b>
      {text}
    </li>
  );
};
