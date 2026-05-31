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
      <span className="w-full h-full border-[5px] border-solid border-primary-black border-b-transparent rounded-full inline-block box-border animate-spin"></span>
    </div>
  );
};

export default BasicLoader;
