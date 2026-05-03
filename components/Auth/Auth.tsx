import NewsArrow from "../../public/images/newsArrow.svg";
import { AuthItem } from "./AuthItem";
import { Button } from "../buttons/Button";
import Link from "next/link";
import Image from "next/image";

export const Authorization = ({ type }: { type: string }) => {
  const specs = [
    {
      important: "Este año, solo se requiere una autorización para las 3 fechas locales.",
      text: <>Se entregan antes de la primera instancia en los lugares determinados en <Link href={type == "oma" ? "/oma/instancias" : "/nandu/instancias"}>instancias<div className="relative inline-block ml-[0.4rem] max-desktop:w-[17px] max-desktop:h-[17px] desktop:w-[20px] desktop:h-[20px]"><Image src="/images/pageLinkIcon.svg" fill={true} alt="" /></div></Link>.</>,
    },
    {
      important: "Solo autorizaciones oficiales de OMA",
      text: "serán aceptadas. Deben estar completas y con la firma ORIGINAL. Tampoco se aceptarán autorizaciones enviadas por fax o fotocopia",
    },
    {
      important: "No podrá rendir la prueba",
      text: "el alumno que no presente dicha autorizaciones firmada por el padre, madre, tutor o encargado y con la firma y sello del colegio.",
    },
    {
      important: "No se aceptarán autorizaciones con fechas corregidas,",
      text: "por lo tanto deberán presentar la actualizada que puedan bajar aquí.",
    },
  ];

  const handleClick = () => {
    const link = document.createElement("a");
    link.href = `/files/autorizacion-${type}.pdf`;
    link.target = `_blank`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <div className="max-tablet:block max-tablet:font-unbounded max-tablet:font-normal max-tablet:text-[2.1rem] tablet:hidden">
        {type == "oma" ? "Oma" : "Ñandú"}
      </div>
      <h1 className="font-unbounded font-semibold max-tablet:text-[3.6rem] max-tablet:mt-[calc(4*var(--mobile-spacing))] max-tablet:mb-[calc(2.5*var(--mobile-spacing))] tablet:text-[4.8rem] tablet:leading-[2.5]">
        Autorización
      </h1>
      <div className="box-border font-unbounded font-medium border-2 border-black rounded-[9px] max-tablet:px-[16px] max-tablet:pt-[38px] max-tablet:pb-[34px]">
        <div className="flex tablet:mt-[20px] tablet:ml-[20px] desktop:ml-[calc(4*var(--desktop-x-spacing))] desktop:mt-[calc(2*var(--desktop-spacing))]">
          <h2 className="max-tablet:text-[1.82rem] max-tablet:w-full max-tablet:mb-[16px] max-tablet:after:content-[':'] tablet:self-center tablet:text-[2.2rem] desktop:text-[3.4rem]">
            Tener en cuenta
          </h2>
          <Image src="/images/warning.svg" width={71} height={71} alt="" className="max-tablet:hidden" />
        </div>
        <ul className="max-tablet:p-0 max-tablet:ml-[16px] tablet:box-border tablet:flex tablet:flex-wrap tablet:justify-evenly tablet:px-0 tablet:pt-[10px] tablet:pb-[30px] tablet:leading-[1.3] desktop:justify-around desktop:p-[40px]">
          {specs.map((spec, i) => (
            <AuthItem key={i} {...spec} />
          ))}
        </ul>
      </div>
      <div className="max-tablet:w-full max-tablet:text-center tablet:w-[63.5%] tablet:mt-[calc(2*var(--tablet-spacing))] desktop:w-[47.5%] desktop:mt-[calc(4*var(--desktop-spacing))]">
        <Button content="Descargar autorización" onClick={handleClick}>
          <NewsArrow className="max-desktop:hidden desktop:inline desktop:rotate-90 desktop:pt-[5px] desktop:w-[30px]" />
        </Button>
        <p className="font-montserrat font-normal text-[1.2rem] tablet:mt-[calc(2*var(--tablet-spacing))]">
          Al presionar este botón, un PDF con la autorización correspondiente
          debería descargarse automáticamente, si esto no ocurre inténtelo
          nuevamente luego de unos segundos.
        </p>
      </div>
    </>
  );
};
