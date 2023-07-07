import styles from "./Provincial.module.scss";

interface ProvincialProps {
    competition: string,
};

export interface ProvincialParticipant {
    nombre: string,
    apellido: string,
    nivel: number,
    colegio: string,
    sede?: string,
}

const Provincial = ({competition}: ProvincialProps) => {
    return(
        <>
        <p className={styles.text}>La instancia provincial es <span className={styles.bold}>OPCIONAL</span>. Esto quiere decir que tanto participantes que hayan clasificado al provincial y no vayan, como participantes que hayan aprobado la instancia zonal pero no hayan clasificado al provincial pueden seguir participando en OMA en la instancia regional.</p>
        <p className={styles.text}>Los participantes que pueden participar de la provincial son aquellos que sumen 5 puntos entre las instancias Zonal e {competition === "OMA"?"Intercolegial":"Interescolar"}.</p>
        <h3 className={styles.subtitle}>Clasificados a Provincial</h3>
        </>
    )
}

export default Provincial