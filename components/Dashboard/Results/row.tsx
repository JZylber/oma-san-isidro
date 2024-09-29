import Image from "next/image";
import { EditableResult } from "../../../server/routers/dashboard";
import ResultModal from "../../Popups/ResultModal/ResultModal";
import { useState } from "react";
import { trpc } from "../../../utils/trpc";
import { Testdata } from "../../../app/dashboard/resultados/page";
import ConfirmModal from "../../Popups/ConfirmModal/ConfirmModal";

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
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [testResult, setTestResult] = useState({
    results: result.resultados,
    id: result.id_rinde,
  });
  const hasResults = testResult.results !== null && testResult.id !== null;
  const editResult = trpc.dashboard.editResult.useMutation();
  const newResult = trpc.dashboard.newResult.useMutation();
  const deleteResult = trpc.dashboard.deleteResult.useMutation();
  if (newResult.isSuccess) {
    const results = {
      puntaje: newResult.data.resultados as string[],
      aprobado: newResult.data.aprobado,
      presente: newResult.data.presente,
      aclaracion: newResult.data.aclaracion,
    };
    const resultId = newResult.data.id_rinde;
    setTestResult({ id: resultId, results: results });
    newResult.reset();
  }
  if (editResult.isSuccess) {
    const results = {
      puntaje: editResult.data.resultados as string[],
      aprobado: editResult.data.aprobado,
      presente: editResult.data.presente,
      aclaracion: editResult.data.aclaracion,
    };
    setTestResult({ id: testResult.id, results: results });
    editResult.reset();
  }
  if (deleteResult.isSuccess) {
    setTestResult({ id: null, results: null });
    deleteResult.reset();
  }
  return (
    <tr key={result.id_participacion}>
      <td className="p-2 text-center">{result.nivel}</td>
      <td className="p-2">{result.participante.apellido}</td>
      <td className="p-2">{result.participante.nombre}</td>
      <td className="p-2 text-center">{result.participante.dni}</td>
      <td className="p-2">{result.colegio.nombre}</td>
      {displayResult(testResult.results, testData.numberOfProblems)}
      <td className="p-2 flex justify-center items-center gap-x-4">
        <Image
          src={hasResults ? "/icons/edit.svg" : "/icons/add.svg"}
          alt="editar"
          width={20}
          height={20}
          className="cursor-pointer"
          onClick={() => {
            setEdit(true);
          }}
        />
        {hasResults && (
          <Image
            src="/icons/delete.svg"
            alt="eliminar"
            width={20}
            height={20}
            onClick={() => {
              setConfirmDelete(true);
            }}
            className="cursor-pointer"
          />
        )}
      </td>

      <ResultModal
        result={
          {
            ...result,
            resultados: testResult.results,
            id_rinde: testResult.id,
          } as EditableResult
        }
        numberOfProblems={testData.numberOfProblems}
        open={edit}
        addNewResult={!hasResults}
        onConfirm={(newResults: EditableResult["resultados"]) => {
          if (hasResults && newResults) {
            editResult.mutate({
              id_rinde: testResult.id!,
              puntaje: newResults.puntaje,
              aprobado: newResults.aprobado,
              presente: newResults.presente,
              aclaracion: newResults.aclaracion,
            });
          } else if (!hasResults && newResults) {
            newResult.mutate({
              id_participacion: result.id_participacion,
              id_prueba: testData.id,
              puntaje: newResults.puntaje,
              aprobado: newResults.aprobado,
              presente: newResults.presente,
              aclaracion: newResults.aclaracion,
            });
          }
          setEdit(false);
        }}
        close={() => setEdit(false)}
      />
      <ConfirmModal
        open={confirmDelete}
        close={() => setConfirmDelete(false)}
        onCancel={() => {
          setConfirmDelete(false);
        }}
        onConfirm={() => {
          deleteResult.mutate(testResult.id!);
          setConfirmDelete(false);
        }}
      >
        <div className="px-4 text-2xl font-montserrat">
          <p>
            ¿Estás seguro/a que deseas eliminar el resultado de{" "}
            <span className="font-semibold">
              {result.participante.nombre} {result.participante.apellido}
            </span>
            ?
          </p>
          <p> Esta acción no se puede deshacer.</p>
        </div>
      </ConfirmModal>
    </tr>
  );
};

export default DashboardResultsTableRow;
