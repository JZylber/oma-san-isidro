import React, { Dispatch, SetStateAction } from "react";
import { Button } from "../../buttons/Button";

import Modal from "../Modal";

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
      <h2 className="font-montserrat font-bold text-center max-tablet:text-[1.8rem] tablet:max-desktop:text-[2rem] desktop:text-[2.2rem]">
        NUEVA FECHA CERTAMEN NACIONAL OMA
      </h2>
      <p className="font-montserrat font-bold text-center max-tablet:text-[1.5rem] tablet:max-desktop:text-[1.7rem] desktop:text-[1.9rem] mt-[0.8rem]">
        15 al 19 de noviembre 2026
      </p>
      <p className="font-montserrat font-light max-tablet:text-[1.4rem] tablet:max-desktop:text-[1.5rem] desktop:text-[1.7rem] mt-[1.6rem]">
        Informamos que el Certamen Nacional de la Olimpiada Matemática
        Argentina, previsto originalmente del 9 al 13 de noviembre en Córdoba,
        cambiará de fecha.
      </p>
      <p className="font-montserrat font-light max-tablet:text-[1.4rem] tablet:max-desktop:text-[1.5rem] desktop:text-[1.7rem] mt-[1.6rem]">
        La modificación se debe a que, con motivo de la visita del Papa a la
        Argentina, se prevén dificultades en los traslados y en la movilidad,
        que podrían complicar la llegada y el desplazamiento de participantes,
        docentes y acompañantes.
      </p>
      <p className="font-montserrat font-light max-tablet:text-[1.4rem] tablet:max-desktop:text-[1.5rem] desktop:text-[1.7rem] mt-[1.6rem]">
        Por este motivo, el Certamen se realizará finalmente del{" "}
        <strong>domingo 15 al jueves 19 de noviembre</strong>.
      </p>
      <p className="font-montserrat font-light max-tablet:text-[1.4rem] tablet:max-desktop:text-[1.5rem] desktop:text-[1.7rem] mt-[1.6rem]">
        📅 <strong>Nueva fecha:</strong> 15 al 19 de noviembre
        <br />
        📍 La Falda, Córdoba
      </p>
      <p className="font-montserrat font-light max-tablet:text-[1.4rem] tablet:max-desktop:text-[1.5rem] desktop:text-[1.7rem] mt-[1.6rem]">
        Agradecemos la comprensión de todos y esperamos poder encontrarnos en
        Córdoba en esta nueva fecha.
      </p>
      <Button onClick={() => setOpen(false)} content="OK" />
    </Modal>
  );
};

export default HomeModal;
