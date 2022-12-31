import styles from './Navbar.module.scss';
import MenuIcon from '../../img/menuIcon.svg';
import X from '../../img/x.svg';
import NavBarItem from './NavBarItem';
import { useState } from 'react';
import MobileMenu from './MobileMenu/mobile-menu';

type NavProps = {
    children: JSX.Element};

export default function NavBarPage(props:NavProps){
    let [openFullMenu,setOpenFullMenu] = useState(false);

    const openCloseMenu = () => {
        setOpenFullMenu(!openFullMenu)
    }
    return(
        <>
        <nav className={`${styles.bar} ${openFullMenu ? styles.fullMenu : ""}`}>
            {openFullMenu?<X className={styles.icon} onClick={()=>openCloseMenu()}/>:<MenuIcon className={styles.icon} onClick={()=>openCloseMenu()}/>}
            <NavBarItem text='inicio' gridColumnStart={1}/>
            <NavBarItem text='oma' gridColumnStart={5}/>
            <NavBarItem text='ñandú' gridColumnStart={7}/>
            <NavBarItem text='internacional' gridColumnStart={9}/>
        </nav>
        {openFullMenu?<MobileMenu closeMenu={openCloseMenu}/>:props.children}
        </>
    )
}