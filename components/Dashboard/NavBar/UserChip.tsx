import useAuth from "hooks/useAuth";
import Image from "next/image";
import { useRouter } from "next/navigation";

const UserChip = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const handleLogout = async () => {
    await logout();
    router.push("/");
  };
  if (user.id === -1) return null;
  return (
    <div className="mt-auto flex gap-x-4 justify-between items-center bg-transparent border-2 border-primary-black p-4 mr-4 rounded-lg">
      <span className="font-unbounded text-2xl">
        {user.nombre} {user.apellido}
      </span>
      <Image
        src="/icons/logout.svg"
        alt="logout"
        width={24}
        height={24}
        onClick={handleLogout}
        className="cursor-pointer"
      />
    </div>
  );
};

export default UserChip;
