import React, { Dispatch, SetStateAction } from "react";
import { Button } from "../../buttons/Button";

import styles from "./HomeModal.module.scss";
import Modal from "../Modal";

interface HomeModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const HomeModal = ({ open, setOpen }: HomeModalProps) => {
  return (
    <Modal open={open}>
      <div className={styles.modal_content}>
        <h1>IMPORTANTE</h1>
        <p>
          Estamos al tanto de que hay faltantes en los resultados del regional
          ñandú, especialmente en el nivel 3.
        </p>
        <p>
          A diferencia de las instancias anteriores, la corrección de la
          instancia regional la hace el jurado nacional. Desde la secretaría
          regional ya elevamos el reclamo y actualizaremos en cuanto recibamos
          novedades.
        </p>
        <p>Para reclamos sobre correcciones, ver la página de resultados.</p>
        <p>Agradecemos su paciencia.</p>
        <Button onClick={() => setOpen(false)} content="OK" />
      </div>
    </Modal>
  );
};

export default HomeModal;
