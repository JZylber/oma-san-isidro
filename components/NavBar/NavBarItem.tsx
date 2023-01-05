import styles from './NavBarItem.module.scss'

interface NavBarItemsProps {
    text: string,
    phantom? : boolean
  }

const NavBarItem = (props : NavBarItemsProps) => {
    return(
    <div className={[styles.item,props.phantom && styles.phantom].join(" ")}>
        <span>{props.text}</span>
    </div>);
}
export default NavBarItem