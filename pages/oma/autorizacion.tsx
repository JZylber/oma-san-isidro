import { NextPage } from "next";
import NavBar from "../../components/NavBar/Navbar";
import { Authorization } from "../../components/Auth/Auth";
import styles from "../styles/Home.module.scss";

const OMAAuthorization: NextPage = () => {
  return (
    <>
      <NavBar />
      <div className={styles.wrapperLayout}>
        <div className={styles.pageLayout}>
          <Authorization />
        </div>
      </div>
    </>
  );
};

export default OMAAuthorization;
