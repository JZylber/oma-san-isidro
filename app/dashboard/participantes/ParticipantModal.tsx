import ActionButton from "components/buttons/ActionButton/ActionButton";
import Select from "components/common/form/Select";
import Modal from "components/Popups/Modal";
import { useState } from "react";
import {
  blankParticipant,
  Competition,
  competitionLabel,
  levelOptions,
  ParticipantDraft,
  School,
  schoolLabel,
} from "./participantFields";

const labelClasses = "font-montserrat text-2xl font-semibold";
const inputClasses =
  "bg-primary-white border-2 border-primary-black rounded-md p-2 font-montserrat text-2xl";
const fieldClasses = "flex flex-col gap-y-2";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ParticipantModal = ({
  openModal,
  closeModal,
  onConfirm,
  competitions,
  schools,
  ano,
  enrolled,
  result,
}: {
  openModal: boolean;
  closeModal: () => void;
  onConfirm: (participant: ParticipantDraft) => void;
  competitions: Competition[];
  schools: School[];
  ano: number;
  /** Padrón ya cargado del año, para avisar de un DNI repetido antes de guardar. */
  enrolled: {
    id_participacion: number;
    id_competencia: number;
    dni: number;
    nombre: string;
    apellido: string;
  }[];
  result?: ParticipantDraft;
}) => {
  const [participant, setParticipant] = useState<ParticipantDraft>(
    result
      ? result
      : blankParticipant(ano, competitions[0]?.id_competencia ?? -1)
  );
  const setParticipacion = (
    participacion: Partial<ParticipantDraft["participacion"]>
  ) =>
    setParticipant({
      ...participant,
      participacion: { ...participant.participacion, ...participacion },
    });

  const competition = competitions.find(
    (option) => option.id_competencia === participant.participacion.id_competencia
  );
  const school = schools.find(
    (option) => option.id_colegio === participant.participacion.id_colegio
  );

  // Un chico puede estar en OMA y en ÑANDÚ el mismo año, así que el choque es
  // por competencia, no por año: se avisa antes de mandar la mutación y de que
  // el server devuelva el CONFLICT.
  const alreadyEnrolled = enrolled.find(
    (row) =>
      row.dni === participant.dni &&
      row.id_competencia === participant.participacion.id_competencia &&
      row.id_participacion !== participant.participacion.id_participacion
  );

  const invalid =
    !competition ||
    !school ||
    participant.dni <= 0 ||
    participant.nombre.trim() === "" ||
    participant.apellido.trim() === "" ||
    (participant.email !== null && !EMAIL.test(participant.email)) ||
    alreadyEnrolled !== undefined;

  return (
    <Modal
      openModal={openModal}
      closeModal={closeModal}
      className="bg-primary-white border-2 border-primary-black rounded-xl m-auto w-1/2"
    >
      <div className="flex flex-col items-center">
        <h1 className="font-unbounded text-4xl py-8">Participante</h1>

        <form className="flex flex-col gap-y-4 w-2/3 px-8 py-4">
          <div className={fieldClasses}>
            <label className={labelClasses}>DNI</label>
            <input
              type="number"
              min={1}
              value={participant.dni === 0 ? "" : participant.dni}
              className={inputClasses}
              onChange={(e) =>
                setParticipant({ ...participant, dni: Number(e.target.value) })
              }
            />
            {alreadyEnrolled && (
              <p className="font-montserrat text-xl text-red-700">
                {`Ya existe ${alreadyEnrolled.apellido}, ${alreadyEnrolled.nombre} en ${
                  competition ? competitionLabel(competition) : ""
                } ${ano}.`}
              </p>
            )}
          </div>
          <div className={fieldClasses}>
            <label className={labelClasses}>Apellido</label>
            <input
              type="text"
              value={participant.apellido}
              className={inputClasses}
              onChange={(e) =>
                setParticipant({ ...participant, apellido: e.target.value })
              }
            />
          </div>
          <div className={fieldClasses}>
            <label className={labelClasses}>Nombre</label>
            <input
              type="text"
              value={participant.nombre}
              className={inputClasses}
              onChange={(e) =>
                setParticipant({ ...participant, nombre: e.target.value })
              }
            />
          </div>
          <div className={fieldClasses}>
            <label className={labelClasses}>Email</label>
            <input
              type="email"
              value={participant.email ?? ""}
              className={inputClasses}
              onChange={(e) =>
                setParticipant({
                  ...participant,
                  email: e.target.value === "" ? null : e.target.value,
                })
              }
            />
          </div>

          <hr className="border-primary-black mt-4" />
          <h2 className="font-unbounded text-3xl py-2">{`Participación ${ano}`}</h2>

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
                  setParticipacion({ id_competencia: picked.id_competencia });
                }
              }}
            />
          </div>
          <div className={fieldClasses}>
            <Select
              label="Nivel"
              options={levelOptions()}
              value={`${participant.participacion.nivel}`}
              onChange={(nivel) => setParticipacion({ nivel: Number(nivel) })}
            />
          </div>
          <div className={fieldClasses}>
            <Select
              label="Colegio"
              options={schools.map(schoolLabel)}
              value={school ? schoolLabel(school) : ""}
              onChange={(selected) => {
                const picked = schools.find(
                  (option) => schoolLabel(option) === selected
                );
                if (picked) {
                  setParticipacion({ id_colegio: picked.id_colegio });
                }
              }}
            />
          </div>
        </form>
        <div className="flex justify-around py-8 border-t w-full">
          <ActionButton onClick={closeModal}>Cancelar</ActionButton>
          <ActionButton
            onClick={() => onConfirm(participant)}
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

export default ParticipantModal;
