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
      <td
        className="p-2 text-center"
        colSpan={numberOfProblems > 0 ? numberOfProblems + 2 : 1}
      >
        SIN RESULTADOS
      </td>
    );
  }
  if (result.aclaracion) {
    return (
      <>
        <td
          className="p-2 text-center"
          colSpan={numberOfProblems > 0 ? numberOfProblems + 2 : 1}
        >
          {result.aclaracion.toLocaleUpperCase()}
        </td>
      </>
    );
  }
  if (!result.presente) {
    return (
      <td
        className="p-2 text-center"
        colSpan={numberOfProblems > 0 ? numberOfProblems + 2 : 1}
      >
        AUSENTE
      </td>
    );
  }
  return (
    <>
      {Object.values(result.puntaje).map((score, i) => (
        <td className="p-2 text-center" key={i}>
          {score}
        </td>
      ))}
      {numberOfProblems > 0 && (
        <td className="p-2 text-center">{displayBoolean(result.aprobado)}</td>
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
    <tr className="text-2xl" key={result.id_participacion}>
      <td className="p-2 text-center">{result.nivel}</td>
      <td className="p-2">{result.participante.apellido}</td>
      <td className="p-2">{result.participante.nombre}</td>
      <td className="p-2 text-center">{result.participante.dni}</td>
      <td className="p-2">{result.colegio.nombre}</td>
      {displayResult(result.resultados, testData.cantidad_problemas)}
      <td className="p-2 flex justify-center items-center gap-x-4">
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
      </td>
    </tr>
  );
};

export default DashboardResultsTableRow;
