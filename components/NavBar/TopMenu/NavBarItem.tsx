import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';
import styles from './NavBarItem.module.scss'

interface NavBarItemsProps {
    text: string,
    selected: boolean,
    link?: string,
    onClick?: () => void,
    phantom? : boolean
  }

const ConditionalWrapper = ({ condition, wrapper, children }:{condition: boolean, wrapper: (children: ReactElement) => ReactElement, children: ReactElement}) => 
    condition ? wrapper(children) : children;

const NavBarItem = (props : NavBarItemsProps) => {
    const onClick = () => {
        props.onClick && props.onClick();
    }
    const link = props.link as string
    return(
    <ConditionalWrapper
        condition={props.link != undefined}
        wrapper={(children: ReactElement) => <Link href={link} className={styles.link}>{children}</Link>}>
    <div className={[styles.item,props.phantom && styles.phantom, props.selected && styles.item_selected].join(" ")} onClick={onClick}>
        <span>{props.text}</span>  
    </div>
    </ConditionalWrapper>);
}
export default NavBarItem