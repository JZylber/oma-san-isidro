import ConfirmModal from "components/Popups/ConfirmModal/ConfirmModal";
import Modal from "components/Popups/Modal";
import Image from "next/image";
import React, { useState } from "react";
import FileUpload from "./fileUpload";
import ColumnInterpretation from "./columnInterpretation";
import ParticipantMatching from "./participantMatching";
import Preview from "./preview";
import Wizard from "components/common/wizard/Wizard";

const WizardModal = ({ open, close }: { open: boolean; close: () => void }) => {
  const [confirmClose, setConfirmClose] = useState(false);
  const states = [
    { id: "1", component: FileUpload },
    { id: "2", component: ColumnInterpretation },
    { id: "3", component: ParticipantMatching },
    { id: "4", component: Preview },
  ];
  return (
    <>
      <Modal
        openModal={open}
        closeModal={() => {}}
        className="border-2 bg-primary-white border-primary-black rounded-xl w-3/4 h-5/6 m-auto"
      >
        <div className="flex flex-col h-full">
          <div className="p-8 flex justify-between items-center border-b">
            <h1 className="font-unbounded text-4xl">
              Cargar resultados de un archivo
            </h1>
            <Image
              src="/images/x.svg"
              width={24}
              height={24}
              alt="close"
              onClick={() => setConfirmClose(true)}
            />
          </div>
          <Wizard states={[FileUpload]} />
        </div>
      </Modal>
      <ConfirmModal
        open={confirmClose}
        close={() => setConfirmClose(false)}
        onCancel={() => setConfirmClose(false)}
        onConfirm={() => {
          previousStep(0);
          setConfirmClose(false);
          close();
        }}
      >
        <div className="p-6 flex flex-col gap-y-4">
          <h1 className="font-unbounded text-4xl">
            ¿Estás seguro de que querés salir?
          </h1>
          <p className="font-montserrat text-xl font-semibold">
            Si salís ahora, vas a perder los datos que hayas ingresado.
          </p>
        </div>
      </ConfirmModal>
    </>
  );
};

export default WizardModal;
