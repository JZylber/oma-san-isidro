"use client";

import React, { useMemo, useReducer, useState } from "react";
import { EditableResult } from "../../../server/routers/dashboard";
import ModalLoader from "../../Popups/ModalLoader/ModalLoader";
import DashboardResultsTableRow from "./row";
import { trpc } from "../../../utils/trpc";
import { Testdata } from "../../../server/app-router-db-calls";
import Loader from "../../Loader/Loader";
import { Result, TestInfo } from "../../ResultsPage/resultsTypes";
import Select from "../../common/Select";
import { INSTANCIA } from "@prisma/client";
import ResultModal from "../../Popups/ResultModal/ResultModal";
import ConfirmModal from "../../Popups/ConfirmModal/ConfirmModal";
import useFilter from "hooks/useFilter";
import {
  FilterableObject,
  ObjectWithFilterables,
  Participant,
  School,
} from "hooks/types";
import ResultFilterForm from "components/ResultsPage/resultFilterForm";

const reducer = (state: Partial<TestInfo>, action: Partial<TestInfo>) => {
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
      <div className="pb-8 border-b border-black mb-4 w-full">
        <div className="flex gap-x-4 w-3/4">
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
          testData={
            dataTree[testInfo.competencia][testInfo.año][testInfo.instancia]
          }
        />
      )}
    </>
  );
};

interface DashboardResultsTableProps {
  testData: Testdata;
}

const DashboardResultsTable = ({ testData }: DashboardResultsTableProps) => {
  const results = trpc.dashboard.getResults.useQuery(
    {
      año: testData.año,
      instancia: testData.instancia,
      competencia: testData.competencia,
    },
    { notifyOnChangeProps: "all", refetchInterval: 0 }
  );
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
  const [edit, setEdit] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [result, setResult] = useState<EditableResult>({} as EditableResult);
  const filterableResults = results.map((r) => {
    return {
      filterable: {
        nivel: r.nivel,
        colegio: new School(
          r.colegio.nombre,
          r.colegio.sede ? r.colegio.sede : undefined
        ),
        participante: new Participant(
          r.participante.nombre,
          r.participante.apellido
        ),
        aprobado: r.resultados ? r.resultados.aprobado : false,
      },
      payload: r,
    } as ObjectWithFilterables<any>;
  });
  const [resultFilter, updateFilter, filtered_results, options] =
    useFilter(filterableResults);
  const hasResults =
    result.resultados !== null && result.id_participacion !== null;
  const editResult = trpc.dashboard.editResult.useMutation({
    onMutate: () => {
      setLoading(true);
    },
    onSettled: () => {
      setLoading(false);
    },
    onSuccess: (data) => {
      const newResults = {
        puntaje: data.resultados as string[],
        aprobado: data.aprobado,
        presente: data.presente,
        aclaracion: data.aclaracion,
      };
      results.find((r) => r.id_rinde === data.id_rinde)!.resultados =
        newResults;
    },
  });
  const newResult = trpc.dashboard.newResult.useMutation({
    onMutate: () => {
      setLoading(true);
    },
    onSettled: () => {
      setLoading(false);
    },
    onSuccess: (data) => {
      const newResults = {
        puntaje: data.resultados as string[],
        aprobado: data.aprobado,
        presente: data.presente,
        aclaracion: data.aclaracion,
      };
      const oldResult = results.find(
        (r) => r.id_participacion === data.id_participacion
      );
      if (oldResult) {
        oldResult.resultados = newResults;
        oldResult.id_rinde = data.id_rinde;
      }
      setResult({} as EditableResult);
    },
  });
  const deleteResult = trpc.dashboard.deleteResult.useMutation({
    onMutate: () => {
      setLoading(true);
    },
    onSettled: () => {
      setLoading(false);
    },
    onSuccess: (data) => {
      const oldResult = results.find(
        (r) => r.id_participacion === data.id_participacion
      );
      if (oldResult) {
        oldResult.resultados = null;
        oldResult.id_rinde = null;
      }
      setResult({} as EditableResult);
    },
  });
  const editResultHandler = (result: EditableResult) => {
    setResult(result);
    setEdit(true);
  };
  const deleteResultHandler = (result: EditableResult) => {
    setResult(result);
    setConfirmDelete(true);
  };
  return (
    <>
      <div className="mb-8">
        <ResultFilterForm
          filters={resultFilter}
          updateFilter={updateFilter}
          schools={options.colegio}
          levels={options.nivel}
          names={options.participante}
          passed={options.aprobado}
        />
      </div>
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
            {filtered_results.map((result, i) => (
              <DashboardResultsTableRow
                key={i}
                result={result.payload!}
                testData={testData}
                editResult={() => editResultHandler(result.payload)}
                deleteResult={() => deleteResultHandler(result)}
              />
            ))}
          </tbody>
        </table>
        <ResultModal
          result={result}
          numberOfProblems={testData.cantidad_problemas}
          open={edit}
          addNewResult={!hasResults}
          onConfirm={(newResults: EditableResult["resultados"]) => {
            if (hasResults && newResults) {
              setLoading(true);
              editResult.mutate({
                id_rinde: result.id_rinde,
                puntaje: newResults.puntaje,
                aprobado: newResults.aprobado,
                presente: newResults.presente,
                aclaracion: newResults.aclaracion,
              });
            } else if (!hasResults && newResults) {
              setLoading(true);
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
            deleteResult.mutate(result.id_rinde!);
            setConfirmDelete(false);
          }}
        >
          <div className="px-4 text-2xl font-montserrat">
            <p>
              ¿Estás seguro/a que deseas eliminar el resultado de{" "}
              {result.participante && (
                <span className="font-semibold">
                  {result.participante.nombre} {result.participante.apellido}
                </span>
              )}
              ?
            </p>
            <p> Esta acción no se puede deshacer.</p>
          </div>
        </ConfirmModal>
        <ModalLoader isOpen={loading} />
      </div>
    </>
  );
};

export default DashboardResults;
