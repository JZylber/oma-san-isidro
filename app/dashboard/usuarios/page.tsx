"use client";

import Link from "next/link";
import React, { useState } from "react";
import { trpc } from "utils/trpc";
import Table from "components/Table/Table";
import Loader from "components/Loader/Loader";
import ActionButton from "components/buttons/ActionButton/ActionButton";
import Image from "next/image";
import Modal from "components/Popups/Modal";
import { AppRouter } from "server/routers/_app";
import { inferRouterOutputs } from "@trpc/server";
import Select from "components/common/form/Select";
import { ROL } from "@prisma/client";

const UserEditModal = ({
  openModal,
  closeModal,
  onConfirm,
  result,
}: {
  openModal: boolean;
  closeModal: () => void;
  onConfirm: (news: User) => void;
  result: User;
}) => {
  const [newUser, setNewUser] = useState<User>(result);
  return (
    <Modal
      openModal={openModal}
      closeModal={closeModal}
      className="bg-primary-white border-2 border-primary-black rounded-xl m-auto w-1/2"
    >
      <div className="flex flex-col items-center">
        <h1 className="font-unbounded text-4xl py-8">Editar Resultado</h1>
        <form className="flex flex-col gap-y-4 w-2/3 px-8 py-4">
          <div className="flex flex-col gap-y-2">
            <label className="font-montserrat text-2xl font-semibold">
              Nombre
            </label>
            <input
              type="text"
              value={newUser.nombre}
              onChange={(e) =>
                setNewUser({ ...newUser, nombre: e.target.value })
              }
              className="bg-primary-white border-2 border-primary-black rounded-md p-2 font-montserrat text-2xl"
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <label className="font-montserrat text-2xl font-semibold">
              Apellido
            </label>
            <input
              type="text"
              value={newUser.apellido}
              onChange={(e) =>
                setNewUser({ ...newUser, apellido: e.target.value })
              }
              className="bg-primary-white border-2 border-primary-black rounded-md p-2 font-montserrat text-2xl"
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <label className="font-montserrat text-2xl font-semibold">
              Email
            </label>
            <input
              type="text"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
              className="bg-primary-white border-2 border-primary-black rounded-md p-2 font-montserrat text-2xl"
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <label className="font-montserrat text-2xl font-semibold">
              Rol
            </label>
            <Select
              value={newUser.rol}
              options={Object.values(ROL)}
              onChange={(value) => setNewUser({ ...newUser, rol: value })}
            />
          </div>
        </form>
        <div className="flex justify-around py-8 border-t w-full">
          <ActionButton onClick={closeModal}>Cancelar</ActionButton>
          <ActionButton
            onClick={() => {
              onConfirm(newUser);
              closeModal();
            }}
            important
          >
            Actualizar
          </ActionButton>
        </div>
      </div>
    </Modal>
  );
};

type Unpacked<T> = T extends (infer U)[] ? U : T;
type User = Unpacked<inferRouterOutputs<AppRouter>["users"]["getUsers"]>;

const UserEditPage = () => {
  const users = trpc.users.getUsers.useQuery();
  const updateUser = trpc.users.updateUser.useMutation();
  const [openModal, setOpenModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  if (users.error) {
    return <div>{users.error.message}</div>;
  }
  if (users.status === "loading") {
    return (
      <div className="grow flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-4">
      <Table
        values={users.data}
        allValues={users.data}
        headers={["Nombre", "Apellido", "Email", "Rol", "Acciones"]}
        make_element={(user, index) => {
          return (
            <tr key={index}>
              <td>{user.nombre}</td>
              <td>{user.apellido}</td>
              <td>{user.email}</td>
              <td>{user.rol}</td>
              <td>
                <div className="flex justify-center items-center gap-x-4 w-full h-full">
                  <Image
                    src="/icons/edit.svg"
                    alt="editar"
                    width={30}
                    height={30}
                    className="cursor-pointer"
                    onClick={() => {
                      setSelectedUser(user);
                      setOpenModal(true);
                    }}
                  />
                  <Image
                    src="/icons/delete.svg"
                    alt="eliminar"
                    width={30}
                    height={30}
                    className="cursor-pointer"
                  />
                </div>
              </td>
            </tr>
          );
        }}
      />
      <Link href={"/dashboard/usuarios/register"}>
        <ActionButton
          onClick={() => {}}
          important
          className="!w-[120px] flex justify-around items-center"
        >
          <Image src="/icons/add.svg" alt="sumar" width={24} height={24} />
          <span className="font-unbounded">NUEVO</span>
        </ActionButton>
      </Link>
      {selectedUser && (
        <UserEditModal
          openModal={openModal}
          closeModal={() => setOpenModal(false)}
          onConfirm={(user) => {}}
          result={selectedUser}
        />
      )}
    </div>
  );
};

export default UserEditPage;
