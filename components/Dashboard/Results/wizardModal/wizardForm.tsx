import ActionButton from "components/buttons/ActionButton/ActionButton";
import WizardProgress from "components/common/wizard/WizardProgress";
import { ReactNode } from "react";

interface WizardFormProps {
  nextStep: () => void;
  previousStep: (step?: number) => void;
  stateN: number;
  currentStepIndex: number;
  children: ReactNode;
}

const WizardForm = ({
  nextStep,
  previousStep,
  stateN,
  currentStepIndex,
  children,
}: WizardFormProps) => {
  return (
    <form
      onSubmit={nextStep}
      className="flex flex-col gap-y-4 grow overflow-y-scroll"
      noValidate
    >
      <div className="flex justify-center py-8">
        <WizardProgress
          steps={stateN}
          currentStep={currentStepIndex}
          clickStep={(step) => previousStep(step)}
          className="w-2/3"
        />
      </div>
      {children}
      {currentStepIndex < stateN && (
        <div className="flex justify-around w-full mt-auto py-8 border-t">
          <ActionButton
            onClick={previousStep}
            className={
              currentStepIndex === 0 ? "opacity-25 pointer-events-none" : ""
            }
          >
            Anterior
          </ActionButton>
          <ActionButton
            type="submit"
            onClick={() => {}}
            important={currentStepIndex === stateN - 1}
          >
            {currentStepIndex === stateN - 1 ? "Finalizar" : "Siguiente"}
          </ActionButton>
        </div>
      )}
    </form>
  );
};
export default WizardForm;
