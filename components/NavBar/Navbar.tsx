'use client'
import styles from "./Navbar.module.scss";
import MenuIcon from "../../public/images/menuIcon.svg";
import X from "../../public/images/x.svg";
import {useEffect, useReducer, useState } from "react";
import MobileMenu from "./MobileMenu/mobile-menu";
import TopMenu from "./TopMenu/TopMenu";
import SubMenu from "./TopMenu/SubMenu";
import {usePathname} from 'next/navigation'

type NavProps = {
    togglePageContent? : () => void,
    onRouteChange: () => void
};

export type menuItem = {
  text: string,
  link?: string,
  selected : boolean
  subItems: Array<menuItem>
}

export type MenuHierarchy = Array<menuItem>;

const defaultMenuHierarchy : MenuHierarchy = [
  {text: "Inicio",link:"/",selected : false,subItems:[]},
  {text: "Oma",link:'/oma',selected : false,subItems:[
      {text: "General",link:'/oma',selected : false,subItems:[]},
      {text: "Inscripción",link:'/oma/inscripcion',selected : false,subItems:[]},
      {text: "Autorización",link:'/oma/autorizacion',selected : false,subItems:[]},
      {text: "Instancias",link:'/oma/instancias',selected : false,subItems:[]},
      {text: "Reglamento",link:'/oma/reglamento',selected : false,subItems:[]},
      {text: "Resultados",link:'/oma/resultados',selected : false,subItems:[]},
      {text: "Problemas",link:'/oma/problemas',selected : false,subItems:[]}
  ]},
  {text: "Ñandú",link:'/nandu',selected : false,subItems:[
      {text: "General",link:'/nandu',selected : false,subItems:[]},
      {text: "Inscripción",link:'/nandu/inscripcion',selected : false,subItems:[]},
      {text: "Autorización",link:'/nandu/autorizacion',selected : false,subItems:[]},
      {text: "Instancias",link:'/nandu/instancias',selected : false,subItems:[]},
      {text: "Reglamento",link:'/nandu/reglamento',selected : false,subItems:[]},
      {text: "Resultados",link:'/nandu/resultados',selected : false,subItems:[]},
      {text: "Problemas",link:'/nandu/problemas',selected : false,subItems:[]}
  ]},
  {text: "Otros",link: undefined,selected:false,subItems:[
    {text: "Internacional",link:"/otros/internacional",selected : false,subItems:[]},
    {text: "Mateclubes",link:"/otros/mateclubes",selected : false,subItems:[]},
    {text: "Geometría",link:"/otros/geometria",selected : false,subItems:[]},
    {text: "Canguro",link:"/otros/canguro",selected : false,subItems:[]},
    {text: "Calendario",link:"/otros/calendario",selected : false,subItems:[]},
    {text: "Libros",link:"/otros/libros",selected : false,subItems:[]},
  ]},
];

interface MenuAction {
  type: string;
  mainItem?: number;
  subItem?: number;
  route?: string;
}

const selectedMainItem = (menuHierarchy: MenuHierarchy) => {
  const item = menuHierarchy.find((element) => element.selected)
  if(item){
      return(item.text)
  }else {
      return("")
  }
}

const getSubitems = (menuHierarchy: MenuHierarchy) => {
  let item = menuHierarchy.find((element) => element.selected);
  if (item) {
    return item.subItems;
  } else {
    return [];
  }
};

const unselectItems = (element: menuItem) => {
    return { ...element, selected: false };
}

const selectItem = (
  element: menuItem,
  index: number, 
  item: number, 
  applyToSelectedSubitems?: (item: menuItem,index: number)=> menuItem, 
  applyToUnselectedSubitems?: (item: menuItem,index: number)=> menuItem) => {
  if (index == item) {
    return { ...element, selected: true, subItems: applyToSelectedSubitems?element.subItems.map(applyToSelectedSubitems):element.subItems };
  } else {
    return { ...element, selected: false, subItems: applyToUnselectedSubitems?element.subItems.map(applyToUnselectedSubitems):element.subItems};
  };
};

const selectMainItem = (
  hierarchy: MenuHierarchy,
  mainCategory: number,
) => {
  return hierarchy.map((element,index) => selectItem(element, index, mainCategory, (item: menuItem,index: number) => selectItem(item,index,element.link?0:-1), (item) => unselectItems(item)));
};

const selectSubItem = (
  hierarchy: MenuHierarchy,
  mainCategory: number,
  subCategory: number,
) => {
  return hierarchy.map((element,index) => selectItem(element, index, mainCategory, (item: menuItem,index: number) => selectItem(item,index,subCategory), (item) => unselectItems(item)));
}

const showCurrentPageSelected = (menuComponents : Array<menuItem>,currentRoute:string) => {
  let mainCategoryIndex = -1;
  let subCategoryIndex = -1;
  menuComponents.forEach((mainCategory,mainIndex) => {
    if(mainCategory.link === currentRoute){
      mainCategoryIndex = mainIndex;
      subCategoryIndex = 0;
    }else {
      mainCategory.subItems.forEach((subCategory,subIndex) => {
        if(subCategory.link === currentRoute){
          mainCategoryIndex = mainIndex;
          subCategoryIndex = subIndex;
        }
      })
    }
  });
  if(subCategoryIndex >= 0){
    return selectSubItem(menuComponents,mainCategoryIndex,subCategoryIndex);
  }else if(mainCategoryIndex >= 0){
    return selectMainItem(menuComponents,mainCategoryIndex);
  }else {
    return menuComponents;
  }
}

const reduce = (menuHierarchy: MenuHierarchy, action: MenuAction) => {
  const mainItem = action.mainItem? action.mainItem : 0;
  const subItem = action.subItem? action.subItem : 0;
  const route = action.route? action.route : "/";
  switch (action.type) {
    case "selectMainItem":
      return selectMainItem(menuHierarchy, mainItem);
    case "currentPage":
      return showCurrentPageSelected(menuHierarchy,route);
    case "selectSubItem":
      return selectSubItem(menuHierarchy, mainItem, subItem);
    default:
      return menuHierarchy;
  }
}


export default function NavBar({togglePageContent,onRouteChange}:NavProps){
    let [openFullMenu,setOpenFullMenu] = useState(false);
    const pathname = usePathname()
    const [menuHierarchy,setMenuHierarchy] = useReducer(reduce,defaultMenuHierarchy);
    useEffect(() => {
      if(pathname){
        setMenuHierarchy({type:"currentPage",route:pathname});
      };
    },[pathname])
    const clickMainItem = (itemName : string) => {
        const itemIndex = menuHierarchy.findIndex((item) => item.text == itemName);
        const item = menuHierarchy[itemIndex]
        if(item){
            if(item.link && item.link !==  pathname){
                onRouteChange()
            }
            item.selected = true;
            setMenuHierarchy({type: "selectMainItem",mainItem: itemIndex})
        }
    }
    const clickSubItem = (mainItemName : string,subItemName: string) => {
        const mainItemIndex = menuHierarchy.findIndex((item) => item.text === mainItemName);
        const item = menuHierarchy[mainItemIndex]
        const subItemIndex = item.subItems.findIndex((subitem) => subitem.text === subItemName)
        const subItem = item.subItems[subItemIndex]
        if(subItem.link && subItem.link !== pathname){
          onRouteChange();
        }
        setMenuHierarchy({type: "selectSubItem",mainItem: mainItemIndex,subItem: subItemIndex})
    } 

    const openCloseMenu = () => {
        setOpenFullMenu(!openFullMenu);
        togglePageContent && togglePageContent();
    }

    const isNotAtHome = () => {
        const homeIndex: number = menuHierarchy.findIndex((item) => item.text === 'Inicio');
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
            {isNotAtHome() && <SubMenu items={getSubitems(menuHierarchy)} onSubItemClick={(subItemName: string) => clickSubItem(selectedMainItem(menuHierarchy),subItemName)}/>}
        </nav>
    )
}
