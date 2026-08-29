import ActionButton from "components/buttons/ActionButton/ActionButton";
import Modal from "components/Popups/Modal";
import { useState } from "react";
import { blankSchool, SchoolDraft } from "./schoolFields";

const labelClasses = "font-montserrat text-2xl font-semibold";
const inputClasses =
  "bg-primary-white border-2 border-primary-black rounded-md p-2 font-montserrat text-2xl";
const fieldClasses = "flex flex-col gap-y-2";

const SchoolModal = ({
  openModal,
  closeModal,
  onConfirm,
  result,
}: {
  openModal: boolean;
  closeModal: () => void;
  onConfirm: (school: SchoolDraft) => void;
  result?: SchoolDraft;
}) => {
  const [newSchool, setNewSchool] = useState<SchoolDraft>(
    result ? result : blankSchool()
  );
  const invalid =
    newSchool.nombre.trim() === "" || newSchool.acr_nimo.trim() === "";
  return (
    <Modal
      openModal={openModal}
      closeModal={closeModal}
      className="bg-primary-white border-2 border-primary-black rounded-xl m-auto w-1/2"
    >
      <div className="flex flex-col items-center">
        <h1 className="font-unbounded text-4xl py-8">Colegio</h1>

        <form className="flex flex-col gap-y-4 w-2/3 px-8 py-4">
          <div className={fieldClasses}>
            <label className={labelClasses}>Nombre</label>
            <input
              type="text"
              value={newSchool.nombre}
              className={inputClasses}
              onChange={(e) =>
                setNewSchool({ ...newSchool, nombre: e.target.value })
              }
            />
          </div>
          <div className={fieldClasses}>
            <label className={labelClasses}>Sede</label>
            <input
              type="text"
              value={newSchool.sede ?? ""}
              className={inputClasses}
              onChange={(e) =>
                setNewSchool({
                  ...newSchool,
                  // Un campo vaciado tiene que volver a NULL y no quedar como
                  // "", que rompería el "Colegio - Sede" de las etiquetas.
                  sede: e.target.value ? e.target.value : null,
                })
              }
            />
          </div>
          <div className={fieldClasses}>
            <label className={labelClasses}>Localidad</label>
            <input
              type="text"
              value={newSchool.localidad ?? ""}
              className={inputClasses}
              onChange={(e) =>
                setNewSchool({
                  ...newSchool,
                  localidad: e.target.value ? e.target.value : null,
                })
              }
            />
          </div>
          <div className={fieldClasses}>
            <label className={labelClasses}>Acrónimo</label>
            <input
              type="text"
              value={newSchool.acr_nimo}
              className={inputClasses}
              onChange={(e) =>
                setNewSchool({ ...newSchool, acr_nimo: e.target.value })
              }
            />
          </div>
        </form>
        <div className="flex justify-around py-8 border-t w-full">
          <ActionButton onClick={closeModal}>Cancelar</ActionButton>
          <ActionButton
            onClick={() => onConfirm(newSchool)}
            important
            invalid={invalid}
          >
            {!result ? "Agregar" : "Guardar"}
          </ActionButton>
        </div>
      </div>
    </Modal>
  );
};

export default SchoolModal;
