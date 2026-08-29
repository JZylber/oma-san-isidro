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
import { trpc } from "utils/trpc";
import { describeParticipationDependencies } from "utils/participantDependencies";
import ParticipantModal from "./ParticipantModal";
import {
  competitionLabel,
  levelOptions,
  matchesSearch,
  ParticipantDraft,
  schoolLabel,
} from "./participantFields";

type Unpacked<T> = T extends (infer U)[] ? U : T;
type Participation = Unpacked<
  inferRouterOutputs<AppRouter>["dashboard"]["getParticipations"]
>;

// Select muestra "-" cuando el valor es falsy, así que "sin filtro" tiene que
// ser un valor real y no una cadena vacía.
const ALL = "Todos";

const toDraft = (row: Participation, ano: number): ParticipantDraft => ({
  id_participante: row.participante.id_participante,
  dni: row.participante.dni,
  nombre: row.participante.nombre,
  apellido: row.participante.apellido,
  email: row.participante.email,
  ano,
  participacion: {
    id_participacion: row.id_participacion,
    id_competencia: row.id_competencia,
    id_colegio: row.id_colegio,
    nivel: row.nivel,
  },
});

type PendingDelete = { kind: "participante" | "participacion"; row: Participation };

const DashboardParticipants = () => {
  const year = new Date().getFullYear();
  const participations = trpc.dashboard.getParticipations.useQuery(year, {
    refetchInterval: 0,
  });
  const competitions = trpc.dashboard.getCompetitions.useQuery(undefined, {
    refetchInterval: 0,
  });
  const schools = trpc.dashboard.getSchools.useQuery(undefined, {
    refetchInterval: 0,
  });
  const setParticipant = trpc.dashboard.setParticipant.useMutation();
  const deleteParticipant = trpc.dashboard.deleteParticipant.useMutation();
  const deleteParticipation = trpc.dashboard.deleteParticipation.useMutation();
  const [openModal, setOpenModal] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<PendingDelete | null>(null);
  const [warning, setWarning] = useState<string | null>(null);
  const [current, setCurrent] = useState<Participation | undefined>(undefined);
  const [search, setSearch] = useState("");
  const [competitionFilter, setCompetitionFilter] = useState(ALL);
  const [levelFilter, setLevelFilter] = useState(ALL);
  const [schoolFilter, setSchoolFilter] = useState(ALL);
  if (
    participations.isLoading ||
    participations.isRefetching ||
    competitions.isLoading ||
    competitions.isRefetching ||
    schools.isLoading ||
    schools.isRefetching
  )
    return <Loader />;
  if (participations.isError)
    return <div>Error: {participations.error.message}</div>;
  if (competitions.isError)
    return <div>Error: {competitions.error.message}</div>;
  if (schools.isError) return <div>Error: {schools.error.message}</div>;
  if (
    participations.isSuccess &&
    competitions.isSuccess &&
    schools.isSuccess
  ) {
    // El panel edita sólo el año en curso, así que las competencias elegibles
    // son las de ese año.
    const yearCompetitions = competitions.data.filter(
      (competition) => competition.ano === year
    );
    const competitionTypes = Array.from(
      new Set(yearCompetitions.map((competition) => competition.tipo))
    ).sort();
    const schoolNames = Array.from(
      new Set(schools.data.map(schoolLabel))
    ).sort();
    const filtered = participations.data.filter(
      (row) =>
        matchesSearch(row.participante, search) &&
        (competitionFilter === ALL ||
          row.competencia.tipo === competitionFilter) &&
        (levelFilter === ALL || `${row.nivel}` === levelFilter) &&
        (schoolFilter === ALL || schoolLabel(row.colegio) === schoolFilter)
    );
    const askDelete = (kind: PendingDelete["kind"], row: Participation) => {
      const blockers = describeParticipationDependencies(row._count);
      if (blockers) {
        setWarning(
          kind === "participante"
            ? `No se puede eliminar: el participante tiene ${blockers}.`
            : `No se puede quitar: la participación tiene ${blockers}.`
        );
        return;
      }
      setPendingDelete({ kind, row });
    };
    const runDelete = async () => {
      if (!pendingDelete) return;
      const { kind, row } = pendingDelete;
      setPendingDelete(null);
      try {
        if (kind === "participante") {
          await deleteParticipant.mutateAsync(row.participante.id_participante);
        } else {
          await deleteParticipation.mutateAsync(row.id_participacion);
        }
        participations.refetch();
      } catch (error) {
        setWarning(
          error instanceof Error
            ? error.message
            : "No se pudo eliminar el participante."
        );
      }
    };
    return (
      <div>
        <h1 className="font-unbounded text-4xl py-2">{`Participantes ${year}`}</h1>
        {yearCompetitions.length === 0 && (
          <p className="font-montserrat text-2xl py-2">
            {`No hay competencias cargadas para ${year}: hasta que se carguen no se pueden dar de alta participaciones.`}
          </p>
        )}
        <div className="flex py-2">
          <ActionButton
            onClick={() => {
              setCurrent(undefined);
              setOpenModal(true);
            }}
            important
            invalid={yearCompetitions.length === 0 || schools.data.length === 0}
            className="!w-[120px] flex justify-around items-center"
          >
            <span className="font-unbounded">NUEVO</span>
            <Image src="/icons/add.svg" alt="sumar" width={24} height={24} />
          </ActionButton>
        </div>
        <form className="flex gap-x-4 py-2 items-end">
          <div className="flex grow basis-0 flex-col gap-y-2">
            <label className="font-montserrat text-2xl">Buscar</label>
            <input
              type="text"
              value={search}
              placeholder="Apellido, nombre o DNI"
              className="bg-primary-white border-2 border-primary-black rounded-xl px-6 py-4 font-montserrat text-2xl"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Select
            label="Competencia"
            options={[ALL, ...competitionTypes]}
            value={competitionFilter}
            onChange={setCompetitionFilter}
          />
          <Select
            label="Nivel"
            options={[ALL, ...levelOptions()]}
            value={levelFilter}
            onChange={setLevelFilter}
          />
          <Select
            label="Colegio"
            options={[ALL, ...schoolNames]}
            value={schoolFilter}
            onChange={setSchoolFilter}
          />
        </form>
        <Table
          values={filtered}
          allValues={participations.data}
          headers={[
            "DNI",
            "Apellido",
            "Nombre",
            "Email",
            "Competencia",
            "Nivel",
            "Colegio",
            "Acciones",
          ]}
          elements_per_page={25}
          make_element={(row, index) => {
            return (
              <Fragment key={index}>
                <div className="py-4 px-2 truncate">{row.participante.dni}</div>
                <div className="py-4 px-2 truncate">
                  {row.participante.apellido}
                </div>
                <div className="py-4 px-2 truncate">
                  {row.participante.nombre}
                </div>
                <div className="py-4 px-2 truncate">
                  {row.participante.email ?? "-"}
                </div>
                <div className="py-4 px-2 truncate">{row.competencia.tipo}</div>
                <div className="py-4 px-2 flex justify-center">{row.nivel}</div>
                <div className="py-4 px-2 truncate">
                  {schoolLabel(row.colegio)}
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
                        setCurrent(row);
                        setOpenModal(true);
                      }}
                    />
                    <Image
                      src="/icons/close.svg"
                      alt={`quitar de ${year}`}
                      title={`Quitar de ${year}`}
                      width={24}
                      height={24}
                      className="cursor-pointer"
                      onClick={() => askDelete("participacion", row)}
                    />
                    <Image
                      src="/icons/delete.svg"
                      alt="eliminar"
                      title="Eliminar participante"
                      width={24}
                      height={24}
                      className="cursor-pointer"
                      onClick={() => askDelete("participante", row)}
                    />
                  </div>
                </div>
              </Fragment>
            );
          }}
          grid
          tableClassName="grid-cols-[1.5fr_2fr_2fr_2fr_1.5fr_0.8fr_2.5fr_1.5fr]"
        />
        <ParticipantModal
          key={`${openModal}-${current?.id_participacion ?? "new"}`}
          openModal={openModal}
          closeModal={() => setOpenModal(false)}
          competitions={yearCompetitions}
          schools={schools.data}
          ano={year}
          enrolled={participations.data.map((row) => ({
            id_participacion: row.id_participacion,
            id_competencia: row.id_competencia,
            dni: row.participante.dni,
            nombre: row.participante.nombre,
            apellido: row.participante.apellido,
          }))}
          onConfirm={async (participant: ParticipantDraft) => {
            try {
              await setParticipant.mutateAsync(participant);
              participations.refetch();
              setOpenModal(false);
            } catch (error) {
              setWarning(
                error instanceof Error
                  ? error.message
                  : "No se pudo guardar el participante."
              );
            }
          }}
          result={current ? toDraft(current, year) : undefined}
        />
        <ConfirmModal
          open={pendingDelete !== null}
          close={() => setPendingDelete(null)}
          onCancel={() => setPendingDelete(null)}
          onConfirm={runDelete}
        >
          <div className="px-4 text-2xl font-montserrat">
            {pendingDelete?.kind === "participacion" ? (
              <p className="font-semibold">
                {`¿Estás seguro/a que deseas quitar a este participante de ${year}?`}
              </p>
            ) : (
              <p className="font-semibold">
                ¿Estás seguro/a que deseas eliminar este participante?
              </p>
            )}
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

export default DashboardParticipants;
