import {createContext, ReactElement, ReactNode, useState} from "react";
import Footer from "../Footer/Footer";
import Loader from "../Loader/Loader";
import NavBar from '../NavBar/Navbar';
import styles from './Layout.module.scss';

interface PageLayoutContext {
    onRouteChange : () => void;
}

export const pageLayoutContext = createContext<PageLayoutContext>({} as PageLayoutContext)

const Layout = ({grid = false ,children}:{grid? : boolean,children : ReactNode}) => {
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
                return(<Loader/>)
            } else {
                return(
                <pageLayoutContext.Provider value={{onRouteChange: changeRoute}}>
                    <main className={[styles.main,grid?styles.grid:""].join(" ")}>{children}</main>
                    <Footer/>
                </pageLayoutContext.Provider>)
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