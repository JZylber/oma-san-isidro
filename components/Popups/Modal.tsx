import { useEffect, useRef } from "react";

function Modal({
  openModal,
  closeModal,
  children,
}: {
  openModal: boolean;
  closeModal: () => void;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    if (openModal) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [openModal]);

  return (
    <dialog ref={ref} onCancel={closeModal}>
      {children}
    </dialog>
  );
}

export default Modal;
