"use client";

import { FormEvent } from "react";
import { trpc } from "utils/trpc";
import bcrypt from "bcryptjs";
import ActionButton from "components/buttons/ActionButton/ActionButton";

const RegisterPage = () => {
  const register = trpc.users.registerUser.useMutation();
  const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const nombre = form["nombre"].value;
    const apellido = form["apellido"].value;
    const email = form["email"].value;
    const password = form["password"].value;
    const passwordConfirmation = form["passwordConfirmation"].value;
    if (password !== passwordConfirmation) {
      alert("Las contraseñas no coinciden");
      return;
    }
    register.mutate({
      nombre,
      apellido,
      email,
      password: await bcrypt.hash(password, 10),
    });
  };
  return (
    <div className="grow flex flex-col justify-center items-center">
      <form
        onSubmit={handleRegister}
        className="w-2/5 flex flex-col gap-y-8 items-center"
      >
        <h1 className="font-unbounded text-6xl pb-12">Nuevo Usuario</h1>
        <div className="flex flex-col gap-y-2 w-full ">
          <label
            className="font-montserrat font-semibold text-xl"
            htmlFor="nombre"
          >
            Nombre
          </label>
          <input
            className="w-full font-montserrat px-4 py-2 border-2 border-primary-black rounded-xl text-2xl"
            name="nombre"
            type="text"
            placeholder="Nombre"
            required
          />
        </div>
        <div className="flex flex-col gap-y-2 w-full ">
          <label
            className="font-montserrat font-semibold text-xl"
            htmlFor="apellido"
          >
            Apellido
          </label>
          <input
            className="w-full font-montserrat px-4 py-2 border-2 border-primary-black rounded-xl text-2xl"
            name="apellido"
            type="text"
            placeholder="Apellido"
            required
          />
        </div>
        <div className="flex flex-col gap-y-2 w-full ">
          <label
            className="font-montserrat font-semibold text-xl"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="w-full font-montserrat px-4 py-2 border-2 border-primary-black rounded-xl text-2xl"
            name="email"
            type="email"
            placeholder="Email"
            required
          />
        </div>
        <div className="flex flex-col gap-y-2 w-full ">
          <label
            className="font-montserrat font-semibold text-xl"
            htmlFor="password"
          >
            Contraseña
          </label>
          <input
            className="w-full font-montserrat px-4 py-2 border-2 border-primary-black rounded-xl text-2xl"
            name="password"
            type="password"
            placeholder="Contraseña"
            required
          />
        </div>
        <div className="flex flex-col gap-y-2 w-full ">
          <label
            className="font-montserrat font-semibold text-xl"
            htmlFor="passwordConfirmation"
          >
            Confirmar contraseña
          </label>
          <input
            className="w-full font-montserrat px-4 py-2 border-2 border-primary-black rounded-xl text-2xl"
            name="passwordConfirmation"
            type="password"
            placeholder="Confirmar contraseña"
            required
          />
        </div>
        <ActionButton
          onClick={() => {}}
          type="submit"
          className="!w-1/3"
          important
        >
          Registrar
        </ActionButton>
      </form>
    </div>
  );
};

export default RegisterPage;
