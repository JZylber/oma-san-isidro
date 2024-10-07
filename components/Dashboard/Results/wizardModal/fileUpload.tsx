import InputFile from "components/common/InputFile";
import React, { FormEventHandler, useEffect, useState } from "react";
import WizardForm from "./wizardForm";
import { WizardStateProps } from "./wizardModal";
import { read, utils } from "xlsx";
import Image from "next/image";
import Warning from "components/Warning/Warning";
import WarningModal from "components/Popups/WarningModal/WarningModal";

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

const problem2Number = (problem?: string) => {
  if (problem === undefined) return 0;
  let number = parseFloat(problem);
  if (!isNaN(number)) return number;
  const fractionRegex = /(\d+)\/(\d+)/;
  const fraction = problem.match(fractionRegex);
  if (fraction) {
    const numerator = parseFloat(fraction[0]);
    const denominator = parseFloat(fraction[2]);
    return numerator / denominator;
  }
  const minusRegex = /(\d+)(-)+/;
  const minus = problem.match(minusRegex);
  if (minus) {
    return parseFloat(minus[0]);
  }
  if (problem.trim() === "") return 0;
  return null;
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
  const [errors, setErrors] = useState<string[]>([]);
  const keys: DataKeys | null = header
    ? {
        dni:
          header.find(
            (h) => typeof h === "string" && h.toLowerCase() === "dni"
          ) || undefined,
        p: header.filter(
          (h) =>
            typeof h === "string" &&
            h
              .toLowerCase()
              .match(new RegExp(String.raw`p[1-${numberOfProblems}]+`, "g")) !==
              null
        ),
        result:
          header.find(
            (h) =>
              typeof h === "string" &&
              (h.toLowerCase().includes("resultado") ||
                h.toLowerCase().includes("aprobado"))
          ) || undefined,
        total:
          header.find(
            (h) => typeof h === "string" && h.toLowerCase().includes("total")
          ) || undefined,
        name:
          header.find(
            (h) => typeof h === "string" && h.toLowerCase().includes("nombre")
          ) || undefined,
        lastName:
          header.find(
            (h) => typeof h === "string" && h.toLowerCase().includes("apellido")
          ) || undefined,
        level:
          header.find(
            (h) => typeof h === "string" && h.toLowerCase().includes("nivel")
          ) || undefined,
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
  const automaticTotalCalculation = (result: any, index: number) => {
    return Array.from(
      { length: numberOfProblems },
      (_, i) => result[keys!.p![i]]
    ).reduce((acc, p) => {
      const number = problem2Number(p);
      if (number !== null) {
        return acc + number;
      } else
        throw new Error(
          `Hubo un error al calcular el total en la fila ${index + 2}`
        );
    }, 0);
  };
  const validateFile = () => {
    if (!file) {
      setErrors(["No se ha seleccionado un archivo"]);
      return null;
    }
    if (!header) {
      setErrors(["No se ha podido leer el archivo"]);
      return null;
    }
    if (["dni", "p", "result"].some((k) => !validKeys[k as keyof DataKeys])) {
      const missingColumns = ["dni", "p", "result"]
        .filter((k) => !validKeys[k as keyof DataKeys])
        .map((k) => {
          switch (k) {
            case "dni":
              return "DNI";
            case "p":
              return "Problemas (P1, P2, P3, etc.)";
            case "result":
              return "Resultado";
          }
        });
      setErrors([...missingColumns.map((c) => `Falta la columna ${c}`)]);
      return null;
    }
    if (!keys) return null;
    let foundErrors: string[] = [];
    const data = fileData.map((d: any, index: number) => {
      try {
        const newResults = {
          rawData: d,
          dni: d[keys.dni!],
          problems: keys.p!.map((p) => d[p]),
          result: d[keys.result!],
          total: keys.total
            ? d[keys.total]
            : automaticTotalCalculation(d, index),
          name: keys.name ? d[keys.name] : undefined,
          lastName: keys.lastName ? d[keys.lastName] : undefined,
          level: keys.level ? d[keys.level] : undefined,
        };
        return newResults;
      } catch (error) {
        let message;
        if (error instanceof Error) {
          message = error.message;
          foundErrors = [...foundErrors, message];
        } else
          foundErrors = [
            ...foundErrors,
            `Hubo un error desconocido al procesar la fila ${index + 2}`,
          ];
        return null;
      }
    });
    if (foundErrors.length > 0) {
      setErrors(foundErrors);
      return null;
    }
    return data;
  };

  useEffect(() => {
    if (file && file.type !== ".csv") {
      const workbook = read(file.file, { type: "array" });
      const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
      const data = utils.sheet_to_json(firstSheet, {
        header: 1,
      }) as any[];
      const header = data[0];
      setHeader(header);
      const jsonData = utils.sheet_to_json(firstSheet, {
        blankrows: false,
      });
      setFileData(jsonData);
    }
    if (!file) {
      setHeader(null);
      setFileData(null);
      setErrors([]);
    }
  }, [file]);
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const validation = validateFile();
    if (validation) {
      nextStep({
        currentResults: data!.currentResults,
        newResults: validation,
      });
    }
  };
  return (
    <WizardForm
      nextStep={handleSubmit}
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
          <>
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

            {!validKeys.total && (
              <div className="flex justify-center">
                {" "}
                <Warning className="w-5/6">
                  <p className="font-montserrat text-3xl">
                    Al no haber columna de total, los totales se van a intentar
                    calcular automáticamente. Si no querés que eso ocurra,
                    incluí una columna de total.
                  </p>
                </Warning>
              </div>
            )}
          </>
        )}
        <WarningModal open={errors.length > 0} close={() => setErrors([])}>
          <div className="flex flex-col gap-y-4 p-4">
            <h2 className="text-4xl text-center font-unbounded">
              Hubo errores al procesar el archivo
            </h2>
            <ul className="font-montserrat text-2xl">
              {errors.map((e, index) => (
                <li key={index}>{e}</li>
              ))}
            </ul>
          </div>
        </WarningModal>
      </div>
    </WizardForm>
  );
};

export default FileUpload;
