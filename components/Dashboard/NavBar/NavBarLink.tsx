import Link from "next/link";

const NavBarLink = ({
  href,
  children,
  selected,
}: {
  href: string;
  children: React.ReactNode;
  selected?: boolean;
}) => {
  return (
    <Link
      href={href}
      className={`font-unbounded text-4xl p-4 -mr-[2px] rounded-l-xl hover:font-bold transition-[font-weight] ${
        selected
          ? "bg-primary-white border-y-2 border-l-2 border-primary-black"
          : ""
      }`}
    >
      {children}
    </Link>
  );
};

export default NavBarLink;
