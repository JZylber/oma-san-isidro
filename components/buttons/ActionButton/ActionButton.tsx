interface ActionButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  type?: "button" | "submit" | "reset";
  important?: boolean;
  className?: string;
}

const ActionButton = ({
  children,
  important = false,
  onClick,
  type = "button",
  className = "",
}: ActionButtonProps) => {
  return (
    <button
      className={`flex justify-center items-center border-2 border-b-4 border-black rounded-xl w-36 h-16 font-montserrat text-2xl ${
        important ? "bg-primary-light-blue" : ""
      } ${className}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};
export default ActionButton;
