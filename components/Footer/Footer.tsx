import styles from './Footer.module.scss'
import OMALogo from '../../img/logoOMA.svg';

const Footer = () => {
    return(
        <footer className={styles.container}>
            <h4>Secretaria Regional</h4>
            <p>Elena Guillé</p>
            <div className={styles.links}>
            <ul>
                <li><a href='https://www.oma.org.ar/'>Sitio principal de OMA</a></li>
                <li><a href='http://omasanisidro.flashingsites.com.ar/'>Sitio viejo</a></li>
                <li><a>Contacto</a></li>
                <li><a>Mapa del sitio</a></li>
            </ul>
            <OMALogo/>
            </div>
            <hr/>
            <div className={styles.credits}>
                <p>© 2022 Joaquín Aldrey y Julián Zylber.</p>
                <p>Todos los derechos reservados.</p>
            </div>
        </footer>
    )
};

export default Footer;