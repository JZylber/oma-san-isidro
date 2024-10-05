import { Fragment } from "react";

interface WizardProgressProps {
  steps: number;
  currentStep: number;
  clickStep: (step: number) => void;
  className?: string;
}

const WizardProgress = ({
  steps,
  currentStep,
  clickStep,
  className = "",
}: WizardProgressProps) => {
  return (
    <div className={`flex items-center ${className}`}>
      {Array.from({ length: steps }, (_, i) => (
        <Fragment key={i}>
          <div
            onClick={() => clickStep(i)}
            className={`h-20 w-20 box-border relative flex justify-center items-center shrink-0 rounded-xl border-2 border-primary-black font-unbounded text-4xl ${
              i < currentStep
                ? "cursor-pointer bg-primary-light-blue"
                : "pointer-events-none bg-primary-white"
            }`}
          >
            {i > 0 && (
              <div
                className={`absolute -left-[2px] h-4 w-[2px] ${
                  i <= currentStep
                    ? "bg-primary-light-blue"
                    : "bg-primary-white"
                }`}
              ></div>
            )}
            <span>{i + 1}</span>
            {i < steps - 1 && (
              <div
                className={`absolute -right-[2px] h-4 w-[2px] ${
                  i < currentStep ? "bg-primary-light-blue" : "bg-primary-white"
                }`}
              ></div>
            )}
          </div>
          {i < steps - 1 && (
            <div
              className={`h-4 grow box-content border-y-2 border-primary-black ${
                i < currentStep ? "bg-primary-light-blue" : "bg-primary-white"
              }`}
            ></div>
          )}
        </Fragment>
      ))}
    </div>
  );
};

export default WizardProgress;
