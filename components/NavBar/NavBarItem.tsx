import styles from './NavBarItem.module.scss'

interface NavBarItemsProps {
    text: string,
    phantom? : boolean
  }

const NavBarItem = (props : NavBarItemsProps) => {
    return(
    <div className={styles.item}>
        <span>{props.text}</span>
    </div>);
}
export default NavBarItem