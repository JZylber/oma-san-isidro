import { useState } from "react";

interface WizardState<S> {
  id: string;
  component: React.FC;
}

const useWizard = <S,>(states: WizardState<S>[]) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [data, setData] = useState<S>();
  const nextStep = () => {
    if (currentStepIndex < states.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };
  const previousStep = (step?: number) => {
    if (currentStepIndex > 0) {
      if (step && step < currentStepIndex && step >= 0)
        setCurrentStepIndex(step);
      else setCurrentStepIndex(currentStepIndex - 1);
    }
  };
  const currentStep = states[currentStepIndex];
  return [currentStep, currentStepIndex, nextStep, previousStep, data, setData];
};

export default useWizard;
