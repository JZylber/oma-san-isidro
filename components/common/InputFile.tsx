import ActionButton from "components/buttons/ActionButton/ActionButton";
import WarningModal from "components/Popups/WarningModal/WarningModal";
import Warning from "components/Warning/Warning";
import Image from "next/image";
import React, { useState } from "react";

interface InputFileProps {
  types: string[];
}

const InputFile = ({ types }: InputFileProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [openWarning, setOpenWarning] = useState(false);
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    const type = file.name.split(".").pop();
    const validType = types.includes(`.${type as string}`);
    if (file && validType) {
      setFile(file);
    } else if (!validType) {
      setOpenWarning(true);
    }
  };
  return (
    <>
      <div
        className="bg-primary-light-blue border-2 border-dashed border-primary-black w-1/2 h-[250px] p-4 flex flex-col items-center justify-center"
        onDragOver={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        onDrop={handleDrop}
      >
        {!file && (
          <>
            <Image
              src="/icons/upload_file.svg"
              width={80}
              height={80}
              alt="upload"
            />
            <p className="font-unbounded text-3xl">
              Arrastrá el archivo que quieras subir
            </p>
            <p className="font-montserrat text-2xl font-semibold">
              Solo archivos {types.join(", ")}
            </p>
            <div className="flex gap-x-4 py-2 items-center">
              <p className="font-montserrat text-2xl">O subilo desde tu pc:</p>
              <ActionButton
                onClick={() => {}}
                className="w-fit px-2 relative cursor-pointer"
              >
                <span>Subir archivo</span>
                <input
                  type="file"
                  accept={types.join(",")}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setFile(file);
                    }
                  }}
                  className="absolute top-0 left-0 max-w-full h-full opacity-0 cursor-pointer file:hidden"
                />
              </ActionButton>
            </div>
          </>
        )}
        {file && (
          <div className="flex justify-around items-center w-full">
            <Image src="/icons/file.svg" width={80} height={80} alt="file" />
            <p className="font-montserrat text-4xl">{file.name}</p>
            <Image
              src="/images/x.svg"
              width={24}
              height={24}
              alt="close"
              onClick={() => setFile(null)}
              className="cursor-pointer"
            />
          </div>
        )}
      </div>
      <WarningModal open={openWarning} close={() => setOpenWarning(false)}>
        <div className="flex flex-col gap-y-4 p-4">
          <h2 className="text-4xl text-center font-unbounded">
            TIPO DE ARCHIVO NO SOPORTADO
          </h2>
          <p className="font-montserrat text-2xl">
            Solo se pueden subir archivos{" "}
            <span className="font-bold">{types.join(", ")}</span>
          </p>
        </div>
      </WarningModal>
    </>
  );
};

export default InputFile;
