"use client";
import { AuthProvider } from "contexts/UserContext";
import "../styles/globals.scss";
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

export default trpc.withTRPC(RootLayout);
