import InputFile from "components/common/InputFile";
import { useEffect, useState } from "react";
import WizardForm from "./wizardForm";
import { WizardStateProps } from "./wizardModal";
import { read, utils } from "xlsx";
import Image from "next/image";

interface DataKeys {
  dni?: string;
  p?: string[];
  result?: string;
  total?: string;
  name?: string;
  lastName?: string;
  level?: string;
}

const displayValidKey = (key: string, valid: boolean) => {
  return (
    <li
      className={`flex w-2/3 items-center justify-between ${
        valid ? "" : "text-red-500"
      }`}
    >
      <span>{key}</span>
      <Image
        src={`/icons/${valid ? "check" : "close"}.svg`}
        width={28}
        height={28}
        alt={valid ? "si" : "no"}
      />
    </li>
  );
};

const FileUpload = ({
  data,
  nextStep,
  previousStep,
  numberOfStates,
  currentStepIndex,
}: WizardStateProps) => {
  const numberOfProblems = 3;
  const [file, setFile] = useState<{ file: ArrayBuffer; type: string } | null>(
    null
  );
  const [fileData, setFileData] = useState<any>(null);
  const [header, setHeader] = useState<string[] | null>();
  const keys: DataKeys | null = header
    ? {
        dni: header.find((h) => h.toLowerCase() === "dni") || undefined,
        p: header.filter(
          (h) =>
            h
              .toLowerCase()
              .match(new RegExp(String.raw`p[1-${numberOfProblems}]+`, "g")) !==
            null
        ),
        result:
          header.find(
            (h) =>
              h.toLowerCase().includes("resultado") ||
              h.toLowerCase().includes("aprobado")
          ) || undefined,
        total:
          header.find((h) => h.toLowerCase().includes("total")) || undefined,
        name:
          header.find((h) => h.toLowerCase().includes("nombre")) || undefined,
        lastName:
          header.find((h) => h.toLowerCase().includes("apellido")) || undefined,
        level:
          header.find((h) => h.toLowerCase().includes("nivel")) || undefined,
      }
    : null;
  const validKeys = {
    dni: keys?.dni ? true : false,
    p: keys?.p?.length === numberOfProblems,
    result: keys?.result ? true : false,
    total: keys?.total ? true : false,
    name: keys?.name ? true : false,
    lastName: keys?.lastName ? true : false,
    level: keys?.level ? true : false,
  };

  useEffect(() => {
    if (file && file.type !== ".csv") {
      const workbook = read(file.file, { type: "array" });
      const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
      const data = utils.sheet_to_json(firstSheet, {
        blankrows: false,
        header: 1,
      }) as any[];
      const header = data[0];
      setHeader(header);
    }
    if (!file) {
      setHeader(null);
      setFileData(null);
    }
  }, [file]);

  return (
    <WizardForm
      nextStep={nextStep}
      previousStep={previousStep}
      numberOfStates={numberOfStates}
      currentStepIndex={currentStepIndex}
    >
      <div className="flex flex-col gap-y-4 px-8">
        <h2 className="text-center font-unbounded text-6xl pt-4 pb-8">
          Subir Archivo
        </h2>
        <p className="font-montserrat text-2xl">
          Subir un archivos <span className="font-bold">.csv</span>,{" "}
          <span className="font-bold">.xls</span> o{" "}
          <span className="font-bold">.xlsx</span>. Este debe contener la
          primera fila los nombres de las columnas y los resultados en las
          subsiguientes filas. Además, debe contar con las siguientes columnas:
        </p>
        <h3 className="font-unbounded text-3xl">COLUMNAS OBLIGATORIAS</h3>
        <ul className="font-montserrat text-2xl list-inside list-disc">
          <li>DNI</li>
          <li>P1, P2, P3, etc. por cada problema</li>
          <li>Resultado (Aprobado, No aprobado) o Aprobado (Sí,No,AUSENTE)</li>
        </ul>
        <h3 className="font-unbounded text-3xl">COLUMNAS OPCIONALES</h3>
        <p className="font-montserrat text-2xl">
          Estas columnas no son estrictamente necesarias para subir resultados
          pero pueden ayudar a subsanar errores en el archivo
        </p>
        <ul className="font-montserrat text-2xl list-inside list-disc">
          <li>Total (de puntaje)</li>
          <li>Nombre</li>
          <li>Apellido</li>
          <li>Nivel</li>
        </ul>
        <div className="flex justify-center">
          <InputFile
            types={[".csv", ".xls", ".xlsx"]}
            getFile={(file) => setFile(file)}
          />
        </div>
        {header && (
          <div className="flex pt-8">
            <div className="grow flex flex-col gap-y-4">
              <h3 className="font-unbounded text-3xl text-center">
                COLUMNAS OBLIGATORIAS
              </h3>
              <ul className="font-montserrat text-3xl flex flex-col items-center">
                {displayValidKey("DNI", validKeys.dni)}
                {displayValidKey("Problemas", validKeys.p)}
                {displayValidKey("Resultado", validKeys.result)}
              </ul>
            </div>
            <div className="grow flex flex-col gap-y-4 ">
              <h3 className="font-unbounded text-3xl text-center">
                COLUMNAS OPCIONALES
              </h3>
              <ul className="font-montserrat text-3xl flex flex-col items-center">
                {displayValidKey("Total", validKeys.total)}
                {displayValidKey("Nombre", validKeys.name)}
                {displayValidKey("Apellido", validKeys.lastName)}
                {displayValidKey("Nivel", validKeys.level)}
              </ul>
            </div>
          </div>
        )}
      </div>
    </WizardForm>
  );
};

export default FileUpload;
