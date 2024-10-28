import useAuth from "hooks/useAuth";
import Link from "next/link";

const NavUserChip = () => {
  const { user, login, logout } = useAuth();
  const logged = user.id !== -1;
  return (
    <div className="w-[7.5%] desktop:w-[10%] flex justify-center items-center cursor-pointer">
      <div className="flex w-4/5 py-4 bg-primary-white justify-center rounded-xl border-2 border-primary-black">
        {logged ? (
          <span className="text-primary-black text-2xl font-unbounded">
            {user.nombre[0].toUpperCase() + user.apellido[0].toUpperCase()}
          </span>
        ) : (
          <Link href="/login">
            <span className="text-primary-black text-2xl font-unbounded">
              Ingresar
            </span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default NavUserChip;
