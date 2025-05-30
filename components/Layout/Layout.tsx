import { ReactNode } from "react";
import Footer from "../Footer/Footer";
import NavBar from "../NavBar/Navbar";
import styles from "./Layout.module.scss";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className={styles.layout}>
      <div className="overflow-y-scroll overflow-x-hidden flex flex-col w-full h-screen items-center">
        <NavBar />
        <main className={styles.main}>{children}</main>
        <Footer />
      </div>
    </div>
  );
};
export default Layout;
