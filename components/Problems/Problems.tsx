import styles from "./Problems.module.scss";

const Problems : ({type}: {type: string}) => JSX.Element = ({type}) => {
    return(
    <>
        <h1 className={styles.title}>Problemas</h1>
    </>
    )
}

export default Problems