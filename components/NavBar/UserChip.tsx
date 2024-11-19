import ActionButton from "components/buttons/ActionButton/ActionButton";
import useAuth from "hooks/useAuth";
import useOutsideClick from "hooks/useOutsideClick";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const NavUserChip = () => {
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const { user, logout } = useAuth();
  const ref = useOutsideClick(() => setOpenUserMenu(false));
  const logged = user.id !== -1;
  return (
    <div className="absolute right-0 h-[inherit] pt-[inherit] top-0 border-box w-[7.5%] desktop:w-[10%] flex justify-center items-center">
      <div
        ref={ref}
        className="flex w-[48px] h-[36px] desktop:h-[48px] bg-primary-white rounded-full border-2 border-primary-black "
      >
        <div
          className="flex justify-center items-center w-full h-full cursor-pointer"
          onClick={() => {
            setOpenUserMenu(!openUserMenu);
          }}
        >
          <Image
            src={`/icons/${logged ? "person" : "login"}.svg`}
            width="32"
            height="32"
            alt="account menu"
          />
        </div>
        <div
          onClick={() => setOpenUserMenu(false)}
          className={`${
            !openUserMenu ? "translate-x-full" : ""
          } absolute bottom-0 right-0 overflow-hidden translate-y-[calc(100%+1.6rem)] shadow-lg bg-primary-white border-l-2 border-y-2 border-primary-black rounded-l-xl box-border min-w-[300px] transition-all divide-y-2 divide-primary-black flex flex-col space-between`}
        >
          {logged ? (
            <>
              <div className="flex justify-around items-center py-12">
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
            </>
          ) : (
            <>
              <div className="flex flex-col gap-y-6 items-center p-4">
                <span className="font-unbounded text-2xl font-semibold self-start">
                  BETA
                </span>
                <span className="font-montserrat text-3xl font-semibold">
                  ¡Hola!
                </span>
                <span className="font-montserrat text-xl text-center">
                  Ingresá con tu cuenta. Por este año, está función es solo para
                  administradores y representates de colegios.
                </span>
                <Link href="/login">
                  <ActionButton onClick={() => {}} important>
                    Ingresar
                  </ActionButton>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavUserChip;
