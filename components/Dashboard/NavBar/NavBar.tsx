"use client";

import { usePathname } from "next/navigation";
import NavBarLink from "./NavBarLink";
import UserChip from "./UserChip";
import Link from "next/link";

const DashboardNavBar = () => {
  const pathname = usePathname();
  return (
    <nav className="w-[24rem] shrink-0 flex flex-col pl-4 py-4 gap-y-4 bg-primary-light-blue border-r-2 border-primary-black">
      <div className="flex justify-center items-center py-2 mr-4">
        <Link href="/" className="flex w-full">
          <span className="w-full py-8 text-6xl font-unbounded text-primary-black text-center bg-primary-white border-2 border-primary-black rounded-lg">
            OMA SI
          </span>
        </Link>
      </div>
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
      <NavBarLink
        href="/dashboard/calendario"
        selected={pathname === "/dashboard/calendario"}
      >
        Calendario
      </NavBarLink>
      <UserChip />
    </nav>
  );
};
export default DashboardNavBar;
