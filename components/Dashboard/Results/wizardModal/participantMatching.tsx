import WizardForm from "./wizardForm";
import { WizardStateProps } from "./wizardModal";

const ParticipantMatching = ({
  data,
  nextStep,
  previousStep,
  numberOfStates,
  currentStepIndex,
}: WizardStateProps) => {
  return (
    <WizardForm
      nextStep={(e) => {}}
      previousStep={previousStep}
      numberOfStates={numberOfStates}
      currentStepIndex={currentStepIndex}
    >
      <p>Emparejamiento de participantes</p>
    </WizardForm>
  );
};

export default ParticipantMatching;
