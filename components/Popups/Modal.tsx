import { useEffect, useRef } from "react";

function Modal({
  openModal,
  closeModal,
  children,
  className = "",
}: {
  openModal: boolean;
  closeModal: () => void;
  children: React.ReactNode;
  className?: string;
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
    <dialog ref={ref} onCancel={closeModal} className={className}>
      {children}
    </dialog>
  );
}

export default Modal;
