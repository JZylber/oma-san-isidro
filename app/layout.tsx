"use client";
import { AuthProvider } from "contexts/UserContext";
import "../styles/globals.css";
import { trpc } from "../utils/trpc";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
};

// withTRPC viene del integrador de Pages Router y devuelve un NextComponentType,
// que no satisface el LayoutConfig<"/"> que Next 15 genera para el layout raíz.
// El componente sí recibe y renderiza children, así que sólo hace falta el tipo.
export default trpc.withTRPC(RootLayout) as (props: {
  children: React.ReactNode;
}) => React.ReactNode;
