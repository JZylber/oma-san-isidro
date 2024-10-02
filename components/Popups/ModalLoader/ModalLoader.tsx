import Loader from "../../Loader/Loader";
import Modal from "../Modal";

const ModalLoader = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <Modal
      openModal={isOpen}
      closeModal={() => {}}
      className="m-auto bg-transparent"
    >
      <Loader />
    </Modal>
  );
};

export default ModalLoader;
