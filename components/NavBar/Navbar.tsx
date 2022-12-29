import styles from './Navbar.module.scss';
import MenuIcon from '../../img/menuIcon.svg';

export default function NavBar(){
    return(
        <nav className={styles.bar}>
            <MenuIcon className={styles.icon}/>
        </nav>
    )
}