import styles from "./Venue.module.scss";
import ExpandArrow from "../../../public/images/menuArrow.svg"
import { useState } from "react";
import { Venue } from "../Venues";
import { School } from "../../ResultsPage/resultsTypes";

const schoolName = (school: School) => {
    return(school.nombre + (school.sede?`-${school.sede}`:""))
}

const VenueCard = ({venue}:{venue: Venue}) => {
    const {colegio,nombre, direccion, localidad, aclaracion} = venue;
    const nombreColegio = schoolName(colegio);
    const [expanded, setExpanded] = useState(false);
    return(
        <div className={styles.container} onClick={() => setExpanded(!expanded)}>
            <div className={styles.info}>
                <p className={styles.name}>{nombreColegio}</p>
                {aclaracion && <p className={styles.aclaracion}>({aclaracion})</p>}
                
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