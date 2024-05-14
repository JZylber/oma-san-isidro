import styles from "./Button.module.scss";

interface ButtonProps {
  content: string;
  children?: JSX.Element;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  content,
  children,
  onClick,
}) => {
  return (
    <div className={styles.container} onClick={onClick}>
      <span>{content} </span>
      {children}
    </div>
  );
};
