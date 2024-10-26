import Table from "components/Table/Table";
import WizardForm from "./wizardForm";
import { WizardStateProps } from "./wizardModal";
import { displayResult } from "../row";
import { Fragment, useState } from "react";
import ConfirmModal from "components/Popups/ConfirmModal/ConfirmModal";
import { trpc } from "utils/trpc";
import BasicLoader from "components/Loader/BasicLoader";
import useTestData from "hooks/useTestData";

const Preview = ({
  data,
  nextStep,
  previousStep,
  numberOfStates,
  currentStepIndex,
}: WizardStateProps) => {
  const { cantidad_problemas, id } = useTestData();
  const utils = trpc.useContext();
  const updateResults = trpc.dashboard.updateResults.useMutation({
    onSuccess: async (res) => {
      await utils.dashboard.getResults.refetch();
      nextStep(data);
    },
  });
  const [confirmEnd, setConfirmEnd] = useState(false);
  const previewData = data.currentResults.map((r) => {
    const result2Add = data.results2Add.find(
      (result) => result.id_participacion === r.id_participacion
    );
    if (result2Add) {
      const resultados = {
        puntaje: result2Add.puntaje,
        aprobado: result2Add.aprobado,
        presente: result2Add.presente,
        aclaracion: result2Add.aclaracion,
      };
      return { ...r, resultados: resultados };
    }
    const result2Modify = data.results2Modify.find(
      (result) => result.id_rinde === r.id_rinde
    );
    if (result2Modify) {
      const resultados = {
        puntaje: result2Modify.puntaje,
        aprobado: result2Modify.aprobado,
        presente: result2Modify.presente,
        aclaracion: result2Modify.aclaracion,
      };
      return { ...r, resultados: resultados };
    }
    return r;
  });
  if (updateResults.isLoading) {
    return (
      <div className="grow w-full h-full flex flex-col items-center justify-center gap-y-8">
        <BasicLoader />
        <span className="font-montserrat text-4xl font-semibold mt-4">
          Actualizando resultados...
        </span>
      </div>
    );
  }
  if (updateResults.error) {
    return <div>Error</div>;
  }
  return (
    <WizardForm
      nextStep={(e) => {
        e.preventDefault();
        setConfirmEnd(true);
      }}
      previousStep={previousStep}
      numberOfStates={numberOfStates}
      currentStepIndex={currentStepIndex}
    >
      <div className="px-8">
        <Table
          allValues={previewData}
          values={previewData}
          headers={
            cantidad_problemas > 0
              ? [
                  "Nivel",
                  "Apellido",
                  "Nombre",
                  "DNI",
                  "Colegio",
                  ...Array.from({ length: cantidad_problemas }).map(
                    (_, i) => `P${i + 1}`
                  ),
                  "Total",
                  "Aprobado",
                ]
              : ["Nivel", "Apellido", "Nombre", "DNI", "Colegio", "Resultado"]
          }
          make_element={(result, index) => (
            <Fragment key={index}>
              <div className="text-center py-4 px-2">{result.nivel}</div>
              <div className="py-4 px-2 truncate">
                {result.participante.apellido}
              </div>
              <div className="py-4 px-2 truncate">
                {result.participante.nombre}
              </div>
              <div className="py-4 px-2">{result.participante.dni}</div>
              <div className="py-4 px-2 truncate">{`${result.colegio.nombre}${
                result.colegio.sede ? "-" + result.colegio.sede : ""
              }`}</div>
              {displayResult(result.resultados, cantidad_problemas)}
            </Fragment>
          )}
          grid
          tableClassName={
            cantidad_problemas > 0
              ? "grid-cols-[1fr_4fr_4fr_1.5fr_4fr_repeat(var(--problems),1fr)_2fr]"
              : "grid-cols-[1fr_4fr_4fr_1.5fr_4fr_4fr]"
          }
          style={
            {
              "--problems": cantidad_problemas + 1,
            } as React.CSSProperties
          }
          elements_per_page={25}
        />
      </div>
      <ConfirmModal
        open={confirmEnd}
        close={() => setConfirmEnd(false)}
        onCancel={() => setConfirmEnd(false)}
        onConfirm={() => {
          updateResults.mutate({
            id_prueba: id,
            Results2Add: data.results2Add.map((r) => ({
              ...r,
              resultados: r.puntaje,
            })),
            Results2Update: data.results2Modify.map((r) => ({
              ...r,
              resultados: r.puntaje,
            })),
          });
          setConfirmEnd(false);
        }}
      >
        <div className="p-6 flex flex-col gap-y-4">
          <h1 className="font-unbounded text-4xl">
            ¿Estás seguro de que querés finalizar?
          </h1>
          <p className="font-montserrat text-xl font-semibold">
            Los resultados se van a guardar en la base de datos.
          </p>
        </div>
      </ConfirmModal>
    </WizardForm>
  );
};

export default Preview;
