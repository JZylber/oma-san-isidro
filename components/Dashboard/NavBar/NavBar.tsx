"use client";

import { usePathname } from "next/navigation";
import NavBarLink from "./NavBarLink";

const DashboardNavBar = () => {
  const pathname = usePathname();
  return (
    <nav className="w-1/6 flex flex-col pl-4 py-4 gap-y-4 bg-primary-light-blue border-r border-primary-black">
      <NavBarLink href="/dashboard" selected={pathname === "/dashboard"}>
        Inicio
      </NavBarLink>
      <NavBarLink
        href="/dashboard/resultados"
        selected={pathname === "/dashboard/resultados"}
      >
        Resultados
      </NavBarLink>
      <NavBarLink
        href="/dashboard/noticias"
        selected={pathname === "/dashboard/noticias"}
      >
        Noticias
      </NavBarLink>
      <NavBarLink
        href="/dashboard/usuarios"
        selected={pathname === "/dashboard/usuarios"}
      >
        Usuarios
      </NavBarLink>
    </nav>
  );
};
export default DashboardNavBar;
