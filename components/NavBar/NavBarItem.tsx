import styles from './NavBarItem.module.scss'

interface NavBarItemsProps {
    text: string,
    gridColumnStart: number
  }

const NavBarItem = (props : NavBarItemsProps) => {
    return(
    <div className={styles.item} style={{gridColumnStart: props.gridColumnStart}}>
        <span>{props.text}</span>
    </div>);
}
export default NavBarItem