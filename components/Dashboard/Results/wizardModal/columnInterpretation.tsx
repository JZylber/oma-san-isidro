import WizardForm from "./wizardForm";
import { WizardStateProps } from "./wizardModal";

const ColumnInterpretation = ({
  data,
  nextStep,
  previousStep,
  numberOfStates,
  currentStepIndex,
}: WizardStateProps) => {
  console.log(data);
  return (
    <WizardForm
      nextStep={(e) => {}}
      previousStep={previousStep}
      numberOfStates={numberOfStates}
      currentStepIndex={currentStepIndex}
    >
      <p>Interpretación de columnas</p>
    </WizardForm>
  );
};

export default ColumnInterpretation;
