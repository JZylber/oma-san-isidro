import { ReactNode } from "react";
import Footer from "../Footer/Footer";
import NavBar from "../NavBar/Navbar";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col w-full h-screen justify-start items-center overflow-hidden">
      <div className="overflow-y-scroll overflow-x-hidden flex flex-col w-full h-screen items-center">
        <NavBar />
        <main className="flex-auto flex flex-col max-tablet:w-[80%] tablet:w-[85%] tablet:mt-[4.8rem] desktop:w-[80%] desktop:max-w-[1200px]">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
};
export default Layout;
