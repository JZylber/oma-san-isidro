import { useRouter } from "next/router"
import { MenuHierarchy } from "../NavBarRouting"
import styles from './SubMenu.module.scss'

type SubMenuProps = {
    items: MenuHierarchy
}


const SubMenu = ({items} : SubMenuProps) => {
    const router = useRouter();
    const goToLink = (link?:string) => {
        link && router.push(link);
    }
    return(
        <ul className={styles.submenu_bar}>
            {items.map((item) => {
                return(
                <li className={[styles.submenu_bar_item,item.selected && styles.submenu_bar_item_selected].join(" ")} onClick={() => goToLink(item.link)}>{item.text}</li>)
            })}
        </ul>
    )
}

export default SubMenu