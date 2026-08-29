import ActionButton from "components/buttons/ActionButton/ActionButton";
import Select from "components/common/form/Select";
import Switch from "components/common/form/Switch";
import Modal from "components/Popups/Modal";
import { useState } from "react";
import CriteriaEditor from "./CriteriaEditor";
import {
  blankTest,
  competitionLabel,
  dateInputValue,
  instanceOptions,
  parseDateInput,
  parseTimeInput,
  TestDraft,
  timeInputValue,
} from "./testFields";

const labelClasses = "font-montserrat text-2xl font-semibold";
const inputClasses =
  "bg-primary-white border-2 border-primary-black rounded-md p-2 font-montserrat text-2xl";
const fieldClasses = "flex flex-col gap-y-2";

export type Competition = {
  id_competencia: number;
  numero: number;
  ano: number;
  tipo: string;
};

const TestModal = ({
  openModal,
  closeModal,
  onConfirm,
  competitions,
  result,
}: {
  openModal: boolean;
  closeModal: () => void;
  onConfirm: (test: TestDraft) => void;
  competitions: Competition[];
  result?: TestDraft;
}) => {
  const [newTest, setNewTest] = useState<TestDraft>(
    result ? result : blankTest()
  );
  const competition = competitions.find(
    (option) => option.id_competencia === newTest.id_competencia
  );
  const invalid =
    !competition ||
    newTest.cantidad_problemas < 0 ||
    newTest.duracion < 1 ||
    isNaN(newTest.fecha.getTime());
  return (
    <Modal
      openModal={openModal}
      closeModal={closeModal}
      className="bg-primary-white border-2 border-primary-black rounded-xl m-auto w-1/2"
    >
      <div className="flex flex-col items-center">
        <h1 className="font-unbounded text-4xl py-8">Prueba</h1>

        <form className="flex flex-col gap-y-4 w-2/3 px-8 py-4">
          <div className={fieldClasses}>
            <Select
              label="Competencia"
              options={competitions.map(competitionLabel)}
              value={competition ? competitionLabel(competition) : ""}
              onChange={(selected) => {
                const picked = competitions.find(
                  (option) => competitionLabel(option) === selected
                );
                if (picked) {
                  // Cambiar de competencia puede dejar seleccionada una
                  // instancia que la nueva no corre (Intercolegial es sólo de
                  // OMA e Interescolar sólo de Ñandú).
                  const options = instanceOptions(picked.tipo);
                  setNewTest({
                    ...newTest,
                    id_competencia: picked.id_competencia,
                    instancia: options.includes(newTest.instancia)
                      ? newTest.instancia
                      : options[0],
                  });
                }
              }}
            />
          </div>
          <div className={fieldClasses}>
            <Select
              label="Instancia"
              options={instanceOptions(competition?.tipo)}
              value={newTest.instancia}
              onChange={(instancia) => setNewTest({ ...newTest, instancia })}
            />
          </div>
          <div className={fieldClasses}>
            <label className={labelClasses}>Fecha</label>
            <input
              type="date"
              value={dateInputValue(newTest.fecha)}
              className={inputClasses}
              onChange={(e) =>
                setNewTest({ ...newTest, fecha: parseDateInput(e.target.value) })
              }
            />
          </div>
          <div className={fieldClasses}>
            <label className={labelClasses}>Hora de ingreso</label>
            <input
              type="time"
              value={timeInputValue(newTest.hora_ingreso)}
              className={inputClasses}
              onChange={(e) =>
                setNewTest({
                  ...newTest,
                  hora_ingreso: parseTimeInput(e.target.value),
                })
              }
            />
          </div>
          <div className={fieldClasses}>
            <label className={labelClasses}>Duración (minutos)</label>
            <input
              type="number"
              min={1}
              value={newTest.duracion}
              className={inputClasses}
              onChange={(e) =>
                setNewTest({ ...newTest, duracion: Number(e.target.value) })
              }
            />
          </div>
          <div className={fieldClasses}>
            <label className={labelClasses}>Cantidad de problemas</label>
            <input
              type="number"
              min={0}
              value={newTest.cantidad_problemas}
              className={inputClasses}
              onChange={(e) =>
                setNewTest({
                  ...newTest,
                  cantidad_problemas: Number(e.target.value),
                })
              }
            />
          </div>
          <div className={fieldClasses}>
            <label className={labelClasses}>
              Fecha límite de autorización
            </label>
            <input
              type="date"
              value={
                newTest.fecha_limite_autorizacion
                  ? dateInputValue(newTest.fecha_limite_autorizacion)
                  : ""
              }
              className={inputClasses}
              onChange={(e) =>
                setNewTest({
                  ...newTest,
                  fecha_limite_autorizacion: e.target.value
                    ? parseDateInput(e.target.value)
                    : null,
                })
              }
            />
          </div>
          <div className="flex items-center justify-between py-2">
            <label className={labelClasses}>Resultados disponibles</label>
            <Switch
              checked={newTest.resultados_disponibles}
              onChange={(e) =>
                setNewTest({
                  ...newTest,
                  resultados_disponibles: e.target.checked,
                })
              }
            />
          </div>
          <CriteriaEditor
            value={newTest.criterio_habilitacion}
            onChange={(criterio_habilitacion) =>
              setNewTest({ ...newTest, criterio_habilitacion })
            }
          />
        </form>
        <div className="flex justify-around py-8 border-t w-full">
          <ActionButton onClick={closeModal}>Cancelar</ActionButton>
          <ActionButton
            onClick={() => onConfirm(newTest)}
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

export default TestModal;
