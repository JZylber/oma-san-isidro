import WizardProgress from "components/common/wizard/WizardProgress";
import ConfirmModal from "components/Popups/ConfirmModal/ConfirmModal";
import Modal from "components/Popups/Modal";
import useWizard, { WizardState } from "hooks/useWizard";
import Image from "next/image";
import React, { useState } from "react";

const WizardModal = ({ open, close }: { open: boolean; close: () => void }) => {
  const [confirmClose, setConfirmClose] = useState(false);
  const states = [
    { id: "1", component: () => <div>Step 1</div> },
    { id: "2", component: () => <div>Step 2</div> },
    { id: "3", component: () => <div>Step 3</div> },
    { id: "4", component: () => <div>Step 4</div> },
  ] as WizardState[];
  const [currentStep, currentStepIndex, nextStep, previousStep] =
    useWizard(states);
  return (
    <>
      <Modal
        openModal={open}
        closeModal={() => {}}
        className="border-2 bg-primary-white border-primary-black rounded-xl w-3/4 h-5/6 m-auto"
      >
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
        <section className="flex flex-col gap-y-4">
          <div className="flex justify-center py-8">
            <WizardProgress
              steps={states.length}
              currentStep={currentStepIndex}
              clickStep={(step) => previousStep(step)}
              className="w-2/3"
            />
          </div>
        </section>
      </Modal>
      <ConfirmModal
        open={confirmClose}
        close={() => setConfirmClose(false)}
        onCancel={() => setConfirmClose(false)}
        onConfirm={() => {
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
