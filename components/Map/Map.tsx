import { School } from "../../hooks/types";
import styles from "./Map.module.scss";
import ParticipantTable from "./Table/Table";

interface MapProps {
   competition: string;
}

export interface MapItem {
    school: School;
    level: number;
}

const data : Array<Array<Array<MapItem>>> = [
    [   
        [{school: new School("Mariano Moreno"),level:2}],
        [{school: new School("San Ignacio"),level:2}]
    ],
    [   
        [{school: new School("Pilgrims College","San Isidro"),level:2},{school: new School("Santa Maria de las Lomas"),level:1}],
        [{school: new School("Michael Ham","Vicente López"),level:2},{school: new School("San Lucas","Olivos"),level:1}]
    ],
]

const Map = ({competition}:MapProps) => {
    return(
        <div className={styles.grid}>
            {data.map((column) => {
                return(
                    <div className={styles.column}>
                        {column.map((row) => {
                            return(<ParticipantTable participants={row}/>)
                        })}
                    </div>
                )
            })
            }
        </div>
    )};

export default Map;