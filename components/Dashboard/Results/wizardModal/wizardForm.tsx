import ActionButton from "components/buttons/ActionButton/ActionButton";
import WizardProgress from "components/common/wizard/WizardProgress";
import next from "next";
import { ReactNode } from "react";

interface WizardFormProps<S> {
  nextStep: (data: S) => void;
  previousStep: (step?: number) => void;
  numberOfStates: number;
  currentStepIndex: number;
  children: ReactNode;
}

const WizardForm = <S,>({
  nextStep,
  previousStep,
  numberOfStates: stateN,
  currentStepIndex,
  children,
}: WizardFormProps<S>) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        nextStep({} as S);
      }}
      className="flex flex-col gap-y-4 overflow-y-scroll min-h-full"
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
