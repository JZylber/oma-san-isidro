import { useRouter } from "next/router";
import {ReactNode, useState} from "react";
import Footer from "../Footer/Footer";
import NavBar from '../NavBar/Navbar';
import styles from './Layout.module.scss';

const Layout = ({children}:{children : ReactNode}) => {
    const [showChildren,setShowChildren] = useState(true)
    const [isLoading,setIsLoading] = useState(false)
    const togglePageContent = () => {
        setShowChildren(!showChildren);
    }
    const changeRoute = () => {
        setShowChildren(false);
        setIsLoading(true);
    }
    return(
        <div className={styles.layout}>
        <NavBar togglePageContent={togglePageContent} onRouteChange={changeRoute}/>
        {showChildren && <main className={styles.main}>{children}</main>}
        {isLoading ? <span>Cargando...</span> :  <Footer/>}
        </div>
    )
}
export default Layout