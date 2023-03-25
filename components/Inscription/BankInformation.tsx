import styles from "./BankInformation.module.scss"

const BankInformation = () => {
    return(
    <div className={styles.border_box_container}>
        <div className={styles.border_box}>
            <h3>El depósito debe realizarse a nombre de: Fundación Olimpíada Matemática Argentina en cualquier sucursal del banco HSBC (Cuenta Corriente)</h3>
            <ul className={styles.bank_data}>
                <li>N° Cuenta: 6093228419</li>
                <li>CBU: 15006099 - 00060932284196</li>
                <li>CUIT: 30-67928383-5</li>
            </ul>
        </div>
    </div>       
    )
}

export default BankInformation