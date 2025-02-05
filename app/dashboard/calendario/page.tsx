"use client";

import { inferRouterOutputs } from "@trpc/server";
import ActionButton from "components/buttons/ActionButton/ActionButton";
import Checkbox from "components/common/form/CheckBox";
import Loader from "components/Loader/Loader";
import ConfirmModal from "components/Popups/ConfirmModal/ConfirmModal";
import Modal from "components/Popups/Modal";
import Table from "components/Table/Table";
import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
import { AppRouter } from "server/routers/_app";
import { trpc } from "utils/trpc";

const displayDate = (date: Date) => {
  return `${date.getUTCDate()} de ${date.toLocaleString("es-AR", {
    month: "long",
  })}`;
};

enum types {
  nandu = "Nandú",
  oma = "OMA",
  internacional = "Internacional",
  geometria = "Geometría",
  mateclubes = "Mateclubes",
  literatura = "Literatura y Matemática",
}

const blankDate = {
  id_fecha: -1,
  fecha_inicio: new Date(),
  fecha_fin: null,
  texto: "",
  tipo: "",
};

const CalendarModal = ({
  openModal,
  closeModal,
  onConfirm,
  result,
}: {
  openModal: boolean;
  closeModal: () => void;
  onConfirm: (news: OMADate) => void;
  result?: OMADate;
}) => {
  const [newDate, setNewDate] = useState<OMADate>(
    result ? result : { ...blankDate }
  );
  useEffect(() => {
    setNewDate(result ? result : { ...blankDate });
  }, [result]);
  return (
    <Modal
      openModal={openModal}
      closeModal={closeModal}
      className="bg-primary-white border-2 border-primary-black rounded-xl m-auto w-1/2"
    >
      <div className="flex flex-col items-center">
        <h1 className="font-unbounded text-4xl py-8">Fecha</h1>

        <form className="flex flex-col gap-y-4 w-2/3 px-8 py-4">
          <div className="flex flex-col gap-y-2">
            <label className="font-montserrat text-2xl font-semibold">
              Texto
            </label>
            <input
              type="text"
              value={newDate.texto}
              onChange={(e) =>
                setNewDate({ ...newDate, texto: e.target.value })
              }
              className="bg-primary-white border-2 border-primary-black rounded-md p-2 font-montserrat text-2xl"
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <label className="font-montserrat text-2xl font-semibold">
              Tipo
            </label>
            <input
              type="text"
              value={newDate.tipo}
              onChange={(e) => setNewDate({ ...newDate, tipo: e.target.value })}
              className="bg-primary-white border-2 border-primary-black rounded-md p-2 font-montserrat text-2xl"
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <label className="font-montserrat text-2xl font-semibold">
              Fecha Inicio
            </label>
            <input
              value={newDate.fecha_inicio.toISOString().split("T")[0]}
              type="date"
              className="bg-primary-white border-2 border-primary-black rounded-md p-2 font-montserrat text-2xl"
              onChange={(e) => {
                setNewDate({
                  ...newDate,
                  fecha_inicio: new Date(e.target.value + " GMT-0300"),
                });
              }}
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <label className="font-montserrat text-2xl font-semibold">
              Fecha Fin
            </label>
            <input
              value={
                newDate.fecha_fin
                  ? newDate.fecha_fin.toISOString().split("T")[0]
                  : ""
              }
              type="date"
              className="bg-primary-white border-2 border-primary-black rounded-md p-2 font-montserrat text-2xl"
              onChange={(e) => {
                if (!e.target.value) {
                  setNewDate({
                    ...newDate,
                    fecha_fin: null,
                  });
                } else {
                  setNewDate({
                    ...newDate,
                    fecha_fin: new Date(e.target.value + " GMT-0300"),
                  });
                }
              }}
            />
          </div>
        </form>
        <div className="flex justify-around py-8 border-t w-full">
          <ActionButton onClick={closeModal}>Cancelar</ActionButton>
          <ActionButton
            onClick={() => {
              onConfirm(newDate);
            }}
            important
          >
            {!result ? "Agregar" : "Guardar"}
          </ActionButton>
        </div>
      </div>
    </Modal>
  );
};

type Unpacked<T> = T extends (infer U)[] ? U : T;
type OMADate = Unpacked<inferRouterOutputs<AppRouter>["dashboard"]["getDates"]>;

const DashboardDates = () => {
  const [openModal, setOpenModal] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const dates = trpc.dashboard.getDates.useQuery(new Date().getFullYear(), {
    refetchInterval: 0,
  });
  const updateDate = trpc.dashboard.setDate.useMutation();
  const deleteDate = trpc.dashboard.deleteDate.useMutation();
  const [currentDate, setCurrentDate] = useState<OMADate | undefined>(
    undefined
  );
  if (dates.isLoading || dates.isRefetching) return <Loader />;
  if (dates.isError) return <div>Error: {dates.error.message}</div>;
  if (dates.isSuccess)
    return (
      <div>
        <div className="flex py-2">
          <ActionButton
            onClick={() => {
              setCurrentDate(undefined);
              setOpenModal(true);
            }}
            important
            className="!w-[120px] flex justify-around items-center"
          >
            <span className="font-unbounded">NUEVA</span>
            <Image src="/icons/add.svg" alt="sumar" width={24} height={24} />
          </ActionButton>
        </div>
        <Table
          values={dates.data}
          allValues={dates.data}
          headers={["Fecha Inicio", "Fecha Fin", "Tipo", "Texto", "Acciones"]}
          make_element={(date, index) => {
            return (
              <Fragment key={index}>
                <div className="py-4 px-2 truncate">
                  {displayDate(date.fecha_inicio)}
                </div>
                <div className="py-4 px-2 truncate">
                  {date.fecha_fin ? displayDate(date.fecha_fin) : "-"}
                </div>
                <div className="py-4 px-2 truncate">{date.tipo}</div>
                <div className="py-4 px-2 truncate">{date.texto}</div>
                <div className="py-4 px-2">
                  <div className="flex justify-center items-center gap-x-4 w-full h-full">
                    <Image
                      src="/icons/edit.svg"
                      alt="editar"
                      width={24}
                      height={24}
                      className="cursor-pointer"
                      onClick={() => {
                        setCurrentDate(date);
                        setOpenModal(true);
                      }}
                    />
                    <Image
                      src="/icons/delete.svg"
                      alt="eliminar"
                      width={24}
                      height={24}
                      className="cursor-pointer"
                      onClick={() => {
                        setCurrentDate(date);
                        setConfirmDelete(true);
                      }}
                    />
                  </div>
                </div>
              </Fragment>
            );
          }}
          grid
          tableClassName="grid-cols-[2fr_2fr_1fr_3fr_2fr]"
        />
        <CalendarModal
          openModal={openModal}
          closeModal={() => setOpenModal(false)}
          onConfirm={async (newDate: OMADate) => {
            await updateDate.mutateAsync(newDate);
            dates.refetch();
            setOpenModal(false);
          }}
          result={currentDate}
        />
        <ConfirmModal
          open={confirmDelete}
          close={() => setConfirmDelete(false)}
          onCancel={() => setConfirmDelete(false)}
          onConfirm={async () => {
            if (currentDate) {
              await deleteDate.mutateAsync(currentDate.id_fecha);
              dates.refetch();
              setConfirmDelete(false);
            }
          }}
        >
          <div className="px-4 text-2xl font-montserrat">
            <p className="font-semibold">
              ¿Estás seguro/a que deseas eliminar esta fecha?
            </p>
            <p>Esta acción no se puede deshacer.</p>
          </div>
        </ConfirmModal>
      </div>
    );
  return null;
};

export default DashboardDates;
