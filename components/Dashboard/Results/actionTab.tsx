import ActionButton from "components/buttons/ActionButton/ActionButton";
import Image from "next/image";
import { Testdata } from "server/app-router-db-calls";
import WizardModal from "./wizardModal/wizardModal";
import { useState } from "react";
import { EditableResult } from "server/routers/dashboard";
import Switch from "components/common/form/Switch";
import { trpc } from "utils/trpc";
import BasicLoader from "components/Loader/BasicLoader";

const ActionTab = ({
  testData,
  results,
}: {
  testData: Testdata;
  results: EditableResult[];
}) => {
  const [openFileUploadModal, setFileUploadModal] = useState(false);
  const setShowResults = trpc.dashboard.showResults.useMutation({
    onSuccess: () => {
      testData.resultados_disponibles = !testData.resultados_disponibles;
    },
  });
  return (
    <div className="w-full flex py-4 justify-between">
      <div className="flex gap-x-8 items-center">
        <span className="font-montserrat font-semibold text-3xl">
          RESULTADOS VISIBLES:
        </span>
        <div className="flex gap-x-4 items-stretch">
          <div
            className={
              setShowResults.isLoading
                ? "pointer-events-none opacity-50 grayscale"
                : ""
            }
          >
            <Switch
              checked={testData.resultados_disponibles}
              onChange={(e) => {
                setShowResults.mutate({
                  id_prueba: testData.id,
                  show: e.target.checked,
                });
              }}
            />
          </div>
          {setShowResults.isLoading && (
            <div className="py-2">
              <BasicLoader className="h-full aspect-square" />
            </div>
          )}
        </div>
      </div>
      <ActionButton
        onClick={() => setFileUploadModal(true)}
        important
        className="w-fit px-3 flex gap-x-3"
      >
        <Image
          src="/icons/upload_file.svg"
          width={30}
          height={30}
          alt="upload"
        />
        <p className="font-montserrat font-semibold text-2xl">subir archivo</p>
      </ActionButton>
      <WizardModal
        open={openFileUploadModal}
        close={() => setFileUploadModal(false)}
        initialData={results}
      />
    </div>
  );
};

export default ActionTab;
