import styles from "./VenueCard.module.scss";
import ExpandArrow from "../../public/images/menuArrow.svg"
import { useState } from "react";
import { CardType } from "../Table/types";
import { Venue, schoolName } from "./Venues";

const VenueCard: CardType<Venue> = ({value}) => {
    const {colegio,nombre, direccion, localidad, aclaracion} = value;
    const [expanded, setExpanded] = useState(false);
    return(
        <div className={styles.container} onClick={() => setExpanded(!expanded)}>
            <div className={styles.info}>
                <p className={styles.name}>{schoolName(colegio)}</p>
                {aclaracion && <p className={styles.subtext}>({aclaracion})</p>}
                <div className={styles.category}>
                        <p className={styles.title}>Rinde en:</p>
                        <p className={styles.value}>{nombre}</p>
                    </div>
                {expanded && <div className={styles.extra_information}>
                    <div className={styles.category}>
                        <p className={styles.title}>Dirección</p>
                        <p className={styles.value}>{direccion}</p>
                    </div>
                    <div className={styles.category}>
                        <p className={styles.title}>Localidad</p>
                        <p className={styles.value}>{localidad}</p>
                    </div>
                </div>}
            </div>
            <ExpandArrow className={[styles.arrow,expanded?styles.rotated:""].join(" ")}/>
        </div>
    )
}

export default VenueCard