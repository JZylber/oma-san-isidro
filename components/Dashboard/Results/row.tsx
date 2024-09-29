import Image from "next/image";
import { EditableResult } from "../../../server/routers/dashboard";
import ResultModal from "../../Popups/ResultModal/ResultModal";
import { useState } from "react";
import { trpc } from "../../../utils/trpc";
import { Testdata } from "../../../app/dashboard/resultados/page";

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
      <td className="p-2 text-center" colSpan={numberOfProblems + 2}>
        SIN RESULTADOS
      </td>
    );
  }
  if (result.aclaracion) {
    return (
      <>
        <td className="p-2 text-center" colSpan={numberOfProblems + 1}>
          {result.aclaracion.toLocaleUpperCase()}
        </td>
        <td className="p-2 text-center">{displayBoolean(result.aprobado)}</td>
      </>
    );
  }
  if (!result.presente) {
    return (
      <td className="p-2 text-center" colSpan={numberOfProblems + 2}>
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
      <td className="p-2 text-center">{displayBoolean(result.aprobado)}</td>
    </>
  );
};

const DashboardResultsTableRow = ({
  result,
  testData,
}: {
  result: EditableResult;
  testData: Testdata;
}) => {
  const [edit, setEdit] = useState(false);
  const editResult = trpc.dashboard.editResult.useMutation();
  return (
    <tr key={result.id_participacion}>
      <td className="p-2 text-center">{result.nivel}</td>
      <td className="p-2">{result.participante.apellido}</td>
      <td className="p-2">{result.participante.nombre}</td>
      <td className="p-2 text-center">{result.participante.dni}</td>
      <td className="p-2">{result.colegio.nombre}</td>
      {displayResult(result.resultados, testData.numberOfProblems)}
      <td className="p-2 flex justify-center items-center gap-x-4">
        <Image
          src="/icons/edit.svg"
          alt="editar"
          width={20}
          height={20}
          className="cursor-pointer"
          onClick={() => {
            setEdit(true);
          }}
        />
        <Image src="/icons/delete.svg" alt="eliminar" width={20} height={20} />
      </td>

      <ResultModal
        result={result}
        numberOfProblems={testData.numberOfProblems}
        open={edit}
        onConfirm={(newResults: EditableResult["resultados"]) => {
          if (result.id_rinde && newResults) {
            editResult.mutate({
              id_rinde: result.id_rinde,
              puntaje: newResults.puntaje,
              aprobado: newResults.aprobado,
              presente: newResults.presente,
              aclaracion: newResults.aclaracion,
            });
            result.resultados = newResults;
          }
          setEdit(false);
        }}
        close={() => setEdit(false)}
      />
    </tr>
  );
};

export default DashboardResultsTableRow;
