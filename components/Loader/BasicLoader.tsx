import styles from "./BasicLoader.module.scss";

const BasicLoader = ({
  style,
  className = "",
}: {
  style?: React.CSSProperties;
  className?: string;
}) => {
  const defaultStyle = {
    width: "5.6rem",
    height: "5.6rem",
  };
  const externallyStyled = style || className;
  return (
    <div style={!externallyStyled ? defaultStyle : style} className={className}>
      <span className={styles.loader}></span>
    </div>
  );
};

export default BasicLoader;
