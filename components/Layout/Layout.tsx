import {ReactElement, ReactNode,useState} from "react";
import Footer from "../Footer/Footer";
import NavBar from '../NavBar/Navbar';
import styles from './Layout.module.scss';

interface PageLayoutContext {
    setIsLoading : (loading: boolean) => void;
}

const Layout = ({children}:{children : ReactNode}) => {
    const [showChildren,setShowChildren] = useState(true);
    const togglePageContent = () => {
        setShowChildren(!showChildren);
    }
    const renderContent = () : ReactElement =>{
        if(showChildren){ 
            return(
            <>
                <main className={styles.main}>{children}</main>
                <Footer/>
            </>)
        }else {
            return(<></>)
        }
    }
    return(
        <div className={styles.layout}>
            <NavBar togglePageContent={togglePageContent}/>
            {renderContent()}
        </div>
    )
}
export default Layout