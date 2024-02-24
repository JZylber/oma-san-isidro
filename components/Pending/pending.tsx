import styles from "./Pending.module.scss";
 
const Pending :({text}: {text: string}) => JSX.Element =   ({text}) => {  
  return (
    <div className={styles.pending_container}>
      <h1 className={styles.pending_title}>¡Un momento!</h1>
      <h2 className={styles.pending_subtitle}>Página desactualizada</h2>
      <p className={styles.pending_text}>{text}</p>
    </div>
  )
}

export default Pending