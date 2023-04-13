import { Button } from "../buttons/Button";
import styles from "./Rules.module.scss";

const Rules : ({type}: {type: string}) => JSX.Element = ({type}) => {
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
        <Button content="Descargar Reglamento" onClick={() => downloadRules(type == "OMA"?"oma":"nandu")}/>
    </>
    )
}

export default Rules