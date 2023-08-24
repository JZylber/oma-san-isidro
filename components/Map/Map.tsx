import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { FilterableObject, School } from "../../hooks/types";
import useFilter from "../../hooks/useFilter";
import { Competition } from "../../server/app-router-db-calls";
import SelectResultCategory from "../ResultsPage/SelectResultCategory";
import styles from "./Map.module.scss";
import MapData from "./MapFromJson";
import ParticipantTable from "./Table/Table";
import { relative } from "path";

interface MapProps {
   competition: Competition;
}

export interface MapItem extends FilterableObject {
    school: School;
    level: number;
}


const countParticipantsOfLevel = (participants: MapItem[],level:number) => {
    return(participants.filter((item) => item.level === level).length);
}

const participantsInColumn = (column:MapItem[],selected: MapItem[]) => {
    const selectedInColumn = selected.filter((item) => column.includes(item));
    const participantsPerLevel = [0,1,2,3].map((level) => countParticipantsOfLevel(selectedInColumn,level));
    return(participantsPerLevel);
};

const Map = ({competition}:MapProps) => {
    const data = MapData("Regional",competition);
    const flattenedData = data.flat(2);
    const columns = data.map((column) => column.flat(1));
    const [schoolFilter,updateFilter,filtered_schools,options] = useFilter(flattenedData);
    const participantsPerColumn = columns.map((column,index) => [index + 1,...participantsInColumn(column,filtered_schools)]).filter((column) => column.slice(1).some((value) => value !== 0));
    const someSelected = Object.values(schoolFilter).some((value) => value !== undefined);
    const isSelected = (item:MapItem) => {
        return(someSelected && filtered_schools.includes(item))
    }
    const freePlacesSelected = schoolFilter.school?.name === "LIBRE";
    return(
        <>
        <TransformWrapper
            initialScale={0.75}
            minScale={0.2}
            maxScale={2}
        >
            <TransformComponent wrapperClass={styles.gridContainer}>
            <div className={styles.grid}>
                {data.map((column,column_index) => {
                    const columnIsSelected = someSelected && participantsPerColumn.some((column) => column[0] === column_index + 1);
                    return(
                        <div key={column_index} className={[styles.column,columnIsSelected?styles.selected:""].join(" ")}>
                            <div className={styles.columnHeader}>
                                <div>{column_index+1}</div>
                            </div>
                            {column.map((row, row_index) => {
                                return(<ParticipantTable key={`${column_index}-${row_index}`} participants={row} isSelected={isSelected}/>)
                            })}
                        </div>
                    )
                })
                }
            </div>
            </TransformComponent>
        </TransformWrapper>
        <form className={styles.form}>
            <SelectResultCategory category="Colegio" value={schoolFilter.school} setValue={(option?: School) => updateFilter({school: option})} options={options.school} input={true}/>
            <SelectResultCategory category="Nivel" value={schoolFilter.level} setValue={(option?: number) => updateFilter({level: option})} options={options.level.filter((option) => option!==0).sort()} clear={true}/>
        </form>
        <div className={styles.values}>
            <table className={styles.values_table}>
                <thead>
                    <tr>
                        <th style={{width: "17.5%"}}>Fila</th>
                        {!freePlacesSelected ?
                        <> 
                        <th style={{width: "27.5%"}}>Nivel 1</th>
                        <th style={{width: "27.5%"}}>Nivel 2</th>
                        <th style={{width: "27.5%"}}>Nivel 3</th>
                        </>:
                        <th style={{width: "82.5%"}}>Lugares</th>
                        }
                    </tr>
                </thead>
                <tbody>
                    {freePlacesSelected?
                    <>{participantsPerColumn.map((column,column_index) => {
                        return(
                            <tr key={column_index}>
                                {column.slice(0,2).map((value,row_index) => {
                                    return(<td className={[styles.center_align,row_index === 0?styles.row:""].join(" ")} key={row_index}>{value !== 0?value:""}</td>)
                                })}
                            </tr>
                        )
                    })}</>
                    :<>{participantsPerColumn.map((column,column_index) => {
                        return(
                            <tr key={column_index}>
                                {[column[0]].concat(column.slice(2)).map((value,row_index) => {
                                    return(<td className={[styles.center_align,row_index === 0?styles.row:""].join(" ")} key={row_index}>{value !== 0?value:""}</td>)
                                })}
                            </tr>
                        )
                    })}</>
                    }
                </tbody>
            </table>
        </div>
        </>
    )};

export default Map;