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
        [{school: new School("San Ignacio"),level:2}],
        [{school: new School("San Gregorio"),level:2}],
        [{school: new School("Marín"),level:2}],
        [{school: new School("San Ignacio"),level:2}],
        [{school: new School("Mariano Moreno"),level:2}],
        [{school: new School("Piaget"),level:2}],
        [{school: new School("San Gregorio"),level:2}],
        [{school: new School("Mariano Moreno"),level:2}],
        [{school: new School("Piaget"),level:2}],
        [{school: new School("El Buen Ayre"),level:2}],
        [{school: new School("Marín"),level:2}],
        [{school: new School("San Gregorio"),level:2}],
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
];

const countParticipantsOfLevel = (participants: MapItem[],level:number) => {
    return(participants.filter((item) => item.level === level).length);
}

const participantsInColumn = (column:MapItem[],selected: MapItem[]) => {
    const selectedInColumn = selected.filter((item) => column.includes(item));
    const participantsPerLevel = [1,2,3].map((level) => countParticipantsOfLevel(selectedInColumn,level));
    return(participantsPerLevel);
};

const Map = ({competition}:MapProps) => {
    const flattenedData = data.flat(2);
    const columns = data.map((column) => column.flat(1));
    const [schoolFilter,updateFilter,filtered_schools,options] = useFilter(flattenedData);
    const participantsPerColumn = columns.map((column,index) => [index + 1,...participantsInColumn(column,filtered_schools)]).filter((column) => column.slice(1).some((value) => value !== 0));
    const someSelected = Object.values(schoolFilter).some((value) => value !== undefined);
    const isSelected = (item:MapItem) => {
        return(someSelected && filtered_schools.includes(item))
    }
    return(
        <>
        <form className={styles.form}>
            <SelectResultCategory category="Colegio" value={schoolFilter.school} setValue={(option?: School) => updateFilter({school: option})} options={options.school} input={true}/>
            <SelectResultCategory category="Nivel" value={schoolFilter.level} setValue={(option?: number) => updateFilter({level: option})} options={options.level.sort()} clear={true}/>
        </form>
        <div className={styles.gridContainer}>
            <div className={styles.grid}>
                {data.map((column,column_index) => {
                    const columnIsSelected = someSelected && participantsPerColumn.some((column) => column[0] === column_index + 1);
                    return(
                        <div key={column_index} className={styles.column}>
                            <div className={[styles.columnHeader,columnIsSelected?styles.selected:""].join(" ")}>{column_index+1}</div>
                            {column.map((row, row_index) => {
                                return(<ParticipantTable key={`${column_index}-${row_index}`} participants={row} isSelected={isSelected}/>)
                            })}
                        </div>
                    )
                })
                }
            </div>
        </div>
        <div className={styles.values}>
            <table className={styles.values_table}>
                <thead>
                    <tr>
                        <th>Fila</th>
                        <th>Nivel 1</th>
                        <th>Nivel 2</th>
                        <th>Nivel 3</th>
                    </tr>
                </thead>
                <tbody>
                    {participantsPerColumn.map((column,column_index) => {
                        return(
                            <tr key={column_index}>
                                {column.map((value,row_index) => {
                                    return(<td className={styles.center_align} key={row_index}>{value}</td>)
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
        </>
    )};

export default Map;