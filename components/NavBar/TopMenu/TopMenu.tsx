import { useRouter } from 'next/router';
import { useState } from 'react';
import { MenuHierarchy, menuItem, showCurrentPageSelected } from '../NavBarRouting';
import NavBarItem from './NavBarItem';
import styles from './TopMenu.module.scss';

type topMenuProps = {
    menuHierarchy : MenuHierarchy,
    onClick : (itemName: string) => void
}

const TopMenu = ({menuHierarchy,onClick} : topMenuProps) => {
    const router = useRouter();
    const [hovered,setHovered] = useState<number>() 

    //Renderizado de cada item del menu
    const renderMenuItem = (item: menuItem,position:number) => {
        return(
            <>
            {position == 1 && <NavBarItem text={""} phantom={true} selected={false}/>}
            <NavBarItem text={item.text} link={item.link} selected={item.selected || position == hovered} onClick={() => onClick(item.text)}/>
            </>
        )
    }

    return(
       <>
       {menuHierarchy.map(renderMenuItem)}
       </>
    )
}

export default TopMenu