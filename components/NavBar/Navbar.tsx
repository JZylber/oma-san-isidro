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
        <nav className={styles[["navbar", (openFullMenu ? "_full" : "")].join("")]}>
            <div className={styles.iconWrapper}>
                {openFullMenu?<X className={styles.icon} onClick={()=>openCloseMenu()}/>:<MenuIcon className={styles.icon} onClick={()=>openCloseMenu()}/>}
            </div>
            <NavBarItem text='inicio'/>
            <NavBarItem text='' phantom={true}/>
            <NavBarItem text='oma' />
            <NavBarItem text='ñandú' />
            <NavBarItem text='internacional'/>
            {openFullMenu && <MobileMenu closeMenu={openCloseMenu}/>}
        </nav>
    )
}