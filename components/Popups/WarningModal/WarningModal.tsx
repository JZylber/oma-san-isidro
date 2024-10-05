import ActionButton from "../../buttons/ActionButton/ActionButton";
import Modal from "../Modal";

interface WarningModalProps {
  open: boolean;
  close: () => void;
  children: React.ReactNode;
}

const WarningModal = ({ open, close, children }: WarningModalProps) => {
  return (
    <Modal
      openModal={open}
      closeModal={close}
      className="max-w-xl border-2 border-black rounded-xl bg-primary-white m-auto"
    >
      <div className="flex flex-col gap-y-2 py-4">
        {children}
        <div className="flex justify-center border-t pt-4">
          <ActionButton important onClick={close}>
            OK
          </ActionButton>
        </div>
      </div>
    </Modal>
  );
};

export default WarningModal;
