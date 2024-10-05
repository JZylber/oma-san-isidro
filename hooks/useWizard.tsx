import { useState } from "react";

export interface WizardState {
  id: string;
  component: React.FC;
  data?: any;
}

const useWizard = (states: WizardState[]) => {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const nextStep = () => {
    if (currentStepIndex < states.length) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };
  const previousStep = (step?: number) => {
    if (currentStepIndex > 0) {
      if (step !== undefined && step < currentStepIndex)
        setCurrentStepIndex(step);
      else setCurrentStepIndex(currentStepIndex - 1);
    }
  };
  const currentStep =
    states[Math.max(0, Math.min(currentStepIndex, states.length - 1))];
  return [currentStep, currentStepIndex, nextStep, previousStep] as const;
};

export default useWizard;
