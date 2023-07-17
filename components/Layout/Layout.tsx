import {createContext, ReactElement, ReactNode, useEffect, useState} from "react";
import Footer from "../Footer/Footer";
import Loader from "../Loader/Loader";
import NavBar from '../NavBar/Navbar';
import styles from './Layout.module.scss';
import { usePathname } from "next/navigation";

interface PageLayoutContext {
    onRouteChange : () => void;
}

export const pageLayoutContext = createContext<PageLayoutContext>({} as PageLayoutContext)

const Layout = ({children}:{children : ReactNode}) => {
    const [showChildren,setShowChildren] = useState(true);
    const [isLoading,setIsLoading] = useState(false);
    const [route,setRoute] = useState("");
    const pathname = usePathname();
    const togglePageContent = () => {
        setShowChildren(!showChildren);
    }
    const changeRoute = () => {
        setIsLoading(true);
    }
    useEffect(() => {
        if(isLoading && route !== pathname){
            setRoute(pathname);
            setIsLoading(false);
        }
    },[isLoading,route,pathname])
    const renderContent = () : ReactElement =>{
        if(showChildren){
            if(isLoading){
                return(<Loader/>)
            } else {
                return(
                <pageLayoutContext.Provider value={{onRouteChange: changeRoute}}>
                    <main className={styles.main}>{children}</main>
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