import React, { Dispatch, SetStateAction } from "react";
import { Button } from "../../buttons/Button";

import styles from "./HomeModal.module.scss";
import Modal from "../Modal";
import Image from "next/image";

interface HomeModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const HomeModal = ({ open, setOpen }: HomeModalProps) => {
  return (
    <Modal
      openModal={open}
      closeModal={() => setOpen(false)}
      className={styles.modal_content}
    >
      <div className="flex items-center gap-x-4">
        <Image
          src="/images/warning.svg"
          alt="Warning icon"
          height={96}
          width={96}
          className="shrink-0 hidden lg:block"
        />
        <div className="flex flex-col">
          <h1 className="w-fit">CONCURSO</h1>
          <h2>
            <em>Un problema para canguro</em>
          </h2>
        </div>
      </div>
      <p>
        La Olimpíada de Matemática Argentina invita a docentes (profesores y
        maestros) y a estudiantes de Ciencias Exactas, de Ingeniería y de
        profesorados a proponer problemas para el{" "}
        <strong>concurso internacional Canguro Matemático</strong>.
      </p>
      <p>
        <strong>Fecha de presentación de problemas:</strong> 1 de abril al 15 de
        mayo de 2026.
      </p>
      <p>
        Para más información ver <a href="oma.org.ar">oma.org.ar</a>
      </p>
      <Button onClick={() => setOpen(false)} content="OK" />
    </Modal>
  );
};

export default HomeModal;
