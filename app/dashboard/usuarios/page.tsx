"use client";

import Link from "next/link";
import React from "react";
import { trpc } from "utils/trpc";
import Table from "components/Table/Table";
import Loader from "components/Loader/Loader";
import ActionButton from "components/buttons/ActionButton/ActionButton";
import Image from "next/image";

const UserEditPage = () => {
  const users = trpc.users.getUsers.useQuery();
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
        headers={["Nombre", "Apellido", "Email", "Rol"]}
        make_element={(user, index) => {
          return (
            <tr key={index}>
              <td>{user.nombre}</td>
              <td>{user.apellido}</td>
              <td>{user.email}</td>
              <td>{user.rol}</td>
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
    </div>
  );
};

export default UserEditPage;
