import styles from "./Footer.module.scss";
import OMALogo from "../../img/logoOMA.svg";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer_secretary}>
        <h4>Secretaria Regional</h4>
        <span>Elena Guillé</span>
      </div>
      <div className={styles.footer_links}>
        <ul>
          <li>
            <a href="https://www.oma.org.ar/">Sitio principal de OMA</a>
          </li>
          <li>
            <a href="http://omasanisidro.flashingsites.com.ar/">Sitio viejo</a>
          </li>
          <li>
            <a>Contacto</a>
          </li>
          <li>
            <a>Mapa del sitio</a>
          </li>
        </ul>
        <OMALogo className={styles.footer_links_logo} />
      </div>
      <div className={styles.footer_credits}>
        <p>© 2022 Joaquín Aldrey y Julián Zylber.</p>
        <p>Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
