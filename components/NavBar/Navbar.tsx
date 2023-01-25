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
            {text: "Resultados",link:'/oma/resultados',selected : false,subItems:[]},
            {text: "Problemas",link:undefined,selected : false,subItems:[]}
        ]},
        {text: "Ñandú",link:undefined,selected : false,subItems:[
            {text: "Autorización",link:'/nandu/autorizacion',selected : false,subItems:[]},
            {text: "Inscripción",link:undefined,selected : false,subItems:[]},
            {text: "Reglamento",link:undefined,selected : false,subItems:[]},
            {text: "Sedes",link:undefined,selected : false,subItems:[]},
            {text: "Resultados",link:'/nandu/resultados',selected : false,subItems:[]},
            {text: "Problemas",link:undefined,selected : false,subItems:[]}
        ]},
        {text: "Internacional",link:"/internacional",selected : false,subItems:[]},
    ];
    const router = useRouter();
    const [menuHierarchy,setMenuHierarchy] = useState(showCurrentPageSelected(defaultMenuHierarchy,router.pathname));
    const showSubMenu = () => {
        return(menuHierarchy.find((element) => element.selected && element.subItems.length > 0) != undefined)
    }
    const getSubitems = () => {
        let item = menuHierarchy.find((element) => element.selected)
        if(item){
            return(item.subItems)
        }else{
            return([])
        }
    }
    const selectItem = (hierarchy:MenuHierarchy,mainCategory:number,subCategory?:number) => {
        return(hierarchy.map((item,index) => {
            let newItem : menuItem;
            if(index == mainCategory){
                newItem = {...item,selected:true,subItems:item.subItems.map((subItem,subIndex) => {
                    if(subCategory && subCategory == subIndex){
                        return({...subItem,selected:true})
                    }else {
                        return({...subItem,selected:false})
                    }
                })}
            } else {
                newItem = {...item,selected:false,subItems:item.subItems.map((subItem) => {return{...subItem,selected:false}})}
            }
            return(newItem)
        }))
    }

    const clickMainItem = (itemName : string) => {
        const itemIndex = menuHierarchy.findIndex((item) => item.text == itemName);
        const item = menuHierarchy[itemIndex]
        if(item){
            if(item.link){
                router.push(item.link)
            }
            item.selected = true;
            setMenuHierarchy(selectItem(menuHierarchy,itemIndex))
        }
    } 
    const openCloseMenu = () => {
        setOpenFullMenu(!openFullMenu);
        togglePageContent && togglePageContent();
    }

    const isNotAtHome = () => {
        const homeIndex: number = menuHierarchy.findIndex((item) => item.text == 'Inicio');
        const home: menuItem = menuHierarchy[homeIndex]
        const isAtHome: boolean = home.selected;
        return !isAtHome;
    }

    return(
        <nav className={styles.navbar}> 
            <div className={styles[["navbar_main", (openFullMenu ? "_full" : "")].join("")]}>
                <div className={styles.iconWrapper}>
                    {openFullMenu?<X className={styles.icon} onClick={()=>openCloseMenu()}/>:<MenuIcon className={styles.icon} onClick={()=>openCloseMenu()}/>}
                </div>
                {openFullMenu ? <MobileMenu closeMenu={openCloseMenu} menuHierarchy={menuHierarchy}/>: <TopMenu menuHierarchy={menuHierarchy} onClick={clickMainItem}/> }
            </div>
            {isNotAtHome() && <SubMenu items={getSubitems()}/>}
        </nav>
    )
}