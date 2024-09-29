import ActionButton from "../../buttons/ActionButton/ActionButton";
import Modal from "../Modal";

interface ConfirmModalProps {
  open: boolean;
  close: () => void;
  onConfirm: () => void;
  onCancel: () => void;
  children: React.ReactNode;
}

const ConfirmModal = ({
  open,
  close,
  onCancel,
  onConfirm,
  children,
}: ConfirmModalProps) => {
  return (
    <Modal
      openModal={open}
      closeModal={close}
      className="max-w-xl border border-black rounded-lg bg-primary-white m-auto"
    >
      <div className="flex flex-col gap-y-2 py-4">
        {children}
        <div className="flex justify-around border-t pt-4">
          <ActionButton important onClick={onConfirm}>
            Confirmar
          </ActionButton>
          <ActionButton onClick={onCancel}>Cancelar</ActionButton>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
