import InputFile from "components/common/InputFile";
import { useState } from "react";
import WizardForm from "./wizardForm";
import { WizardStateProps } from "components/common/wizard/Wizard";

const FileUpload = <S,>({
  initialData,
  nextStep,
  previousStep,
  stateN,
  currentStepIndex,
}: WizardStateProps<S>) => {
  const [file, setFile] = useState<{ file: Blob; type: string } | null>(null);
  return (
    <WizardForm
      nextStep={() => nextStep(initialData)}
      previousStep={previousStep}
      stateN={stateN}
      currentStepIndex={currentStepIndex}
    >
      <div className="flex flex-col gap-y-4">
        <h2 className="text-center font-unbounded text-6xl pt-4 pb-8">
          Subir Archivo
        </h2>
        <p className="font-monserrat text-2xl">
          Subir un archivos <span className="font-bold">.csv</span>,{" "}
          <span className="font-bold">.xls</span> o{" "}
          <span className="font-bold">.xlsx</span>. Este debe contener la
          primera fila los nombres de las columnas y los resultados en las
          subsiguientes filas. Además, debe contar con las siguientes columnas:
        </p>
        <h3 className="font-unbounded text-3xl">COLUMNAS OBLIGATORIAS</h3>
        <ul className="font-monserrat text-2xl list-inside list-disc">
          <li>DNI</li>
          <li>P1, P2, P3, etc. por cada problema</li>
          <li>Resultado (Aprobado, No aprobado) o Aprobado (Sí,No,AUSENTE)</li>
        </ul>
        <h3 className="font-unbounded text-3xl">COLUMNAS OPCIONALES</h3>
        <p className="font-monserrat text-2xl">
          Estas columnas no son estrictamente necesarias para subir resultados
          pero pueden ayudar a subsanar errores en el archivo
        </p>
        <ul className="font-monserrat text-2xl list-inside list-disc">
          <li>Total (de puntaje)</li>
          <li>Nombre</li>
          <li>Apellido</li>
          <li>Nivel</li>
        </ul>
        <div className="flex justify-center">
          <InputFile
            types={[".csv", ".xls", ".xlsx"]}
            getFile={(file, type) => setFile({ file, type })}
          />
        </div>
      </div>
    </WizardForm>
  );
};

export default FileUpload;
