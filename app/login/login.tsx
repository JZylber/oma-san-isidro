"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../../components/buttons/Button";
import useAuth from "hooks/useAuth";
import Loader from "components/Loader/Loader";
import { useForm } from "react-hook-form";

interface LoginFormData {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginFormData>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const router = useRouter();
  const handleLogin = async ({ email, password }: LoginFormData) => {
    setLoading(true);
    try {
      const user = await login(email, password);
      if (user) {
        router.push("/dashboard");
      }
    } catch (error) {
      setError("Email o contraseña incorrecto");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center bg-primary-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full space-y-32">
        <div>
          <h1 className="mt-6 text-center text-6xl font-unbounded text-gray-900">
            ¡Bienvenido/a!
          </h1>
        </div>
        <form
          className="space-y-8 font-montserrat text-2xl"
          onSubmit={handleSubmit(handleLogin)}
          noValidate
        >
          <div className="flex flex-col w-full gap-y-2">
            <label className="font-semibold font-xl">Email</label>
            <input
              type="email"
              autoComplete="email"
              className="w-full font-montserrat px-4 py-2 border-2 border-primary-black rounded-xl text-2xl"
              {...register("email", {
                required: true,
                pattern: /^\S+@\S+$/i,
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-xl">Ingrese un email válido</p>
            )}
          </div>
          <div className="flex flex-col w-full gap-y-2">
            <label className="font-semibold font-xl">Contraseña</label>
            <input
              className="w-full font-montserrat px-4 py-2 border-2 border-primary-black rounded-xl text-2xl"
              type="password"
              autoComplete="current-password"
              {...register("password", { required: "Ingrese su contraseña" })}
            />
            {errors.password && (
              <p className="text-red-500 text-xl">{errors.password.message}</p>
            )}
          </div>
          {error && <p className="text-red-500 text-2xl">{error}</p>}
          <div className="pt-12">
            <Button content="Ingresar" type="submit" />
          </div>
        </form>
        {loading && <Loader />}
      </div>
    </div>
  );
};

export default LoginPage;
