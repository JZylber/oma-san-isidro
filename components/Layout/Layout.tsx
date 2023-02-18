import { useRouter } from "next/router";
import {ReactElement, ReactNode, useState} from "react";
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
        setIsLoading(true);
    }
    const renderContent = () : ReactElement =>{
        if(showChildren){
            if(isLoading){
                return(<span>Cargando...</span>)
            } else {
                return(
                <>
                <main className={styles.main}>{children}</main>
                <Footer/>
                </>)
            } 
        }else {
            return(<></>)
        }
    }
    return(
        <div className={styles.layout}>
        <NavBar togglePageContent={togglePageContent} onRouteChange={changeRoute}/>
        {renderContent()}
        </div>
    )
}
export default Layout