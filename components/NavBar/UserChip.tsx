import useAuth from "hooks/useAuth";
import useOutsideClick from "hooks/useOutsideClick";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

const NavUserChip = () => {
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const { user, logout } = useAuth();
  const ref = useOutsideClick(() => setOpenUserMenu(false));
  const logged = user.id !== -1;
  return (
    <div className="w-[7.5%] desktop:w-[10%] flex justify-center items-center">
      <div
        ref={ref}
        className="flex w-[48px] h-[48px] bg-primary-white rounded-full border-2 border-primary-black "
      >
        {logged ? (
          <div
            className="flex justify-center items-center w-full h-full cursor-pointer"
            onClick={() => {
              if (logged) setOpenUserMenu(!openUserMenu);
            }}
          >
            <Image
              src="/icons/person.svg"
              width="32"
              height="32"
              alt="account"
            />
          </div>
        ) : (
          <Link
            href="/login"
            className="flex justify-center items-center w-full h-full"
          >
            <Image src="/icons/login.svg" width="32" height="32" alt="login" />
          </Link>
        )}
        <div
          onClick={() => setOpenUserMenu(false)}
          className={`${
            !openUserMenu ? "translate-x-full" : ""
          } absolute bottom-0 right-0 overflow-hidden translate-y-full bg-primary-white border-l-2 border-y-2 border-primary-black rounded-l-xl box-border min-w-[300px] transition-all divide-y-2 divide-primary-black`}
        >
          <div className="flex justify-around items-center py-6">
            <div className="flex w-[56px] h-[56px] bg-primary-white rounded-full border-2 border-primary-black items-center justify-center">
              <Image
                src="/icons/person.svg"
                width="40"
                height="40"
                alt="user icon"
              />
            </div>
            <div className="flex flex-col gap-y-4 items-center">
              <span className="font-montserrat text-3xl font-semibold">
                ¡Hola {user.nombre}!
              </span>
              <span className="font-unbounded text-2xl">
                {user.rol.toLocaleUpperCase()}
              </span>
            </div>
          </div>
          <div>
            <Link href="/dashboard">
              <div className="flex justify-between items-center px-8 py-4">
                <Image
                  src="/icons/dashboard.svg"
                  width="24"
                  height="24"
                  alt=""
                />
                <span className="font-montserrat text-2xl">Dashboard</span>
              </div>
            </Link>
          </div>
          <div
            onClick={logout}
            className="flex justify-between items-center px-8 py-4 cursor-pointer"
          >
            <Image src="/icons/logout.svg" width="24" height="24" alt="" />
            <span className="font-montserrat text-2xl">Logout</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavUserChip;
