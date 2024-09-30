"use client";

import { useMemo, useReducer, useState } from "react";
import { EditableResult } from "../../../server/routers/dashboard";
import ModalLoader from "../../Popups/ModalLoader/ModalLoader";
import DashboardResultsTableRow from "./row";
import { trpc } from "../../../utils/trpc";
import { Testdata } from "../../../server/app-router-db-calls";
import Loader from "../../Loader/Loader";
import { TestInfo } from "../../ResultsPage/resultsTypes";
import Select from "../../common/Select";
import { INSTANCIA } from "@prisma/client";

const reducer = (state: Partial<TestInfo>, action: Partial<TestInfo>) => {
  console.log(action);
  return { ...state, ...action };
};

const DashboardResults = ({ tests }: { tests: Testdata[] }) => {
  const dataTree = useMemo(() => {
    return tests.reduce((acc, test) => {
      let competencia = acc[test.competencia];
      if (!competencia) {
        acc[test.competencia] = {};
        competencia = acc[test.competencia];
      }
      let año = competencia[test.año];
      if (!año) {
        competencia[test.año] = {};
        año = competencia[test.año];
      }
      año[test.instancia] = test;
      return acc;
    }, {} as Record<string, any>);
  }, [tests]);
  const [testInfo, dispatch] = useReducer(reducer, {});

  return (
    <>
      <div className="flex gap-x-4 pb-8 border-b border-black mb-4">
        <Select
          label="Competencia"
          options={Object.keys(dataTree)}
          value={testInfo.competencia ? testInfo.competencia : ""}
          onChange={(selected) =>
            selected !== ""
              ? dispatch({
                  competencia: selected,
                  año: undefined,
                  instancia: undefined,
                })
              : dispatch({
                  competencia: undefined,
                  año: undefined,
                  instancia: undefined,
                })
          }
        />
        <Select
          label="Año"
          options={
            testInfo.competencia
              ? Object.keys(dataTree[testInfo.competencia])
              : []
          }
          value={testInfo.año ? testInfo.año.toString() : ""}
          onChange={(selected) =>
            selected !== ""
              ? dispatch({ año: parseInt(selected), instancia: undefined })
              : dispatch({ año: undefined, instancia: undefined })
          }
        />
        <Select
          label="Instancia"
          options={
            testInfo.competencia && testInfo.año
              ? Object.keys(dataTree[testInfo.competencia][testInfo.año])
              : []
          }
          value={testInfo.instancia ? testInfo.instancia : ""}
          onChange={(selected) =>
            selected !== ""
              ? dispatch({ instancia: selected as INSTANCIA })
              : dispatch({ instancia: undefined })
          }
        />
      </div>
      {!testInfo.competencia && !testInfo.año && !testInfo.instancia && (
        <span className="font-montserrat text-3xl">
          Selecciona OMA o ÑANDÚ.
        </span>
      )}
      {testInfo.competencia && testInfo.año && !testInfo.instancia && (
        <span className="font-montserrat text-3xl">
          Selecciona una instancia para ver resultados.
        </span>
      )}
      {testInfo.competencia && !testInfo.año && !testInfo.instancia && (
        <span className="font-montserrat text-3xl">
          Selecciona año e instancia para poder ejecutar una búsqueda.
        </span>
      )}
      {testInfo.competencia && testInfo.año && testInfo.instancia && (
        <DashboardResultsTable
          competencia={testInfo.competencia}
          testData={
            dataTree[testInfo.competencia][testInfo.año][testInfo.instancia]
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
