'use client'
import Link from "next/link"
import { Fragment } from "react"
import styles from './SubMenu.module.scss'
import { MenuHierarchy } from "../Navbar"

type SubMenuProps = {
    items: MenuHierarchy
    onSubItemClick: (subItemName: string) => void;
}

const SubMenu = ({items,onSubItemClick} : SubMenuProps) => {
    return(
        <div className={styles.wrapper}>
        <ul className={styles.submenu_bar}>
            {items.map((item,position) => {
                const link = item.link as string
                return(
                <Fragment key={position}>
                <li className={[styles.submenu_bar_item,item.selected && styles.submenu_bar_item_selected].join(" ")} onClick={() => onSubItemClick(item.text)} key={item.text}>
                    <Link href={link} className={styles.link}>{item.text}</Link>
                </li>
                {position < (items.length - 1) && <li><div className={styles.submenu_bar_separator} key={position}></div></li>}
                </Fragment>
                )
            })}
        </ul>
        </div>
    )
}

export default SubMenu