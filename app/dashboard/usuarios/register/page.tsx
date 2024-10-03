"use client";

import { trpc } from "utils/trpc";
import bcrypt from "bcryptjs";
import ActionButton from "components/buttons/ActionButton/ActionButton";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Loader from "components/Loader/Loader";

interface FormData {
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();
  const router = useRouter();
  const registerUser = trpc.users.registerUser.useMutation({
    onSuccess(data, variables, context) {
      router.push("/dashboard/usuarios");
    },
  });
  const handleRegister = async ({
    nombre,
    apellido,
    email,
    password,
  }: FormData) => {
    registerUser.mutate({
      nombre,
      apellido,
      email,
      password: await bcrypt.hash(password, 10),
    });
  };
  return (
    <div className="grow flex flex-col justify-center items-center">
      <form
        onSubmit={handleSubmit(handleRegister)}
        className="w-2/5 flex flex-col gap-y-8 items-center"
        noValidate
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
            type="text"
            {...register("nombre", { required: true })}
            aria-invalid={errors.nombre ? "true" : "false"}
          />
          {errors.nombre && (
            <p className="text-red-500 font-xl">Ingrese un nombre</p>
          )}
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
            type="text"
            {...register("apellido", { required: true })}
            aria-invalid={errors.apellido ? "true" : "false"}
          />
          {errors.apellido && (
            <p className="text-red-500 font-xl">Ingrese un apellido</p>
          )}
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
            type="email"
            placeholder="Email"
            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
            aria-invalid={errors.email ? "true" : "false"}
          />
          {errors.email && (
            <p className="text-red-500 font-xl">Ingrese un email válido</p>
          )}
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
            type="password"
            {...register("password", {
              required: true,
            })}
            aria-invalid={errors.password ? "true" : "false"}
          />
          {errors.password && (
            <p className="text-red-500 font-xl">
              Ingrese una contraseña válida
            </p>
          )}
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
            type="password"
            {...register("passwordConfirmation", {
              required: "Por favor confirme su contraseña",
              validate: (val: string) => {
                if (watch("password") !== val) {
                  return "Las contraseñas no coinciden";
                }
              },
            })}
          />
          {errors.passwordConfirmation && (
            <p className="text-red-500 font-xl">
              {errors.passwordConfirmation.message}
            </p>
          )}
        </div>
        <ActionButton
          onClick={() => {}}
          type="submit"
          className="!w-1/3"
          important
        >
          Registrar
        </ActionButton>
        {registerUser.isLoading && (
          <div className="w-full my-4">
            <Loader />
          </div>
        )}
      </form>
    </div>
  );
};

export default RegisterPage;
