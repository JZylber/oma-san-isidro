import { useReducer, useState } from "react";

export interface WizardState<S> {
  id: string;
  component: React.FC<WizardStateProps<S>>;
}

export interface WizardStateProps<S> {
  initialData: S;
  nextStep: (stepData: S) => void;
  previousStep: (step?: number) => void;
  stateN: number;
  currentStepIndex: number;
}

interface StepData<S> {
  initialData?: S;
  endData?: S;
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
  state: StepData<S>[],
  action: setDataAction<S> | goToStepAction
): StepData<S>[] => {
  switch (action.type) {
    case "SET_DATA":
      return state.map((step, index) => {
        if (index === action.payload.number) {
          return { ...step, endData: action.payload.data };
        } else if (index === action.payload.number + 1) {
          return { ...step, initialData: action.payload.data };
        }
        return step;
      });
    case "GO_TO_STEP":
      return state.map((step, index) => {
        if (index === action.payload) {
          return { ...step, endData: undefined };
        } else if (index > action.payload) {
          return { initialData: undefined, endData: undefined };
        }
        return step;
      });
    default:
      return state;
  }
};

const Wizard = <S,>({
  states,
}: {
  states: WizardState<S>[];
  clear: boolean;
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [wizardData, dispatch] = useReducer(
    wizardReducer<S>,
    states.map(() => ({} as StepData<S>))
  );
  const nextStep = (data: S) => {
    dispatch({ type: "SET_DATA", payload: { number: currentStepIndex, data } });
    if (currentStepIndex < states.length) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };
  const previousStep = (step?: number) => {
    dispatch({ type: "GO_TO_STEP", payload: step ?? currentStepIndex - 1 });
    if (currentStepIndex > 0) {
      if (step !== undefined && step < currentStepIndex)
        setCurrentStepIndex(step);
      else setCurrentStepIndex(currentStepIndex - 1);
    }
  };
  const currentStep =
    states[Math.max(0, Math.min(currentStepIndex, states.length - 1))];
  const currentState = states[currentStepIndex].component;
  return (currentState as React.FC<WizardStateProps<S>>)({
    initialData: wizardData[currentStepIndex].initialData!,
    nextStep,
    previousStep,
    stateN: states.length,
    currentStepIndex,
  });
};

export default Wizard;
