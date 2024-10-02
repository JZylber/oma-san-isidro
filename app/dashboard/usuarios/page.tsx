"use client";

import Link from "next/link";
import React from "react";
import { trpc } from "../../../utils/trpc";

const UserEditPage = () => {
  const users = trpc.users.getUsers.useQuery();
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.data?.map((user) => (
            <tr key={user.id_usuario}>
              <td>{user.nombre}</td>
              <td>{user.apellido}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button>
        <Link href={"/dashboard/usuarios/register"}>
          registrar nuevo usuario
        </Link>
      </button>
    </>
  );
};

export default UserEditPage;
