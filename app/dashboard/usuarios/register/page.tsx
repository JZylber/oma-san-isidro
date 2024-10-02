"use client";

import { FormEvent } from "react";
import { trpc } from "utils/trpc";
import bcrypt from "bcryptjs";

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
    <form onSubmit={handleRegister}>
      <input name="nombre" type="text" placeholder="Nombre" required />
      <input name="apellido" type="text" placeholder="Apellido" required />
      <input name="email" type="email" placeholder="Email" required />
      <input
        name="password"
        type="password"
        placeholder="Contraseña"
        required
      />
      <input
        name="passwordConfirmation"
        type="password"
        placeholder="Confirmar contraseña"
        required
      />
      <button type="submit">registrarse</button>
    </form>
  );
};

export default RegisterPage;
