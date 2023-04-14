import styles from "./BasicLoader.module.scss";

const BasicLoader = () => {
    return(
        <div>
            <span className={styles.loader}></span>
        </div>
    )
}

export default BasicLoader