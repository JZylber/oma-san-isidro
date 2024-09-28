import { EditableResult } from "../../../server/routers/dashboard";
import Modal from "../Modal";

const ResultModal = ({
  result,
  open,
  close,
  onConfirm,
}: {
  result: EditableResult;
  open: boolean;
  close: () => void;
  onConfirm: () => void;
}) => {
  return (
    <Modal
      openModal={open}
      closeModal={close}
      className="p-2 ml-auto h-screen max-h-screen border-l border-black"
    >
      <div className="flex flex-col ">
        <h2>Editar Resultado</h2>
        <p>
          Nombre y Apellido: {result.participante.nombre}{" "}
          {result.participante.apellido}
        </p>
        <p>
          Colegio: {result.colegio.nombre}
          {result.colegio.sede ? `-${result.colegio.sede}` : ""}
        </p>
        <div className="flex gap-x-4">
          <button onClick={close}>Cancelar</button>
          <button onClick={onConfirm}>Confirmar</button>
        </div>
      </div>
    </Modal>
  );
};

export default ResultModal;
