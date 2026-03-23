import styles from "./BankInformation.module.scss";

const BankInformation = () => {
  return (
    <div className={styles.border_box_container}>
      <div className={styles.border_box}>
        <h3>
          El depósito debe realizarse a nombre de: Fundación Olimpíada
          Matemática Argentina en cualquier sucursal del banco Galicia (Cuenta
          Corriente)
        </h3>
        <ul className={styles.bank_data}>
          <li className={styles.item}>N° Cuenta: 0002676-5665-6</li>
          <li className={styles.item}>CBU: 0070665620000002676566</li>
          <li className={styles.item}>CUIT: 30-67928383-5</li>
        </ul>
      </div>
    </div>
  );
};

export default BankInformation;
