import styles from "./Navbar.module.scss";
import MenuIcon from "../../public/images/menuIcon.svg";
import X from "../../public/images/x.svg";
import { useState } from "react";
import MobileMenu from "./MobileMenu/mobile-menu";
import TopMenu from "./TopMenu/TopMenu";
import {
  MenuHierarchy,
  menuItem,
  showCurrentPageSelected,
} from "./NavBarRouting";
import SubMenu from "./TopMenu/SubMenu";
import { useRouter } from "next/router";

type NavProps = {
    togglePageContent? : () => void,
    onRouteChange: () => void
};

export default function NavBar({togglePageContent,onRouteChange}:NavProps){
    let [openFullMenu,setOpenFullMenu] = useState(false);
    const defaultMenuHierarchy : Array<menuItem> = [
        {text: "Inicio",link:"/",selected : false,subItems:[]},
        {text: "Oma",link:undefined,selected : false,subItems:[
            {text: "Autorización",link:'/oma/autorizacion',selected : false,subItems:[]},
            {text: "Inscripción",link:'/oma/inscripcion',selected : false,subItems:[]},
            {text: "Reglamento",link:'/oma/reglamento',selected : false,subItems:[]},
            {text: "Sedes",link:'/oma/sedes',selected : false,subItems:[]},
            {text: "Resultados",link:'/oma/resultados',selected : false,subItems:[]},
            {text: "Problemas",link:'/oma/problemas',selected : false,subItems:[]}
        ]},
        {text: "Ñandú",link:undefined,selected : false,subItems:[
            {text: "Autorización",link:'/nandu/autorizacion',selected : false,subItems:[]},
            {text: "Inscripción",link:'/nandu/inscripcion',selected : false,subItems:[]},
            {text: "Reglamento",link:'/nandu/reglamento',selected : false,subItems:[]},
            {text: "Sedes",link:'/nandu/sedes',selected : false,subItems:[]},
            {text: "Resultados",link:'/nandu/resultados',selected : false,subItems:[]},
            {text: "Problemas",link:'/nandu/problemas',selected : false,subItems:[]}
        ]},
        {text: "Otros",link: undefined,selected:false,subItems:[
          {text: "Internacional",link:"/otros/internacional",selected : false,subItems:[]},
          {text: "Mateclubes",link:"/otros/mateclubes",selected : false,subItems:[]},
          {text: "Geometría",link:"/otros/geometria",selected : false,subItems:[]},
          {text: "Calendario",link:"/otros/calendario",selected : false,subItems:[]},
          {text: "Libros",link:"/otros/libros",selected : false,subItems:[]},
        ]},
        
    ];
    const router = useRouter()
    const [menuHierarchy,setMenuHierarchy] = useState(showCurrentPageSelected(defaultMenuHierarchy,router.pathname));
    const selectedMainItem = () => {
        const item = menuHierarchy.find((element) => element.selected)
        if(item){
            return(item.text)
        }else {
            return("")
        }
    }
  const getSubitems = () => {
    let item = menuHierarchy.find((element) => element.selected);
    if (item) {
      return item.subItems;
    } else {
      return [];
    }
  };
  const selectItem = (
    hierarchy: MenuHierarchy,
    mainCategory: number,
    subCategory?: number
  ) => {
    return hierarchy.map((item, index) => {
      let newItem: menuItem;
      if (index == mainCategory) {
        newItem = {
          ...item,
          selected: true,
          subItems: item.subItems.map((subItem, subIndex) => {
            if (subCategory && subCategory == subIndex) {
              return { ...subItem, selected: true };
            } else {
              return { ...subItem, selected: false };
            }
          }),
        };
      } else {
        newItem = {
          ...item,
          selected: false,
          subItems: item.subItems.map((subItem) => {
            return { ...subItem, selected: false };
          }),
        };
      }
      return newItem;
    });
  };

    const clickMainItem = (itemName : string) => {
        const itemIndex = menuHierarchy.findIndex((item) => item.text == itemName);
        const item = menuHierarchy[itemIndex]
        if(item){
            if(item.link && item.link !==  router.pathname){
                onRouteChange()
            }
            item.selected = true;
            setMenuHierarchy(selectItem(menuHierarchy,itemIndex))
        }
    }
    const clickSubItem = (mainItemName : string,subItemName: string) => {
        const mainItemIndex = menuHierarchy.findIndex((item) => item.text === mainItemName);
        const item = menuHierarchy[mainItemIndex]
        const subItemIndex = item.subItems.findIndex((subitem) => subitem.text === subItemName)
        const subItem = item.subItems[subItemIndex]
        if(subItem.link && subItem.link !== router.pathname){
          onRouteChange();
        }
        setMenuHierarchy(selectItem(menuHierarchy,mainItemIndex,subItemIndex))
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
                    <div className={styles.iconWrapper_icon}>
                      {openFullMenu?<X className={styles.icon} onClick={()=>openCloseMenu()}/>:<MenuIcon className={styles.icon} onClick={()=>openCloseMenu()}/>}
                    </div>
                </div>
                {openFullMenu ? <MobileMenu closeMenu={openCloseMenu} menuHierarchy={menuHierarchy}/>: <TopMenu menuHierarchy={menuHierarchy} onMainItemClick={clickMainItem}/> }
            </div>
            {isNotAtHome() && <SubMenu items={getSubitems()} onSubItemClick={(subItemName: string) => clickSubItem(selectedMainItem(),subItemName)}/>}
        </nav>
    )
}
