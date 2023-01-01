import styles from './Navbar.module.scss';
import MenuIcon from '../../img/menuIcon.svg';
import X from '../../img/x.svg';
import NavBarItem from './NavBarItem';
import { useState } from 'react';
import MobileMenu from './MobileMenu/mobile-menu';

type NavProps = {
    togglePageContent? : () => void};

export default function NavBar({togglePageContent}:NavProps){
    let [openFullMenu,setOpenFullMenu] = useState(false);

    const openCloseMenu = () => {
        setOpenFullMenu(!openFullMenu);
        togglePageContent && togglePageContent();
    }
    return(
        <nav className={`${styles.bar} ${openFullMenu ? styles.fullMenu : ""}`}>
            {openFullMenu?<X className={styles.icon} onClick={()=>openCloseMenu()}/>:<MenuIcon className={styles.icon} onClick={()=>openCloseMenu()}/>}
            <NavBarItem text='inicio' gridColumnStart={1}/>
            <NavBarItem text='oma' gridColumnStart={5}/>
            <NavBarItem text='ñandú' gridColumnStart={7}/>
            <NavBarItem text='internacional' gridColumnStart={9}/>
            {openFullMenu && <MobileMenu closeMenu={openCloseMenu}/>}
        </nav>
    )
}