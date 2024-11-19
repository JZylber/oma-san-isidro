import { ReactNode } from "react";
import Footer from "../Footer/Footer";
import NavBar from "../NavBar/Navbar";
import styles from "./Layout.module.scss";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className={styles.layout}>
      <NavBar />
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  );
};
export default Layout;
