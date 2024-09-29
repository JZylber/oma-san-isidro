"use client";

import { useMemo, useReducer, useState } from "react";
import { EditableResult } from "../../../server/routers/dashboard";
import ModalLoader from "../../Popups/ModalLoader/ModalLoader";
import DashboardResultsTableRow from "./row";
import { trpc } from "../../../utils/trpc";
import { Testdata } from "../../../server/app-router-db-calls";
import Loader from "../../Loader/Loader";
import ResultFinderForm from "../../ResultsPage/resultFinderForm";
import { TestInfo, yearTests } from "../../ResultsPage/resultsTypes";

const reducer = (state: Partial<TestInfo>, action: Partial<TestInfo>) => {
  return { ...state, ...action };
};

const DashboardResults = ({
  competencia,
  tests,
}: {
  competencia: string;
  tests: Testdata[];
}) => {
  const [testInfo, dispatch] = useReducer(reducer, {
    competencia: competencia,
  });
  const availableResults = useMemo(
    () =>
      tests.reduce((acc, test) => {
        const year = acc.find((y) => y.ano === test.año);
        if (year) {
          year.pruebas.push({
            nombre: test.instancia,
            disponible: test.resultados_disponibles,
          });
        } else {
          acc.push({
            ano: test.año,
            pruebas: [
              {
                nombre: test.instancia,
                disponible: test.resultados_disponibles,
              },
            ],
          });
        }
        return acc;
      }, [] as yearTests[]),
    [tests]
  );
  return (
    <>
      <ResultFinderForm
        availableResults={availableResults}
        data={testInfo}
        setData={dispatch}
      />
      {testInfo.año && !testInfo.instancia && (
        <span className="font-montserrat text-3xl">
          Selecciona una instancia para ver resultados.
        </span>
      )}
      {!testInfo.año && !testInfo.instancia && (
        <span className="font-montserrat text-3xl">
          Selecciona año e instancia para poder ejecutar una búsqueda.
        </span>
      )}
      {testInfo.año && testInfo.instancia && (
        <DashboardResultsTable
          competencia={competencia}
          testData={
            tests.find(
              (test) =>
                test.año === testInfo.año &&
                test.instancia === testInfo.instancia
            )!
          }
        />
      )}
    </>
  );
};

interface DashboardResultsTableProps {
  competencia: string;
  testData: Testdata;
}

const DashboardResultsTable = ({
  competencia,
  testData,
}: DashboardResultsTableProps) => {
  const results = trpc.dashboard.getResults.useQuery({
    año: testData.año,
    instancia: testData.instancia,
    competencia: competencia,
  });
  return (
    <div className="min-h-full flex flex-col">
      {results.isLoading && (
        <div className="grow flex items-center justify-center">
          <Loader />
        </div>
      )}
      {results.isError && (
        <div className="grow flex items-center justify-center">
          <span>{results.error.data?.httpStatus}</span>
        </div>
      )}
      {results.isSuccess && (
        <DashboardResultsTableDisplay
          results={results.data}
          testData={testData}
        />
      )}
    </div>
  );
};

const DashboardResultsTableDisplay = ({
  results,
  testData,
}: {
  results: EditableResult[];
  testData: Testdata;
}) => {
  const [loading, setLoading] = useState(false);
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
            {testData.cantidad_problemas > 0 ? (
              <>
                {Array.from({ length: testData.cantidad_problemas }).map(
                  (_, i) => (
                    <th key={i}>P{i + 1}</th>
                  )
                )}
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
          {results.map((result, i) => (
            <DashboardResultsTableRow
              key={i}
              result={result}
              testData={testData}
              isUpdating={(updating) => {
                setLoading(updating);
              }}
            />
          ))}
        </tbody>
      </table>
      <ModalLoader isOpen={loading} />
    </div>
  );
};

export default DashboardResults;
