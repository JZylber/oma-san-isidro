import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import ReactDOM from "react-dom";
import { Button } from '../buttons/Button';

import styles from './HomeModal.module.scss';

interface HomeModalProps {
  open : boolean,
  setOpen : Dispatch<SetStateAction<boolean>>,
}

const HomeModal = ({open,setOpen}:HomeModalProps) => {
    const [isBrowser, setIsBrowser] = useState(false);
  
    useEffect(() => {
      setIsBrowser(true);
    }, []);

    const ModalComponent = open ?
      <div className={styles.modal_overlay}>
        <div className={styles.modal_content}>
          <h1>¡Bienvenidos!</h1>
          <p>Esta es la nueva página de OMA San Isidro. La estamos desarrollando un grupo de voluntarios, y esta es una primera versión. Es por esto que por el momento la página se encuentra bastante incompleta.</p>
          <p>La vamos a estar actualizando lo más rápido posible, y con lo necesario para todas las etapas de OMA/Ñandú. Pedimos paciencia con lo faltante y con los cambios que se hagan.</p>
          <p>Es posible (probable) que la página tenga errores o algunas cosas sean confusas. Somos voluntarios, y por eso cualquier error/problema/feedback nos encantaría que nos manden un mail a: <a href='mailto:omasanisidro.devs@gmail.com'>omasanisidro.devs@gmail.com</a>. ¡OMA San Isidro la hacemos entre todos!</p>
          <span className={styles.modal_content_signature}>Equipo de desarrollo OMA San Isidro</span>
          <Button onClick={() => setOpen(false)} content="Continuar a la página"/>
        </div>
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

export default HomeModal