import { useRouter } from "next/router"
import { Fragment } from "react"
import { MenuHierarchy } from "../NavBarRouting"
import styles from './SubMenu.module.scss'

type SubMenuProps = {
    items: MenuHierarchy
    onSubItemClick: (subItemName: string) => void;
}


const SubMenu = ({items,onSubItemClick} : SubMenuProps) => {
    const router = useRouter();
    return(
        <div className={styles.wrapper}>
        <ul className={styles.submenu_bar}>
            {items.map((item,position) => {
                return(
                <Fragment key={position}>
                <li className={[styles.submenu_bar_item,item.selected && styles.submenu_bar_item_selected].join(" ")} onClick={() => onSubItemClick(item.text)} key={item.text}>{item.text}</li>
                {position < (items.length - 1) && <div className={styles.submenu_bar_separator} key={position}></div>}
                </Fragment>
                )
            })}
        </ul>
        </div>
    )
}

export default SubMenu