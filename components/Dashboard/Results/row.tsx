import Image from "next/image";
import { EditableResult } from "../../../server/routers/dashboard";
import ResultModal from "../../Popups/ResultModal/ResultModal";
import { useState } from "react";

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
        sin resultados
      </td>
    );
  }
  if (result.aclaracion) {
    return (
      <>
        <td className="p-2 text-center" colSpan={numberOfProblems + 1}>
          {result.aclaracion}
        </td>
        <td className="p-2 text-center">{displayBoolean(result.aprobado)}</td>
      </>
    );
  }
  if (!result.presente) {
    return (
      <td className="p-2 text-center" colSpan={numberOfProblems + 2}>
        ausente
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
  numberOfProblems,
}: {
  result: EditableResult;
  numberOfProblems: number;
}) => {
  const [edit, setEdit] = useState(false);
  return (
    <tr key={result.id_participacion}>
      <td className="p-2 text-center">{result.nivel}</td>
      <td className="p-2">{result.participante.apellido}</td>
      <td className="p-2">{result.participante.nombre}</td>
      <td className="p-2 text-center">{result.participante.dni}</td>
      <td className="p-2">{result.colegio.nombre}</td>
      {displayResult(result.resultados, numberOfProblems)}
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
        open={edit}
        onConfirm={() => {
          setEdit(false);
        }}
        close={() => setEdit(false)}
      />
    </tr>
  );
};

export default DashboardResultsTableRow;
