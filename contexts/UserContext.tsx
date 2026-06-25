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
  logout: () => Promise<boolean>;
  register: (
    nombre: string,
    apellido: string,
    email: string,
    password: string
  ) => Promise<boolean | Error>;
  isLoggingIn: boolean;
  isLoggingOut: boolean;
};

const emptyUser: User = { id: -1, nombre: "", apellido: "", rol: "" };

const AuthContext = createContext<UserContextType>({
  user: emptyUser,
  login: async () => emptyUser,
  logout: async () => false,
  register: async () => false,
  isLoggingIn: false,
  isLoggingOut: false,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(emptyUser);

  const sessionQuery = trpc.users.getSession.useQuery(undefined, {
    retry: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (sessionQuery.data) {
      setUser(sessionQuery.data);
    } else if (!sessionQuery.isLoading) {
      setUser(emptyUser);
    }
  }, [sessionQuery.data, sessionQuery.isLoading]);

  const loginEndPoint = trpc.users.loginUser.useMutation({
    onSuccess: (response) => {
      setUser(response.user);
    },
  });

  const logoutEndPoint = trpc.users.logoutUser.useMutation({
    onSuccess: () => {
      setUser(emptyUser);
    },
  });

  const login = async (email: string, password: string) => {
    const response = await loginEndPoint.mutateAsync({ email, password });
    return response.user;
  };

  const logout = async () => {
    return await logoutEndPoint.mutateAsync();
  };

  const register = async (
    nombre: string,
    apellido: string,
    email: string,
    password: string
  ) => {
    return Error("Not implemented");
  };

  const isLoggingIn = loginEndPoint.isLoading;
  const isLoggingOut = logoutEndPoint.isLoading;

  return (
    <AuthContext.Provider
      value={{ user, login, logout, register, isLoggingIn, isLoggingOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
