import { FilterableObject, School } from "../../hooks/types";
import useFilter from "../../hooks/useFilter";
import SelectResultCategory from "../ResultsPage/SelectResultCategory";
import styles from "./Map.module.scss";
import ParticipantTable from "./Table/Table";

interface MapProps {
   competition: string;
}

export interface MapItem extends FilterableObject {
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
        [{school: new School("Northlands","Olivos"),level:2},{school: new School("Los Molinos"),level:1},{school: new School("Cardenal Pironio"),level:3},{school: new School("Holy Cross"),level:2}]
    ],
    [   
        [{school: new School("Northlands","Olivos"),level:2},{school: new School("San Carlos"),level:1},{school: new School("El Buen Ayre"),level:3}],
        [{school: new School("Cruz del Sur"),level:2}]
    ],
]

const Map = ({competition}:MapProps) => {
    const flattenedData = data.flat(2);
    const [schoolFilter,updateFilter,filtered_schools,options] = useFilter(flattenedData);
    const isSelected = (item:MapItem) => {
        const someSelected = Object.values(schoolFilter).some((value) => value !== undefined);
        return(someSelected && filtered_schools.includes(item))
    }
    return(
        <>
        <form className={styles.form}>
            <SelectResultCategory category="Colegio" value={schoolFilter.school} setValue={(option?: School) => updateFilter({school: option})} options={options.school} input={true}/>
            <SelectResultCategory category="Nivel" value={schoolFilter.level} setValue={(option?: number) => updateFilter({level: option})} options={options.level.sort()} clear={true}/>
        </form>
        <div className={styles.grid}>
            {data.map((column,index) => {
                return(
                    <div className={styles.column}>
                        <div className={styles.columnHeader}>{index+1}</div>
                        {column.map((row) => {
                            return(<ParticipantTable participants={row} isSelected={isSelected}/>)
                        })}
                    </div>
                )
            })
            }
        </div>
        </>
    )};

export default Map;