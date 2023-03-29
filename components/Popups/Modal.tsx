import React, {ReactNode, useEffect, useState } from 'react';
import ReactDOM from "react-dom";
import styles from './Modal.module.scss';

interface ModalProps {
    open : boolean,
    children : ReactNode,
  }
  
const Modal = ({open,children}:ModalProps) => {
      const [isBrowser, setIsBrowser] = useState(false);
    
      useEffect(() => {
        setIsBrowser(true);
      }, []);
  
      const ModalComponent = open ?
        <div className={styles.modal_overlay}>
          {children}
        </div> : null;
  
      if (isBrowser) {
        return ReactDOM.createPortal(
            ModalComponent,
            document.getElementById("modal-root") as HTMLElement
        );
      } else {
        return null;
      }
  };
  
  export default Modal