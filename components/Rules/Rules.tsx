import { Button } from "../buttons/Button";
import Image from "next/image";

const typeClasses = "max-tablet:block max-tablet:font-unbounded max-tablet:font-normal max-tablet:text-[2.1rem] max-tablet:mt-[1.6rem] tablet:hidden";
const titleClasses = "font-unbounded font-semibold max-tablet:text-[3.6rem] max-tablet:mt-[calc(4*100vmin/50)] max-tablet:mb-[calc(2.5*100vmin/50)] tablet:text-[4.8rem] tablet:leading-[2.5]";
const rulesClasses = "[&_li]:font-montserrat [&_li]:font-light max-tablet:[&_li]:text-[1.4rem] tablet:max-desktop:[&_li]:text-[1.5rem] desktop:[&_li]:text-[1.7rem]";
const buttonClasses = "max-tablet:w-full tablet:w-[63.5%]";
const arrowClasses = "desktop:rotate-90 desktop:pt-[5px] desktop:w-[30px] max-desktop:hidden";

const Rules : ({type}: {type: string}) => JSX.Element = ({type}) => {
    const rules = [
        "Está permitido el uso de calculadora.",
        "Toda respuesta debe estar acompañada de los razonamientos y cálculos realizados.",
        type === "OMA"?"Esta permitido el uso de apuntes y libros salvo libros de problemas resueltos (distinto a Ñandú).":"No se pueden llevar apuntes ni libros durante la competencia (distinto a OMA).",
        "No está permitido el uso de dispositivos electrónicos con conexión a internet (celulares, tablets, etc.) durante la competencia.",
    ]
    const downloadRules = (type: string) => {
        const link = document.createElement("a");
        link.href = `/files/reglamento-${type}.pdf`;
        link.target = `_blank`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    return(
    <>
        <div className={typeClasses}>{type == "OMA"?"Oma":"Ñandú"}</div>
        <h1 className={titleClasses}>Reglamento</h1>
        <ul className={rulesClasses}>
            {rules.map((rule:string,idx:number) => {return(<li key={idx}>{rule}</li>)})}
        </ul>
        <div className={buttonClasses}>
            <Button content="Descargar reglamento completo" onClick={() => downloadRules(type == "OMA"?"oma":"nandu")}>
                <Image src="/images/newsArrow.svg" width={34} height={32} alt="" className={arrowClasses}/>
            </Button>
        </div>
    </>
    )
}

export default Rules