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
      <Image
        src="/images/ibero2026.png"
        alt="XLI Olimpiada Iberoamericana Matemática - Argentina 2026"
        height={332}
        width={512}
        className="mx-auto h-auto max-tablet:w-[16rem] tablet:w-[20rem]"
      />
      <p className="font-montserrat font-light max-tablet:text-[1.4rem] tablet:max-desktop:text-[1.5rem] desktop:text-[1.7rem] mt-[1.6rem]">
        Este año la <strong>Olimpiada Iberoamericana de Matemática</strong>{" "}
        estuvo en riesgo de no realizarse.
      </p>
      <p className="font-montserrat font-light max-tablet:text-[1.4rem] tablet:max-desktop:text-[1.5rem] desktop:text-[1.7rem] mt-[1.6rem]">
        En sucesivas ocasiones, varios países desistieron de organizarla. Por
        eso la Argentina, llegado el mes de julio, tomó el compromiso de
        realizarla en el mes de septiembre para evitar una disolución de este
        encuentro tan importante para la comunidad matemática Iberoamericana.
      </p>
      <p className="font-montserrat font-light max-tablet:text-[1.4rem] tablet:max-desktop:text-[1.5rem] desktop:text-[1.7rem] mt-[1.6rem]">
        Queremos invitar a todos los que aprecian a nuestra olimpiada a
        colaborar para que la Ibero 2026 en Argentina sea una realidad.{" "}
        <strong>¡Muchas gracias!</strong>
      </p>
      <p className="font-montserrat font-light max-tablet:text-[1.4rem] tablet:max-desktop:text-[1.5rem] desktop:text-[1.7rem] mt-[1.6rem]">
        Alias desde Argentina: <strong>FOMA.OLIMPIADA</strong> del Banco
        Galicia.
      </p>
      <p className="font-montserrat font-light max-tablet:text-[1.4rem] tablet:max-desktop:text-[1.5rem] desktop:text-[1.7rem] mt-[1.6rem]">
        Desde el exterior, consultar por mail a:{" "}
        <a className="text-blue-600" href="mailto:fomaveronica@gmail.com">
          fomaveronica@gmail.com
        </a>
      </p>
      <Button onClick={() => setOpen(false)} content="OK" />
    </Modal>
  );
};

export default HomeModal;
