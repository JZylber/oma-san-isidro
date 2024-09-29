import { useEffect, useState } from "react";
import { EditableResult } from "../../../server/routers/dashboard";
import Modal from "../Modal";
import Image from "next/image";

const initialState = (
  resultados: EditableResult["resultados"],
  cantidadProblemas: number
) => {
  if (resultados === null) {
    return {
      puntaje: Array(cantidadProblemas + 1).fill("0"),
      aprobado: false,
      presente: false,
      aclaracion: null,
    };
  } else {
    return resultados;
  }
};

const ResultModal = ({
  result,
  numberOfProblems,
  open,
  close,
  onConfirm,
}: {
  result: EditableResult;
  numberOfProblems: number;
  open: boolean;
  close: () => void;
  onConfirm: (newResult: EditableResult["resultados"]) => void;
}) => {
  const [newResults, setNewResults] = useState(
    initialState(result.resultados, numberOfProblems)
  );
  useEffect(() => {
    setNewResults(initialState(result.resultados, numberOfProblems));
  }, [close]);
  return (
    <Modal
      openModal={open}
      closeModal={close}
      className="px-4 pt-4 pb-8 ml-auto h-screen max-h-screen border-l border-black bg-primary-white"
    >
      <div className="flex flex-col gap-y-6 h-full">
        <h2 className="font-unbounded text-6xl py-2 border-b">
          Editar Resultado
        </h2>
        <div className="flex flex-col font-montserrat gap-y">
          <h3 className="text-xl">Nombre y Apellido</h3>
          <p className="text-3xl">
            {result.participante.nombre} {result.participante.apellido}
          </p>
        </div>
        <div className="flex flex-col font-montserrat gap-y">
          <h3 className="text-xl">DNI</h3>
          <p className="text-3xl">{result.participante.dni}</p>
        </div>
        <div className="flex flex-col font-montserrat gap-y">
          <h3 className="text-xl">Colegio</h3>
          <p className="text-3xl">
            {result.colegio.nombre}
            {result.colegio.sede ? `-${result.colegio.sede}` : ""}
          </p>
        </div>
        <div className="flex flex-col font-montserrat gap-y">
          <div className="flex gap-x-2">
            {newResults.puntaje.map((score, i, arr) => {
              return (
                <div className="flex flex-col">
                  <h3 className="text-xl">
                    {i === arr.length - 1 ? "Total" : `P${i + 1}`}
                  </h3>
                  <input
                    className="text-3xl text-right p-2 border border-black rounded-lg w-24"
                    value={score}
                    onChange={(e) => {
                      setNewResults({
                        ...newResults,
                        puntaje: newResults.puntaje.map((s, j) =>
                          i === j ? e.target.value : s
                        ),
                      });
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex font-montserrat gap-x-2 items-center">
          <p className="text-3xl">Aprobado</p>
          <input
            className="w-8 h-8"
            type="checkbox"
            checked={newResults.aprobado}
            onChange={(e) =>
              setNewResults({ ...newResults, aprobado: e.target.checked })
            }
          />
        </div>
        <div className="flex font-montserrat gap-x-2 items-center">
          <p className="text-3xl">Ausente</p>
          <input
            className="w-8 h-8"
            type="checkbox"
            checked={!newResults.presente}
            onChange={(e) =>
              setNewResults({ ...newResults, presente: !e.target.checked })
            }
          />
        </div>
        <div className="flex flex-col font-montserrat gap-y">
          <h3 className="text-xl">Aclaración</h3>
          <div className="flex gap-x-2 items-center">
            <input
              className="text-3xl p-2 border border-black rounded-lg grow"
              value={newResults.aclaracion ? newResults.aclaracion : ""}
              onChange={(e) =>
                setNewResults({ ...newResults, aclaracion: e.target.value })
              }
            />
            <div
              className="bg-primary-light-blue flex justify-center items-center w-12 h-12 border border-black rounded-lg cursor-pointer"
              onClick={() => setNewResults({ ...newResults, aclaracion: null })}
            >
              <Image
                src="/images/x.svg"
                alt="eliminar aclaración"
                width={20}
                height={20}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-x-8 mt-auto">
          <button
            className="flex justify-center items-center border border-black rounded-lg w-36 h-16 text-2xl"
            onClick={close}
          >
            Cancelar
          </button>
          <button
            className="flex justify-center items-center border border-black rounded-lg w-36 h-16 text-2xl bg-primary-light-blue"
            onClick={() => onConfirm(newResults)}
          >
            Guardar
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ResultModal;
