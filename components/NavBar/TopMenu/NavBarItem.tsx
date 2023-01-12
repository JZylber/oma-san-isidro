import { useRouter } from 'next/router';
import styles from './NavBarItem.module.scss'

interface NavBarItemsProps {
    text: string,
    selected: boolean,
    link?: string,
    onClick?: (link?:string) => void,
    phantom? : boolean
  }

const NavBarItem = (props : NavBarItemsProps) => {
    const goToLink = (link?:string) => {
        props.onClick && props.onClick(link);
    }
    return(
    <div className={[styles.item,props.phantom && styles.phantom].join(" ")} onClick={() => goToLink(props.link)}>
        <span>{props.text}</span>
        {props.selected && <div className={styles.selected_bar}></div>}  
    </div>);
}
export default NavBarItem