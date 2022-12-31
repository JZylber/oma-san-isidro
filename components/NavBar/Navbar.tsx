import styles from './Navbar.module.scss';
import MenuIcon from '../../img/menuIcon.svg';
import NavBarItem from './NavBarItem';
import Link from 'next/link';

export default function NavBar(){
    return(
        <nav className={styles.bar}>
            <Link href="/mobile-menu"><MenuIcon className={styles.icon}/></Link>
            <NavBarItem text='inicio' gridColumnStart={1}/>
            <NavBarItem text='oma' gridColumnStart={5}/>
            <NavBarItem text='ñandú' gridColumnStart={7}/>
            <NavBarItem text='internacional' gridColumnStart={9}/>
        </nav>
    )
}