import { INSTANCIA } from "@prisma/client";
import { ReactNode, createContext } from "react";
import { Testdata } from "server/app-router-db-calls";

export const TestContext = createContext<Testdata>({
  id: -1,
  instancia: "" as INSTANCIA,
  competencia: "",
  año: 0,
  resultados_disponibles: false,
  cantidad_problemas: 0,
});

export const TestProvider = ({
  data,
  children,
}: {
  data: Testdata;
  children: ReactNode;
}) => {
  return <TestContext.Provider value={data}>{children}</TestContext.Provider>;
};
