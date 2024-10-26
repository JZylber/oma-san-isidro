import { useReducer, useState } from "react";

export interface WizardState<S> {
  id: string;
}

interface setDataAction<S> {
  type: "SET_DATA";
  payload: { number: number; data: S };
}

interface goToStepAction {
  type: "GO_TO_STEP";
  payload: number;
}

const wizardReducer = <S,>(
  state: Array<S | undefined>,
  action: setDataAction<S> | goToStepAction
): Array<S | undefined> => {
  switch (action.type) {
    case "SET_DATA":
      return state.map((step, index) => {
        if (index === action.payload.number + 1) {
          return action.payload.data;
        }
        return step;
      });
    case "GO_TO_STEP":
      return state.map((step, index) => {
        if (index > action.payload) {
          return undefined;
        }
        return step;
      });
    default:
      return state;
  }
};

const useWizard = <S,>({
  states,
  initialData,
}: {
  states: number;
  initialData: S;
}) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [wizardData, dispatch] = useReducer(
    wizardReducer<S>,
    ([initialData] as Array<S | undefined>).concat(
      Array.from({ length: states - 1 }, () => undefined) as Array<
        S | undefined
      >
    )
  );
  const nextStep = (data: S) => {
    dispatch({ type: "SET_DATA", payload: { number: currentStep, data } });
    if (currentStep < states) {
      setCurrentStep(currentStep + 1);
    }
  };
  const previousStep = (step?: number) => {
    dispatch({ type: "GO_TO_STEP", payload: step ?? currentStep - 1 });
    if (currentStep > 0) {
      if (step !== undefined && step < currentStep) setCurrentStep(step);
      else setCurrentStep(currentStep - 1);
    }
  };
  return [currentStep, wizardData, nextStep, previousStep] as const;
};

export default useWizard;
