import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { FilterableObject, School } from "../../hooks/types";
import useFilter from "../../hooks/useFilter";
import { Competition } from "../../server/app-router-db-calls";
import SelectResultCategory from "../ResultsPage/SelectResultCategory";
import styles from "./Map.module.scss";
import ParticipantTable from "./Table/Table";
import {
  getMapData,
  getParticipants,
  mapItemFromParticipantData,
} from "./MapFromJson";
import InstanceMap from "./SVGMap/Map/map";

interface MapProps {
  competition: Competition;
}

export interface MapItem extends FilterableObject {
  school: School;
  level: number;
}

const countParticipantsOfLevel = (participants: MapItem[], level: number) => {
  return participants.filter((item) => item.level === level).length;
};

const participantsInColumn = (column: MapItem[], selected: MapItem[]) => {
  const selectedInColumn = selected.filter((item) => column.includes(item));
  const participantsPerLevel = [0, 1, 2, 3].map((level) =>
    countParticipantsOfLevel(selectedInColumn, level)
  );
  return participantsPerLevel;
};

const Map = ({ competition }: MapProps) => {
  const data = getMapData("Regional", competition);
  const participants = getParticipants(data);
  const [schoolFilter, updateFilter, filtered_schools, options] =
    useFilter(participants);
  if (participants.length !== filtered_schools.length) {
    data.forEach((row) => {
      row.forEach((table) => {
        table.participants.forEach((participant) => {
          let dataSchool = mapItemFromParticipantData(participant);
          let correctLevel = schoolFilter.level
            ? schoolFilter.level === dataSchool.level
            : true;
          let correctSchool = schoolFilter.school
            ? schoolFilter.school.isFilteredBy(dataSchool.school)
            : true;
          participant.selected = correctSchool && correctLevel;
        });
      });
    });
  } else {
    data.forEach((row) => {
      row.forEach((table) => {
        table.participants.forEach((participant) => {
          participant.selected = false;
        });
      });
    });
  }
  return (
    <>
      <div style={{ margin: "2rem 0rem 2rem 0rem" }}>
        <TransformWrapper initialScale={0.25} minScale={0.2} maxScale={2}>
          <TransformComponent wrapperClass={styles.gridContainer}>
            <InstanceMap data={data} />
          </TransformComponent>
        </TransformWrapper>
      </div>
      <form className={styles.form}>
        <SelectResultCategory
          category="Colegio"
          value={schoolFilter.school}
          setValue={(option?: School) => updateFilter({ school: option })}
          options={options.school}
          input={true}
        />
        <SelectResultCategory
          category="Nivel"
          value={schoolFilter.level}
          setValue={(option?: number) => updateFilter({ level: option })}
          options={options.level.filter((option) => option !== 0).sort()}
          clear={true}
        />
      </form>
      <div className="h-[200px]"></div>
      {/*<div className={styles.values}>
        <table className={styles.values_table}>
          <thead>
            <tr>
              <th style={{ width: "17.5%" }}>Fila</th>
              {!freePlacesSelected ? (
                <>
                  <th style={{ width: "27.5%" }}>Nivel 1</th>
                  <th style={{ width: "27.5%" }}>Nivel 2</th>
                  <th style={{ width: "27.5%" }}>Nivel 3</th>
                </>
              ) : (
                <th style={{ width: "82.5%" }}>Lugares</th>
              )}
            </tr>
          </thead>
          <tbody>
            {freePlacesSelected ? (
              <>
                {participantsPerColumn.map((column, column_index) => {
                  return (
                    <tr key={column_index}>
                      {column.slice(0, 2).map((value, row_index) => {
                        return (
                          <td
                            className={[
                              styles.center_align,
                              row_index === 0 ? styles.row : "",
                            ].join(" ")}
                            key={row_index}
                          >
                            {value !== 0 ? value : ""}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </>
            ) : (
              <>
                {participantsPerColumn.map((column, column_index) => {
                  return (
                    <tr key={column_index}>
                      {[column[0]]
                        .concat(column.slice(2))
                        .map((value, row_index) => {
                          return (
                            <td
                              className={[
                                styles.center_align,
                                row_index === 0 ? styles.row : "",
                              ].join(" ")}
                              key={row_index}
                            >
                              {value !== 0 ? value : ""}
                            </td>
                          );
                        })}
                    </tr>
                  );
                })}
              </>
            )}
          </tbody>
        </table>
      </div>*/}
    </>
  );
};

export default Map;
