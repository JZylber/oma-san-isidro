import Image from "next/image";
import React from "react";
import { EditableResult } from "../../../server/routers/dashboard";
import { Testdata } from "../../../server/app-router-db-calls";

const displayBoolean = (value: boolean) => {
  return value ? "Sí" : "No";
};

const displayResult = (
  result: {
    puntaje: string[];
    aprobado: boolean;
    presente: boolean;
    aclaracion: string | null;
  } | null,
  numberOfProblems: number
) => {
  if (result === null) {
    return (
      <div
        className="text-center col-[span_var(--span)] py-4 px-2"
        style={
          {
            "--span": numberOfProblems > 0 ? numberOfProblems + 2 : 1,
          } as React.CSSProperties
        }
      >
        SIN RESULTADOS
      </div>
    );
  }
  if (result.aclaracion) {
    return (
      <>
        <div
          className="text-center col-[span_var(--span)] py-4 px-2"
          style={
            {
              "--span": numberOfProblems > 0 ? numberOfProblems + 2 : 1,
            } as React.CSSProperties
          }
        >
          {result.aclaracion.toLocaleUpperCase()}
        </div>
      </>
    );
  }
  if (!result.presente) {
    return (
      <div
        className="text-center col-[span_var(--span)] py-4 px-2"
        style={
          {
            "--span": numberOfProblems > 0 ? numberOfProblems + 2 : 1,
          } as React.CSSProperties
        }
      >
        AUSENTE
      </div>
    );
  }
  return (
    <>
      {Object.values(result.puntaje).map((score, i) => (
        <div className="text-center py-4 px-2" key={i}>
          {score}
        </div>
      ))}
      {numberOfProblems > 0 && (
        <div className="text-center py-4 px-2">
          {displayBoolean(result.aprobado)}
        </div>
      )}
    </>
  );
};

const DashboardResultsTableRow = ({
  result,
  testData,
  deleteResult,
  editResult,
}: {
  result: EditableResult;
  testData: Testdata;
  editResult: () => void;
  deleteResult: () => void;
}) => {
  const hasResults =
    result.resultados !== null && result.id_participacion !== null;
  return (
    <>
      <div className="text-center py-4 px-2">{result.nivel}</div>
      <div className="py-4 px-2 truncate">{result.participante.apellido}</div>
      <div className="py-4 px-2 truncate">{result.participante.nombre}</div>
      <div className="py-4 px-2">{result.participante.dni}</div>
      <div className="py-4 px-2 truncate">{`${result.colegio.nombre}${
        result.colegio.sede ? "-" + result.colegio.sede : ""
      }`}</div>
      {displayResult(result.resultados, testData.cantidad_problemas)}
      <div className="py-4 px-2">
        <div className="flex justify-center items-center gap-x-4 w-full h-full">
          <Image
            src={hasResults ? "/icons/edit.svg" : "/icons/add.svg"}
            alt="editar"
            width={24}
            height={24}
            className="cursor-pointer"
            onClick={editResult}
          />
          {hasResults && (
            <Image
              src="/icons/delete.svg"
              alt="eliminar"
              width={24}
              height={24}
              onClick={deleteResult}
              className="cursor-pointer"
            />
          )}
        </div>
      </div>
    </>
  );
};

export default DashboardResultsTableRow;
