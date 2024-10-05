import ActionButton from "components/buttons/ActionButton/ActionButton";
import WizardProgress from "components/common/wizard/WizardProgress";
import ConfirmModal from "components/Popups/ConfirmModal/ConfirmModal";
import Modal from "components/Popups/Modal";
import useWizard from "hooks/useWizard";
import Image from "next/image";
import React, { useState } from "react";
import FileUpload from "./fileUpload";
import ColumnInterpretation from "./columnInterpretation";
import ParticipantMatching from "./participantMatching";
import Preview from "./preview";

const WizardModal = ({ open, close }: { open: boolean; close: () => void }) => {
  const [confirmClose, setConfirmClose] = useState(false);
  const states = [
    { id: "1", component: FileUpload },
    { id: "2", component: ColumnInterpretation },
    { id: "3", component: ParticipantMatching },
    { id: "4", component: Preview },
  ];
  const [currentStep, currentStepIndex, nextStep, previousStep] =
    useWizard(states);
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
          <section className="flex flex-col gap-y-4 grow overflow-y-scroll">
            <div className="flex justify-center py-8">
              <WizardProgress
                steps={states.length}
                currentStep={currentStepIndex}
                clickStep={(step) => previousStep(step)}
                className="w-2/3"
              />
            </div>
            <div className="px-8">{<currentStep.component />}</div>
            {currentStepIndex < states.length && (
              <div className="flex justify-around w-full mt-auto py-8 border-t">
                <ActionButton
                  onClick={previousStep}
                  className={
                    currentStepIndex === 0
                      ? "opacity-25 pointer-events-none"
                      : ""
                  }
                >
                  Anterior
                </ActionButton>
                <ActionButton
                  onClick={nextStep}
                  important={currentStepIndex === states.length - 1}
                >
                  {currentStepIndex === states.length - 1
                    ? "Finalizar"
                    : "Siguiente"}
                </ActionButton>
              </div>
            )}
          </section>
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
