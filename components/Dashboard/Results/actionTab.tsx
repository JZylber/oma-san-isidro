import ActionButton from "components/buttons/ActionButton/ActionButton";
import Image from "next/image";
import { Testdata } from "server/app-router-db-calls";
import WizardModal from "./wizardModal";
import { useState } from "react";

const ActionTab = ({ testData }: { testData: Testdata }) => {
  const [openFileUploadModal, setFileUploadModal] = useState(false);
  return (
    <div className="w-full flex py-4">
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
      />
    </div>
  );
};

export default ActionTab;
