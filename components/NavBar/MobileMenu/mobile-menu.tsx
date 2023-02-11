import MenuArrow from '../../../img/menuArrow.svg';
import styles from './mobile-menu.module.scss';
import { useRouter } from 'next/router'
import { useState } from "react";
import { menuItem, showCurrentPageSelected } from '../NavBarRouting';



type mobileMenuProps = {
    closeMenu : () => void,
    menuHierarchy : Array<menuItem>
}

const MobileMenu= ({closeMenu,menuHierarchy} : mobileMenuProps) => {

    const router = useRouter();
    
    const [hierarchy,setHierarchy] = useState(menuHierarchy);

    //Rutina para ir al link de un item correspondiente o abrir/cerrar su submenu
    const selectMainItem = (name : string) => {
        let currentRoute = router.pathname;
        let newHierarchy : Array<menuItem> = hierarchy.map((item) => {
            if (item.text == name){
                if(item.link != null){
                    if(item.link == currentRoute){
                        closeMenu();
                    }else{
                        router.push(item.link);}
                }
                let newItem : menuItem = item;
                newItem.selected = !newItem.selected;
                return(newItem);
            } else {
                let newItem : menuItem = item;
                newItem.selected = false;
                return(newItem);
            }
        })
        setHierarchy(newHierarchy);
    }
    //Rutina para ir al link de un subitem correspondiente
    const selectSubItem = (mainItem: string, subItem: string) => {
        let currentRoute = router.pathname;
        let item : menuItem | undefined = hierarchy.find((menuItem) => menuItem.text == mainItem);
        if(item){
            let selectedSubitem : menuItem | undefined = item.subItems.find((menuSubItem) => menuSubItem.text == subItem)
            if(selectedSubitem){
                if(selectedSubitem.link){
                    if(selectedSubitem.link == currentRoute){
                        closeMenu();
                    }else{
                        router.push(selectedSubitem.link);
                    }
                }
            }
        }
        
    } 

    //Renderizado de cada item del menu
    const renderMenuItem = (item : menuItem) => {
        return(
        <div className={styles[["item",(item.selected && item.subItems.length > 0 ?"_selected":"")].join("")]}>
            <div className={styles.main} onClick={() => selectMainItem(item.text)}>
                <span>{item.text}</span>
                <MenuArrow/>
            </div>
            <ul>
                {item.subItems.map((subitem) => {
                    return(<li className={`${subitem.selected ? styles.subitem_selected : ""}`}  onClick={() => selectSubItem(item.text,subitem.text)} key={item.text + subitem.text}>{subitem.text}</li>)
                })}
            </ul>
        </div>
        
        )
    }

    return (
    <main className={styles.menu}>
        <div className={styles.top}>
            <h1>oma</h1>
            <h2>San Isidro</h2>
        </div>
        <div className={styles.items}>
            {hierarchy.map((mainItem) => {return(
                renderMenuItem(mainItem)
            )})}
        </div>
    </main>)
}

export default MobileMenu