"use client";
import React, { useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { Button } from "../../components/buttons/Button";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const handleLogin = async () => {
    const loginApi = (await fetch(`../api/auth`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    }).catch((error) => {
      setError("Error de conexión");
    })) as Response;
    let result = await loginApi.json();
    if (loginApi.status !== 200) {
      console.log(loginApi);
      setError(loginApi.statusText);
      return;
    }
    if (result.success && result.token) {
      Cookies.set("currentUser", result.token, { sameSite: "strict" });
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full space-y-32">
        <div>
          <h1 className="mt-6 text-center text-6xl font-unbounded text-gray-900">
            ¡Bienvenido/a!
          </h1>
        </div>
        <form className="space-y-16 font-montserrat text-2xl">
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          {error !== "" && <p className="text-red-500 text-center">{error}</p>}
          <div>
            <Button content="Ingresar" onClick={handleLogin} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
