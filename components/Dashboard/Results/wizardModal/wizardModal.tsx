import ConfirmModal from "components/Popups/ConfirmModal/ConfirmModal";
import Modal from "components/Popups/Modal";
import Image from "next/image";
import React, { useState } from "react";
import FileUpload from "./fileUpload";
import ColumnInterpretation from "./phase2/columnInterpretation";
import Preview from "./preview";
import useWizard from "hooks/useWizard";
import { EditableResult } from "server/routers/dashboard";

export interface Result2Modify {
  id_rinde: number;
  puntaje: string[];
  aprobado: boolean;
  presente: boolean;
  aclaracion: string | null;
}

export interface Result2Add {
  id_participacion: number;
  puntaje: string[];
  aprobado: boolean;
  presente: boolean;
  aclaracion: string | null;
}

export interface NewResults {
  dni: number;
  problems: string[];
  result: string;
  total: string;
  name?: string;
  lastName?: string;
  level?: string;
  approved: boolean;
  present: boolean;
  clarification?: string;
}

interface WizardData {
  currentResults: EditableResult[];
  newResults: Partial<NewResults>[];
  results2Modify: Result2Modify[];
  results2Add: Result2Add[];
}

export interface WizardStateProps {
  data: WizardData;
  nextStep: (stepData: WizardData) => void;
  previousStep: (step?: number) => void;
  numberOfStates: number;
  currentStepIndex: number;
}

const WizardModal = ({
  open,
  close,
  initialData,
}: {
  open: boolean;
  close: () => void;
  initialData: EditableResult[];
}) => {
  const [confirmClose, setConfirmClose] = useState(false);
  const states = [
    { id: "1", component: FileUpload },
    { id: "2", component: ColumnInterpretation },
    { id: "3", component: Preview },
  ];
  const [currentState, wizardData, nextStep, previousStep] = useWizard({
    states: states.length,
    initialData: {
      currentResults: initialData,
      newResults: [] as Partial<NewResults>[],
      results2Modify: [] as Result2Modify[],
      results2Add: [] as Result2Add[],
    },
  });
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
          <div className="flex-grow">
            {states.map((state, index) => {
              if (currentState === index) {
                const Component = state.component;
                return (
                  <Component
                    key={state.id}
                    numberOfStates={states.length}
                    data={wizardData[index]!}
                    nextStep={
                      index === states.length - 1
                        ? (data) => {
                            nextStep(data);
                            previousStep(0);
                            close();
                          }
                        : nextStep
                    }
                    previousStep={previousStep}
                    currentStepIndex={currentState}
                  />
                );
              } else {
                return null;
              }
            })}
          </div>
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
