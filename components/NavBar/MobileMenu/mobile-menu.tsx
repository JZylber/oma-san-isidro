import MenuArrow from '../../../public/images/menuArrow.svg';
import styles from './mobile-menu.module.scss';
import { useRouter } from 'next/router'
import { ReactElement, useState } from "react";
import { menuItem, showCurrentPageSelected } from '../NavBarRouting';
import Link from 'next/link';



type mobileMenuProps = {
    closeMenu : () => void,
    menuHierarchy : Array<menuItem>
}

const ConditionalWrapper = ({ condition, wrapper, children }:{condition: boolean, wrapper: (children: ReactElement) => ReactElement, children: ReactElement}) => 
    condition ? wrapper(children) : children;

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
                    }
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
                    }
                }
            }
        }
        
    } 

    //Renderizado de cada item del menu
    const renderMenuItem = (item : menuItem) => {
        const link = item.link as string 
        return(
        <div className={styles[["item",(item.selected && item.subItems.length > 0 ?"_selected":"")].join("")]} key={item.text}>
            <ConditionalWrapper
                condition={item.link != undefined}
                wrapper={(children: ReactElement) => <Link href={link} className={styles.link}>{children}</Link>}>
            <div className={styles.main} onClick={() => selectMainItem(item.text)}>
                <span>{item.text}</span>
                <MenuArrow/>
            </div>
            </ConditionalWrapper>
            <ul>
                {item.subItems.map((subitem) => {
                    const sublink = subitem.link as string
                    return(<Link href={sublink} className={styles.link} key={item.text + subitem.text}><li className={`${subitem.selected ? styles.subitem_selected : ""}`}  onClick={() => selectSubItem(item.text,subitem.text)} >{subitem.text}</li></Link>)
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