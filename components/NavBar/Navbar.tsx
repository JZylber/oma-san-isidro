import styles from './Navbar.module.scss';
import MenuIcon from '../../img/menuIcon.svg';
import X from '../../img/x.svg';
import { useState } from 'react';
import MobileMenu from './MobileMenu/mobile-menu';
import TopMenu from './TopMenu/top-menu';
import { menuItem } from './NavBarRouting';

type NavProps = {
    togglePageContent? : () => void};

export default function NavBar({togglePageContent}:NavProps){
    let [openFullMenu,setOpenFullMenu] = useState(false);
    const menuHierarchy : Array<menuItem> = [
        {text: "Inicio",link:"/",selected : false,subItems:[]},
        {text: "Oma",link:undefined,selected : false,subItems:[
            {text: "Autorización",link:'/oma/autorizacion',selected : false,subItems:[]},
            {text: "Inscripción",link:undefined,selected : false,subItems:[]},
            {text: "Reglamento",link:undefined,selected : false,subItems:[]},
            {text: "Sedes",link:undefined,selected : false,subItems:[]},
            {text: "Resultados",link:undefined,selected : false,subItems:[]},
            {text: "Problemas",link:undefined,selected : false,subItems:[]}
        ]},
        {text: "Ñandú",link:undefined,selected : false,subItems:[
            {text: "Autorización",link:'/nandu/autorizacion',selected : false,subItems:[]},
            {text: "Inscripción",link:undefined,selected : false,subItems:[]},
            {text: "Reglamento",link:undefined,selected : false,subItems:[]},
            {text: "Sedes",link:undefined,selected : false,subItems:[]},
            {text: "Resultados",link:undefined,selected : false,subItems:[]},
            {text: "Problemas",link:undefined,selected : false,subItems:[]}
        ]},
        {text: "Internacional",link:"/internacional",selected : false,subItems:[]},
    ];

    const openCloseMenu = () => {
        setOpenFullMenu(!openFullMenu);
        togglePageContent && togglePageContent();
    }
    return(
        <nav className={styles[["navbar", (openFullMenu ? "_full" : "")].join("")]}>
            <div className={styles.iconWrapper}>
                {openFullMenu?<X className={styles.icon} onClick={()=>openCloseMenu()}/>:<MenuIcon className={styles.icon} onClick={()=>openCloseMenu()}/>}
            </div>
            {openFullMenu ? <MobileMenu closeMenu={openCloseMenu} menuHierarchy={menuHierarchy}/>: <TopMenu menuHierarchy={menuHierarchy}/> }
        </nav>
    )
}