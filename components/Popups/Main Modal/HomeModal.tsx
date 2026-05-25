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
        <h1 className="w-fit">UN PROBLEMA PARA CANGURO</h1>
      </div>
      <p>
        Ya está abierto el concurso <strong>UN PROBLEMA PARA CANGURO</strong>{" "}
        destinado a docentes (profesores y maestros) y a estudiantes de Ciencias
        Exactas, de Ingeniería y de Profesorados.
      </p>
      <p>
        La invitación es a proponer problemas para el{" "}
        <strong>Concurso Internacional Canguro Matemático</strong>.
      </p>
      <p>
        En el siguiente formulario pueden presentar los problemas:{" "}
        <a
          className="text-blue-600"
          href="https://forms.gle/xaSDSdbdm6DhzFEA9"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://forms.gle/xaSDSdbdm6DhzFEA9
        </a>
      </p>
      <p>Hay tiempo hasta el <strong>15 de junio</strong>.</p>
      <p>
        <a
          className="text-blue-600"
          href="https://oma.org.ar/contents/paginas/un_problema_canguro.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          Bases del concurso
        </a>
      </p>
      <Button onClick={() => setOpen(false)} content="OK" />
    </Modal>
  );
};

export default HomeModal;
