interface ActionButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  important?: boolean;
  className?: string;
}

const ActionButton = ({
  children,
  important = false,
  onClick,
  className = "",
}: ActionButtonProps) => {
  return (
    <button
      className={`flex justify-center items-center border-2 border-b-4 border-black rounded-xl w-36 h-16 font-montserrat text-2xl ${
        important ? "bg-primary-light-blue" : ""
      } ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
export default ActionButton;
