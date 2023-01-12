import { useRouter } from 'next/router';
import styles from './NavBarItem.module.scss'

interface NavBarItemsProps {
    text: string,
    link?: string,
    onClick?: (link?:string) => void,
    phantom? : boolean
  }

const NavBarItem = (props : NavBarItemsProps) => {
    const onClick = (link?:string) => {
        props.onClick && props.onClick(link);
    }
    return(
    <div className={[styles.item,props.phantom && styles.phantom].join(" ")} onClick={() => onClick(props.link)}>
        <span>{props.text}</span>
    </div>);
}
export default NavBarItem