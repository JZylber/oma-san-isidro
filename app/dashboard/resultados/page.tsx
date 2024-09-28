"use client";

import { INSTANCIA } from "@prisma/client";
import { trpc } from "../../../utils/trpc";
import Image from "next/image";

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

const DashboardResultsTable = ({
  results,
  numberOfProblems,
}: {
  results: Result[];
  numberOfProblems: number;
}) => {
  return (
    <div className="border border-black rounded-xl overflow-hidden w-full">
      <table className="w-full border-collapse">
        <thead className="bg-primary-light-blue border-b border-black">
          <tr className="font-unbounded text-2xl">
            <th className="p-2">Nivel</th>
            <th className="p-2">Apellido</th>
            <th className="p-2">Nombre</th>
            <th className="p-2">DNI</th>
            <th className="p-2">Colegio</th>
            {numberOfProblems > 0 ? (
              <>
                {Array.from({ length: numberOfProblems }).map((_, i) => (
                  <th key={i}>P{i + 1}</th>
                ))}
                <th className="p-2">Total</th>
                <th className="p-2">Aprobado</th>
              </>
            ) : (
              <th className="p-2">Resultado</th>
            )}
            <th></th>
          </tr>
        </thead>
        <tbody className="font-montserrat text-xl divide-y">
          {results.map((result) => (
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
                />
                <Image
                  src="/icons/delete.svg"
                  alt="eliminar"
                  width={20}
                  height={20}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DashboardResultsPage;
