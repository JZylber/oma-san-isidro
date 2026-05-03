import styles from "./Footer.module.scss";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className={styles.footer_secretary}>
        <p className={styles.footer_secretary_title}>Secretaria Regional</p>
        <p className={styles.footer_secretary_name}>Elena Guillé</p>
      </div>
      <div className={styles.footer_links}>
        <ul>
          <li>
            <div className={styles.footer_links_item}>
              <a href="https://www.oma.org.ar/">Sitio principal de OMA</a>
            </div>
          </li>
          <li>
            <div className={styles.footer_links_item}>
              <a href="http://omasanisidro.flashingsites.com.ar/index_old.htm">
                Sitio viejo
              </a>
            </div>
          </li>
          <li>
            <div className={styles.footer_links_item}>
              <Link href={"/contacto"}>Contacto</Link>
            </div>
          </li>
          <li>
            <div className={styles.footer_links_item}>
              <a href="https://oma.org.ar/donaciones/">Contribuciones</a>
            </div>
          </li>
          {/*<li>
            <a>Mapa del sitio</a>
          </li>*/}
        </ul>
        <div className={styles.footer_logo} style={{ position: "relative" }}>
          <Image src="/images/logoOMA.svg" fill alt="" style={{ objectFit: "contain" }} />
        </div>
      </div>
      <div className={styles.footer_credits}>
        <div>
          <p>© {year} Joaquín Aldrey y Julián Zylber.</p>
          <p>Todos los derechos reservados.</p>
        </div>
        <div>
          <a
            href="https://www.instagram.com/oma_sanisidro?igsh=MTh4aXkwbnFyMWJheQ=="
            title="Instagram"
          >
            <Image
              src={"/icons/instagram.png"}
              alt={"Instagram"}
              width={30}
              height={30}
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
