import styles from './Title.module.scss'

export default function Title(){
    return(
        <div className={styles.title}>
            <h1>oma</h1>
            <h2>San Isidro</h2>
            <p>Secretaría Regional Buenos Aires Norte de las Olimpiadas de Matemática Argentinas.</p>
        </div>
    )
}