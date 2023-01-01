import styles from './Footer.module.scss'
import OMALogo from '../../img/logoOMA.svg';

const Footer = () => {
    return(
        <footer className={styles.container}>
            <div className={styles.secretary}>
                <h4>Secretaria Regional</h4>
                <span>Elena Guillé</span>
            </div>
            <div className={styles.links}>
            <ul>
                <li><a href='https://www.oma.org.ar/'>Sitio principal de OMA</a></li>
                <li><a href='http://omasanisidro.flashingsites.com.ar/'>Sitio viejo</a></li>
                <li><a>Contacto</a></li>
                <li><a>Mapa del sitio</a></li>
            </ul>
            <OMALogo className={styles.logo}/>
            </div>
            <div className={styles.credits}>
                <p>© 2022 Joaquín Aldrey y Julián Zylber.</p>
                <p>Todos los derechos reservados.</p>
            </div>
        </footer>
    )
};

export default Footer;