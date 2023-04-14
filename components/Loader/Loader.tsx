import BasicLoader from "./BasicLoader";
import styles from "./Loader.module.scss";

const Loader = () => {
    return(
        <div className={styles.loader_container}>
            <BasicLoader/>
        </div>
    )
}

export default Loader