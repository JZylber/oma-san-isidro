"use client";

import { INSTANCIA } from "@prisma/client";
import { trpc } from "../../../utils/trpc";

interface Result {
  id_participacion: number;
  participante: {
    nombre: string;
    apellido: string;
    dni: number;
  };
  colegio: {
    nombre: string;
    sede: string | null;
  };
  nivel: number;
  resultados: {
    puntaje: string[];
    aprobado: boolean;
    presente: boolean;
    aclaracion: string | null;
  } | null;
}

const DashboardResultsPage = () => {
  const results = trpc.dashboard.getResults.useQuery({
    año: 2024,
    instancia: "REGIONAL" as INSTANCIA,
    competencia: "ÑANDÚ",
  });
  const numberOfProblems = 3;
  if (results.isLoading) {
    return <span>Cargando...</span>;
  } else if (results.isError) {
    return <span>{results.error.data?.httpStatus}</span>;
  } else if (results.isSuccess)
    return (
      <DashboardResultsTable
        results={results.data}
        numberOfProblems={numberOfProblems}
      />
    );
};

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
    return <td colSpan={numberOfProblems + 2}>sin resultados</td>;
  }
  if (result.aclaracion) {
    return (
      <>
        <td colSpan={numberOfProblems + 1}>{result.aclaracion}</td>
        <td>{displayBoolean(result.aprobado)}</td>
      </>
    );
  }
  if (!result.presente) {
    return (
      <>
        <td colSpan={numberOfProblems + 1}>ausente</td>
        <td>{displayBoolean(result.aprobado)}</td>
      </>
    );
  }
  return (
    <>
      {Object.values(result.puntaje).map((score, i) => (
        <td key={i}>{score}</td>
      ))}
      <td>{displayBoolean(result.aprobado)}</td>
    </>
  );
};

const DashboardResultsTable = ({
  results,
  numberOfProblems,
}: {
  results: Result[];
  numberOfProblems: number;
}) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Nivel</th>
          <th>Apellido</th>
          <th>Nombre</th>
          <th>DNI</th>
          <th>Colegio</th>
          <th>Sede</th>
          {numberOfProblems > 0 ? (
            <>
              {Array.from({ length: numberOfProblems }).map((_, i) => (
                <th key={i}>P{i + 1}</th>
              ))}
              <th>Total</th>
              <th>Aprobado</th>
            </>
          ) : (
            <th>Resultado</th>
          )}
        </tr>
      </thead>
      <tbody>
        {results.map((result) => (
          <tr key={result.id_participacion}>
            <td>{result.nivel}</td>
            <td>{result.participante.apellido}</td>
            <td>{result.participante.nombre}</td>
            <td>{result.participante.dni}</td>
            <td>{result.colegio.nombre}</td>
            <td>{result.colegio.sede}</td>
            {displayResult(result.resultados, numberOfProblems)}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DashboardResultsPage;
