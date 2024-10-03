import styles from "./Button.module.scss";

interface ButtonProps {
  content: string;
  type?: "button" | "submit" | "reset";
  children?: JSX.Element;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  content,
  children,
  type = "button",
  onClick,
}) => {
  return (
    <button className={styles.container} type={type} onClick={onClick}>
      <span>{content} </span>
      {children}
    </button>
  );
};
