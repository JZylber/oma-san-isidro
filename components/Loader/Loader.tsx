import styles from "./Loader.module.scss";

const Loader = () => {
    return(
        <div className={styles.loader_container}>
            <span className={styles.loader}></span>
        </div>
    )
}

export default Loader