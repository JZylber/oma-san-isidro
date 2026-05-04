import React, { Dispatch, SetStateAction } from "react";
import { Button } from "../../buttons/Button";

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
      className="border-2 border-black rounded-[9px] p-[2.4rem] m-auto max-tablet:w-[80%] tablet:max-desktop:w-[65%] desktop:w-[50%]"
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
          <h1 className="w-fit font-unbounded font-semibold max-tablet:text-[3.6rem] max-tablet:mt-[calc(100vmin/50)] max-tablet:mb-[calc(2.5*100vmin/50)] tablet:text-[4.8rem]">CONCURSO</h1>
          <h2 className="font-unbounded font-semibold max-tablet:text-[1.5rem] tablet:text-[2.4rem]">
            <em>Un problema para canguro</em>
          </h2>
        </div>
      </div>
      <p className="font-montserrat font-light max-tablet:text-[1.4rem] tablet:max-desktop:text-[1.5rem] desktop:text-[1.7rem] mt-[1.6rem]">
        La Olimpíada de Matemática Argentina invita a docentes (profesores y
        maestros) y a estudiantes de Ciencias Exactas, de Ingeniería y de
        profesorados a proponer problemas para el{" "}
        <strong>concurso internacional Canguro Matemático</strong>.
      </p>
      <p className="font-montserrat font-light max-tablet:text-[1.4rem] tablet:max-desktop:text-[1.5rem] desktop:text-[1.7rem] mt-[1.6rem]">
        <strong>Fecha de presentación de problemas:</strong> 1 de abril al 15 de
        mayo de 2026.
      </p>
      <p className="font-montserrat font-light max-tablet:text-[1.4rem] tablet:max-desktop:text-[1.5rem] desktop:text-[1.7rem] mt-[1.6rem]">
        Para más información ver{" "}
        <a className="text-blue-600" href="oma.org.ar">
          oma.org.ar
        </a>
      </p>
      <Button onClick={() => setOpen(false)} content="OK" />
    </Modal>
  );
};

export default HomeModal;
