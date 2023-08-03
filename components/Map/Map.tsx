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
    [   
        [{school: new School("Participación Individual"),level:3}],
        [{school: new School("San Gregorio"),level:3}]
    ],
    [   
        [{school: new School("Michael Ham","Nordelta"),level:2}],
        [{school: new School("Northlands","Olivos"),level:2},{school: new School("San Carlos"),level:1},{school: new School("El Buen Ayre"),level:3}]
    ],
    [   
        [{school: new School("Los Molinos"),level:2},{school: new School("La Asunción de la Virgen"),level:1},{school: new School("Newman"),level:3}],
        [{school: new School("Northlands","Olivos"),level:2},{school: new School("Los Molinos"),level:1},{school: new School("Cardenal Pironio"),level:3},{school: new School("Holy Cross","Mujeres"),level:2}]
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