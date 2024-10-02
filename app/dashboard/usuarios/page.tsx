"use client";

import Link from "next/link";
import React from "react";
import { trpc } from "utils/trpc";
import Table from "components/Table/Table";
import Loader from "components/Loader/Loader";
import { CardType } from "components/Table/types";

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
    <>
      <Table
        values={users.data}
        allValues={users.data}
        headers={["Nombre", "Apellido", "Email"]}
        make_element={(user, index) => {
          return (
            <tr key={index}>
              <td>{user.nombre}</td>
              <td>{user.apellido}</td>
              <td>{user.email}</td>
            </tr>
          );
        }}
      />
      <button>
        <Link href={"/dashboard/usuarios/register"}>
          registrar nuevo usuario
        </Link>
      </button>
    </>
  );
};

export default UserEditPage;
