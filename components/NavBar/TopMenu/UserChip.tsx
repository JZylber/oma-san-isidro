import useAuth from "hooks/useAuth";
import useOutsideClick from "hooks/useOutsideClick";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

const NavUserChip = () => {
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const { user, login, logout } = useAuth();
  const ref = useOutsideClick(() => setOpenUserMenu(false));
  const logged = user.id !== -1;
  return (
    <div
      ref={ref}
      className="w-[7.5%] desktop:w-[10%] flex justify-center items-center cursor-pointer"
    >
      <div
        className={`flex w-4/5 bg-primary-white justify-center rounded-t-xl border-2 border-primary-black relative ${
          openUserMenu ? "border-b-primary-white" : "rounded-b-xl "
        }`}
        onClick={() => {
          if (logged) setOpenUserMenu(!openUserMenu);
        }}
      >
        {logged ? (
          <span className="text-primary-black text-2xl font-unbounded py-4">
            {user.nombre[0].toUpperCase() + user.apellido[0].toUpperCase()}
          </span>
        ) : (
          <Link href="/login">
            <span className="text-primary-black text-2xl py-4 font-unbounded block">
              Ingresar
            </span>
          </Link>
        )}
        <div
          onClick={() => setOpenUserMenu(false)}
          className={`${
            openUserMenu ? "border-2" : "h-0 w-0 opacity-0"
          } absolute bottom-0 -right-[2px] overflow-hidden translate-y-full bg-primary-white  border-primary-black rounded-b-xl rounded-tl-xl box-border min-w-[200%] transition-all divide-y-2 divide-primary-black`}
        >
          <div>
            <Link href="/dashboard">
              <div className="flex justify-between items-center px-4 py-4">
                <span className="font-montserrat text-2xl">Dashboard</span>
                <Image
                  src="/icons/dashboard.svg"
                  width="24"
                  height="24"
                  alt=""
                />
              </div>
            </Link>
          </div>
          <div
            onClick={logout}
            className="flex justify-between items-center px-4 py-4"
          >
            <span className="font-montserrat text-2xl">Logout</span>
            <Image src="/icons/logout.svg" width="24" height="24" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavUserChip;
