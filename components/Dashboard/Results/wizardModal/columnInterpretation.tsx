import WizardForm from "./wizardForm";
import { WizardStateProps } from "./wizardModal";

const ColumnInterpretation = ({
  data,
  nextStep,
  previousStep,
  numberOfStates,
  currentStepIndex,
}: WizardStateProps) => {
  return (
    <WizardForm
      nextStep={nextStep}
      previousStep={previousStep}
      numberOfStates={numberOfStates}
      currentStepIndex={currentStepIndex}
    >
      <p>Interpretación de columnas</p>
    </WizardForm>
  );
};

export default ColumnInterpretation;
