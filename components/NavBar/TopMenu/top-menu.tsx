import { useRouter } from 'next/router';
import { useState } from 'react';
import { MenuHierarchy, menuItem, showCurrentPageSelected } from '../NavBarRouting';
import NavBarItem from './NavBarItem';
import styles from './top-menu.module.scss';

type topMenuProps = {
    menuHierarchy : MenuHierarchy
}

const TopMenu = ({menuHierarchy} : topMenuProps) => {
    const router = useRouter();

    const [hierarchy,setHierarchy] = useState(showCurrentPageSelected(menuHierarchy,router.pathname))

    //Rutina para ir al link de un item correspondiente o abrir/cerrar su submenu
    const selectMainItem = (name : string) => {
        let newHierarchy : Array<menuItem> = hierarchy.map((item) => {
            if (item.text == name){
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
    const clickItem = (path?:string) => {
        path && router.push(path);
    }

    //Renderizado de cada item del menu
    const renderMenuItem = (item: menuItem,position:number) => {
        return(
            <>
            {position == 1 && <NavBarItem text={""} phantom={true}/>}
            <NavBarItem text={item.text} onClick={clickItem}/>
            </>
        )
    }

    return(
       <>{hierarchy.map(renderMenuItem)}</>
    )
}

export default TopMenu