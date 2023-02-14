import styles from "./Button.module.scss";
import NewsArrow from "../../img/newsArrow.svg";

interface ButtonProps {
  content: string;
  children?: JSX.Element;
}

export const Button: React.FC<ButtonProps> = ({ content, children }) => {
  return (
    <div className={styles.container}>
      <span>{content} </span>
      {children}
    </div>
  );
};
