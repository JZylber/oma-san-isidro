import { Button } from "../buttons/Button";
import styles from "./Rules.module.scss";
import Arrow from "../../public/images/newsArrow.svg"



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
        <div className={styles.type}>{type == "OMA"?"Oma":"Ñandú"}</div>
        <h1 className={styles.title}>Reglamento</h1>
        <ul className={styles.rules}>
            {rules.map((rule:string,idx:number) => {return(<li key={idx}>{rule}</li>)})}
        </ul>
        <div className={styles.button}>
            <Button content="Descargar reglamento completo" onClick={() => downloadRules(type == "OMA"?"oma":"nandu")}>
                <Arrow className={styles.arrow}/>
            </Button>
        </div>
    </>
    )
}

export default Rules