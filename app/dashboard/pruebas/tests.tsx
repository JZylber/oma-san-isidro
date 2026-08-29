"use client";

import { inferRouterOutputs } from "@trpc/server";
import ActionButton from "components/buttons/ActionButton/ActionButton";
import Select from "components/common/form/Select";
import Loader from "components/Loader/Loader";
import ConfirmModal from "components/Popups/ConfirmModal/ConfirmModal";
import WarningModal from "components/Popups/WarningModal/WarningModal";
import Table from "components/Table/Table";
import Image from "next/image";
import { Fragment, useState } from "react";
import { AppRouter } from "server/routers/_app";
import { parseCriteria } from "server/routers/results/qualification/criteria";
import { trpc } from "utils/trpc";
import { describeTestDependencies } from "utils/testDependencies";
import TestModal from "./TestModal";
import {
  displayDate,
  displayDuration,
  sortedInstances,
  TestDraft,
  timeInputValue,
} from "./testFields";

type Unpacked<T> = T extends (infer U)[] ? U : T;
type Test = Unpacked<inferRouterOutputs<AppRouter>["dashboard"]["getTests"]>;

// Select muestra "-" cuando el valor es falsy, así que "sin filtro" tiene que
// ser un valor real y no una cadena vacía.
const ALL = "Todos";

const toDraft = (test: Test): TestDraft => ({
  id_prueba: test.id_prueba,
  fecha: test.fecha,
  instancia: test.instancia,
  id_competencia: test.id_competencia,
  cantidad_problemas: test.cantidad_problemas,
  fecha_limite_autorizacion: test.fecha_limite_autorizacion,
  resultados_disponibles: test.resultados_disponibles,
  hora_ingreso: test.hora_ingreso,
  duracion: test.duracion,
  criterio_habilitacion:
    test.criterio_habilitacion === null
      ? null
      : parseCriteria(test.criterio_habilitacion),
});

const DashboardTests = () => {
  const tests = trpc.dashboard.getTests.useQuery(undefined, {
    refetchInterval: 0,
  });
  const competitions = trpc.dashboard.getCompetitions.useQuery(undefined, {
    refetchInterval: 0,
  });
  const updateTest = trpc.dashboard.setTest.useMutation();
  const deleteTest = trpc.dashboard.deleteTest.useMutation();
  const [openModal, setOpenModal] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [warning, setWarning] = useState<string | null>(null);
  const [currentTest, setCurrentTest] = useState<Test | undefined>(undefined);
  const [yearFilter, setYearFilter] = useState<string | null>(null);
  const [competitionFilter, setCompetitionFilter] = useState(ALL);
  const [instanceFilter, setInstanceFilter] = useState(ALL);
  if (
    tests.isLoading ||
    tests.isRefetching ||
    competitions.isLoading ||
    competitions.isRefetching
  )
    return <Loader />;
  if (tests.isError) return <div>Error: {tests.error.message}</div>;
  if (competitions.isError)
    return <div>Error: {competitions.error.message}</div>;
  if (tests.isSuccess && competitions.isSuccess) {
    const years = Array.from(
      new Set(tests.data.map((test) => test.competencia.ano))
    )
      .sort((a, b) => b - a)
      .map((year) => `${year}`);
    const currentYear = `${new Date().getFullYear()}`;
    // Arranca en el año en curso, salvo que todavía no haya pruebas cargadas
    // para ese año: en ese caso mostrar todo es más útil que una tabla vacía.
    const year = yearFilter ?? (years.includes(currentYear) ? currentYear : ALL);
    const competitionTypes = Array.from(
      new Set(tests.data.map((test) => test.competencia.tipo))
    ).sort();
    const instances = sortedInstances(
      Array.from(new Set(tests.data.map((test) => test.instancia)))
    );
    const filtered = tests.data.filter(
      (test) =>
        (year === ALL || `${test.competencia.ano}` === year) &&
        (competitionFilter === ALL ||
          test.competencia.tipo === competitionFilter) &&
        (instanceFilter === ALL || test.instancia === instanceFilter)
    );
    const askDelete = (test: Test) => {
      const blockers = describeTestDependencies(test._count);
      if (blockers) {
        setWarning(`No se puede eliminar: la prueba tiene ${blockers}.`);
        return;
      }
      setCurrentTest(test);
      setConfirmDelete(true);
    };
    return (
      <div>
        <div className="flex py-2">
          <ActionButton
            onClick={() => {
              setCurrentTest(undefined);
              setOpenModal(true);
            }}
            important
            className="!w-[120px] flex justify-around items-center"
          >
            <span className="font-unbounded">NUEVA</span>
            <Image src="/icons/add.svg" alt="sumar" width={24} height={24} />
          </ActionButton>
        </div>
        <form className="flex gap-x-4 py-2">
          <Select
            label="Año"
            options={[ALL, ...years]}
            value={year}
            onChange={setYearFilter}
          />
          <Select
            label="Competencia"
            options={[ALL, ...competitionTypes]}
            value={competitionFilter}
            onChange={setCompetitionFilter}
          />
          <Select
            label="Instancia"
            options={[ALL, ...instances]}
            value={instanceFilter}
            onChange={setInstanceFilter}
          />
        </form>
        <Table
          values={filtered}
          allValues={tests.data}
          headers={[
            "Fecha",
            "Competencia",
            "Instancia",
            "Problemas",
            "Ingreso",
            "Duración",
            "Resultados",
            "Acciones",
          ]}
          elements_per_page={10}
          make_element={(test, index) => {
            return (
              <Fragment key={index}>
                <div className="py-4 px-2 truncate">
                  {displayDate(test.fecha)}
                </div>
                <div className="py-4 px-2 truncate">
                  {`${test.competencia.tipo} ${test.competencia.ano}`}
                </div>
                <div className="py-4 px-2 truncate">{test.instancia}</div>
                <div className="py-4 px-2 flex justify-center">
                  {test.cantidad_problemas}
                </div>
                <div className="py-4 px-2 flex justify-center">
                  {timeInputValue(test.hora_ingreso)}
                </div>
                <div className="py-4 px-2 flex justify-center">
                  {displayDuration(test.duracion)}
                </div>
                <div className="py-4 px-2 flex justify-center">
                  <Image
                    src={
                      test.resultados_disponibles
                        ? "/icons/check.svg"
                        : "/icons/close.svg"
                    }
                    width={24}
                    height={24}
                    alt={
                      test.resultados_disponibles
                        ? "disponibles"
                        : "no disponibles"
                    }
                  />
                </div>
                <div className="py-4 px-2">
                  <div className="flex justify-center items-center gap-x-4 w-full h-full">
                    <Image
                      src="/icons/edit.svg"
                      alt="editar"
                      width={24}
                      height={24}
                      className="cursor-pointer"
                      onClick={() => {
                        setCurrentTest(test);
                        setOpenModal(true);
                      }}
                    />
                    <Image
                      src="/icons/delete.svg"
                      alt="eliminar"
                      width={24}
                      height={24}
                      className="cursor-pointer"
                      onClick={() => askDelete(test)}
                    />
                  </div>
                </div>
              </Fragment>
            );
          }}
          grid
          tableClassName="grid-cols-[2fr_2fr_2fr_1fr_1fr_1fr_1fr_2fr]"
        />
        <TestModal
          key={`${openModal}-${currentTest?.id_prueba ?? "new"}`}
          openModal={openModal}
          closeModal={() => setOpenModal(false)}
          competitions={competitions.data}
          onConfirm={async (test: TestDraft) => {
            try {
              await updateTest.mutateAsync(test);
              tests.refetch();
              setOpenModal(false);
            } catch (error) {
              setWarning(
                error instanceof Error
                  ? error.message
                  : "No se pudo guardar la prueba."
              );
            }
          }}
          result={currentTest ? toDraft(currentTest) : undefined}
        />
        <ConfirmModal
          open={confirmDelete}
          close={() => setConfirmDelete(false)}
          onCancel={() => setConfirmDelete(false)}
          onConfirm={async () => {
            if (currentTest) {
              setConfirmDelete(false);
              try {
                await deleteTest.mutateAsync(currentTest.id_prueba);
                tests.refetch();
              } catch (error) {
                setWarning(
                  error instanceof Error
                    ? error.message
                    : "No se pudo eliminar la prueba."
                );
              }
            }
          }}
        >
          <div className="px-4 text-2xl font-montserrat">
            <p className="font-semibold">
              ¿Estás seguro/a que deseas eliminar esta prueba?
            </p>
            <p>Esta acción no se puede deshacer.</p>
          </div>
        </ConfirmModal>
        <WarningModal open={warning !== null} close={() => setWarning(null)}>
          <p className="px-4 text-2xl font-montserrat font-semibold">
            {warning}
          </p>
        </WarningModal>
      </div>
    );
  }
  return null;
};

export default DashboardTests;
