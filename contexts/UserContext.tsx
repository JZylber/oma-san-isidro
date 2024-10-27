import Cookies from "js-cookie";
import { ReactNode, createContext, useEffect, useState } from "react";
import { trpc } from "utils/trpc";

export type User = {
  id: number;
  nombre: string;
  apellido: string;
  rol: string;
};

export type UserContextType = {
  user: User;
  login: (email: string, password: string) => Promise<User | Error>;
  logout: () => void;
  register: (
    nombre: string,
    apellido: string,
    email: string,
    password: string
  ) => Promise<boolean | Error>;
};

const AuthContext = createContext<UserContextType>({
  user: {
    id: -1,
    nombre: "",
    apellido: "",
    rol: "",
  },
  login: async () => {
    return {
      id: -1,
      nombre: "",
      apellido: "",
      rol: "",
    };
  },
  logout: () => {},
  register: async () => {
    return false;
  },
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const loginEndPoint = trpc.users.loginUser.useMutation({
    onSuccess: (response) => {
      setUser(response.user);
      if (response.token) setToken(response.token);
    },
  });
  const [user, setUser] = useState<User>({
    id: -1,
    nombre: "",
    apellido: "",
    rol: "",
  });
  const setToken = (token: string) => {
    Cookies.set("accessToken", token, { sameSite: "strict" });
  };
  useEffect(() => loginEndPoint.mutate(), []);
  const login = async (email: string, password: string) => {
    const response = await loginEndPoint.mutateAsync({ email, password });
    return response.user;
  };

  const logout = () => {
    setUser({
      id: -1,
      nombre: "",
      apellido: "",
      rol: "",
    });
    Cookies.remove("accessToken");
  };

  const register = async (
    nombre: string,
    apellido: string,
    email: string,
    password: string
  ) => {
    return Error("Not implemented");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
