import WizardForm from "./wizardForm";
import { WizardStateProps } from "./wizardModal";

const Preview = ({
  data,
  nextStep,
  previousStep,
  numberOfStates,
  currentStepIndex,
}: WizardStateProps) => {
  return (
    <WizardForm
      nextStep={() => nextStep(data)}
      previousStep={previousStep}
      numberOfStates={numberOfStates}
      currentStepIndex={currentStepIndex}
    >
      <p>Previsualización</p>
    </WizardForm>
  );
};

export default Preview;
