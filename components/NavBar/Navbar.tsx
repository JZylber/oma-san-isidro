import styles from './Navbar.module.scss';
import MenuIcon from '../../img/menuIcon.svg';
import X from '../../img/x.svg';
import { useEffect, useState } from 'react';
import MobileMenu from './MobileMenu/mobile-menu';
import TopMenu from './TopMenu/TopMenu';
import { MenuHierarchy, menuItem, showCurrentPageSelected } from './NavBarRouting';
import SubMenu from './TopMenu/SubMenu';
import { useRouter } from 'next/router';

type NavProps = {
    togglePageContent? : () => void};

export default function NavBar({togglePageContent}:NavProps){
    let [openFullMenu,setOpenFullMenu] = useState(false);
    const defaultMenuHierarchy : Array<menuItem> = [
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
    const router = useRouter();
    const [menuHierarchy,setMenuHierarchy] = useState(showCurrentPageSelected(defaultMenuHierarchy,router.pathname));
    const [subMenuItems,setSubMenuItems] = useState<MenuHierarchy>([]);
    const [showSubMenu,setShowSubMenu] = useState(false);

    const clickMainItem = (itemName : string) => {
        const item = menuHierarchy.find((item) => item.text == itemName);
        if(item){
            if(item.link){
                router.push(item.link)
            } else {
                item.selected = true;
                setMenuHierarchy(menuHierarchy.map((mainMenuitem) => {
                    if(mainMenuitem.text == item.text){
                        return(item)
                    } else {
                        let newItem = {...mainMenuitem, selected:false}
                        return(newItem)
                    }
                }
                ))
                setShowSubMenu(true);
                setSubMenuItems(item.subItems);
            }
        }
    }
    useEffect(() => {
        menuHierarchy.forEach((item) => {
            if(item.selected && item.subItems.length > 0){
                setShowSubMenu(true);
                setSubMenuItems(item.subItems);      
            }
        })
    }) 
    const openCloseMenu = () => {
        setOpenFullMenu(!openFullMenu);
        togglePageContent && togglePageContent();
    }
    return(
        <nav className={styles.navbar}> 
        <div className={styles[["navbar_main", (openFullMenu ? "_full" : "")].join("")]}>
            <div className={styles.iconWrapper}>
                {openFullMenu?<X className={styles.icon} onClick={()=>openCloseMenu()}/>:<MenuIcon className={styles.icon} onClick={()=>openCloseMenu()}/>}
            </div>
            {openFullMenu ? <MobileMenu closeMenu={openCloseMenu} menuHierarchy={menuHierarchy}/>: <TopMenu menuHierarchy={menuHierarchy} onClick={clickMainItem}/> }
        </div>
            {showSubMenu && <SubMenu items={subMenuItems}/>}
        </nav>
    )
}