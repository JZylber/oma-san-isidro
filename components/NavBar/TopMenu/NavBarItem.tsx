import { useRouter } from 'next/router';
import styles from './NavBarItem.module.scss'

interface NavBarItemsProps {
    text: string,
    selected: boolean,
    link?: string,
    onClick?: (link?:string) => void,
    onMouseEnter?: () => void,
    onMouseLeave?: () => void,
    phantom? : boolean
  }

const NavBarItem = (props : NavBarItemsProps) => {
    const goToLink = (link?:string) => {
        props.onClick && props.onClick(link);
    }
    return(
    <div className={[styles.item,props.phantom && styles.phantom, props.selected && styles.item_selected].join(" ")} onClick={() => goToLink(props.link)} onMouseEnter={props.onMouseEnter} onMouseLeave={props.onMouseLeave}>
        <span>{props.text}</span>  
    </div>);
}
export default NavBarItem