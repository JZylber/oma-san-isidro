interface ActionButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  important?: boolean;
}

const ActionButton = ({
  children,
  important = false,
  onClick,
}: ActionButtonProps) => {
  return (
    <button
      className={`flex justify-center items-center border border-black rounded-lg w-36 h-16 font-montserrat text-2xl ${
        important ? "bg-primary-light-blue" : ""
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
export default ActionButton;
