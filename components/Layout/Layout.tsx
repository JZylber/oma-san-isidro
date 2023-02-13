import {ReactNode, useState} from "react";
import NavBar from '../NavBar/Navbar';
import styles from './Layout.module.scss';

const Layout = ({children}:{children : ReactNode}) => {
    const [showChildren,setShowChildren] = useState(true)
    const [isLoading,setIsLoading] = useState(false)
    const togglePageContent = () => {
        setShowChildren(!showChildren);
    }
    const onRouteChange = () => {
        setShowChildren(false);
        setIsLoading(true);
    }
    return(
        <div className={styles.layout}>
        <NavBar togglePageContent={togglePageContent}/>
        {showChildren && <main className={styles.main}>{children}</main>}
        </div>
    )
}
export default Layout