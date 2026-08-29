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
import { describeSchoolDependencies } from "utils/schoolDependencies";
import SchoolModal from "./SchoolModal";
import { matchesSchoolSearch, SchoolDraft } from "./schoolFields";

type Unpacked<T> = T extends (infer U)[] ? U : T;
type School = Unpacked<
  inferRouterOutputs<AppRouter>["dashboard"]["getSchools"]
>;

// Select muestra "-" cuando el valor es falsy, así que "sin filtro" tiene que
// ser un valor real y no una cadena vacía.
const ALL = "Todas";

// Mismo id que usa Participacion.id_colegio como @default: el servidor también
// lo rechaza, acá sólo se evita el viaje de ida y vuelta.
const DEFAULT_SCHOOL_ID = 1;

const NO_LOCALITY = "Sin localidad";

const toDraft = (school: School): SchoolDraft => ({
  id_colegio: school.id_colegio,
  nombre: school.nombre,
  sede: school.sede,
  localidad: school.localidad,
  acr_nimo: school.acr_nimo,
});

const DashboardSchools = () => {
  const schools = trpc.dashboard.getSchools.useQuery(undefined, {
    refetchInterval: 0,
  });
  const updateSchool = trpc.dashboard.setSchool.useMutation();
  const deleteSchool = trpc.dashboard.deleteSchool.useMutation();
  const [openModal, setOpenModal] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [warning, setWarning] = useState<string | null>(null);
  const [current, setCurrent] = useState<School | undefined>(undefined);
  const [search, setSearch] = useState("");
  const [localityFilter, setLocalityFilter] = useState(ALL);
  if (schools.isLoading || schools.isRefetching) return <Loader />;
  if (schools.isError) return <div>Error: {schools.error.message}</div>;
  if (schools.isSuccess) {
    const localities = Array.from(
      new Set(schools.data.map((school) => school.localidad ?? NO_LOCALITY))
    ).sort();
    const filtered = schools.data.filter(
      (school) =>
        matchesSchoolSearch(school, search) &&
        (localityFilter === ALL ||
          (school.localidad ?? NO_LOCALITY) === localityFilter)
    );
    const askDelete = (school: School) => {
      if (school.id_colegio === DEFAULT_SCHOOL_ID) {
        setWarning(
          "No se puede eliminar: es el colegio por defecto de las participaciones."
        );
        return;
      }
      const blockers = describeSchoolDependencies(school._count);
      if (blockers) {
        setWarning(`No se puede eliminar: el colegio tiene ${blockers}.`);
        return;
      }
      setCurrent(school);
      setConfirmDelete(true);
    };
    return (
      <div>
        <h1 className="font-unbounded text-4xl py-2">Colegios</h1>
        <div className="flex py-2">
          <ActionButton
            onClick={() => {
              setCurrent(undefined);
              setOpenModal(true);
            }}
            important
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
              placeholder="Nombre, sede, localidad o acrónimo"
              className="bg-primary-white border-2 border-primary-black rounded-xl px-6 py-4 font-montserrat text-2xl"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Select
            label="Localidad"
            options={[ALL, ...localities]}
            value={localityFilter}
            onChange={setLocalityFilter}
          />
        </form>
        <Table
          values={filtered}
          allValues={schools.data}
          headers={[
            "Nombre",
            "Sede",
            "Localidad",
            "Acrónimo",
            "Participaciones",
            "Acciones",
          ]}
          elements_per_page={25}
          make_element={(school, index) => {
            return (
              <Fragment key={index}>
                <div className="py-4 px-2 truncate">{school.nombre}</div>
                <div className="py-4 px-2 truncate">{school.sede ?? "-"}</div>
                <div className="py-4 px-2 truncate">
                  {school.localidad ?? "-"}
                </div>
                <div className="py-4 px-2 truncate">{school.acr_nimo}</div>
                <div className="py-4 px-2 flex justify-center">
                  {school._count.participaciones}
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
                        setCurrent(school);
                        setOpenModal(true);
                      }}
                    />
                    <Image
                      src="/icons/delete.svg"
                      alt="eliminar"
                      width={24}
                      height={24}
                      className="cursor-pointer"
                      onClick={() => askDelete(school)}
                    />
                  </div>
                </div>
              </Fragment>
            );
          }}
          grid
          tableClassName="grid-cols-[3fr_2fr_2fr_1fr_1fr_2fr]"
        />
        <SchoolModal
          key={`${openModal}-${current?.id_colegio ?? "new"}`}
          openModal={openModal}
          closeModal={() => setOpenModal(false)}
          onConfirm={async (school: SchoolDraft) => {
            try {
              await updateSchool.mutateAsync(school);
              schools.refetch();
              setOpenModal(false);
            } catch (error) {
              setWarning(
                error instanceof Error
                  ? error.message
                  : "No se pudo guardar el colegio."
              );
            }
          }}
          result={current ? toDraft(current) : undefined}
        />
        <ConfirmModal
          open={confirmDelete}
          close={() => setConfirmDelete(false)}
          onCancel={() => setConfirmDelete(false)}
          onConfirm={async () => {
            if (current) {
              setConfirmDelete(false);
              try {
                await deleteSchool.mutateAsync(current.id_colegio);
                schools.refetch();
              } catch (error) {
                setWarning(
                  error instanceof Error
                    ? error.message
                    : "No se pudo eliminar el colegio."
                );
              }
            }
          }}
        >
          <div className="px-4 text-2xl font-montserrat">
            <p className="font-semibold">
              ¿Estás seguro/a que deseas eliminar este colegio?
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

export default DashboardSchools;
