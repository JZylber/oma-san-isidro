import {
  TransformWrapper,
  TransformComponent,
  useControls,
} from "react-zoom-pan-pinch";
import { FilterObject, School } from "../../hooks/types";
import useFilter from "../../hooks/useFilter";
import { Competition } from "../../server/app-router-db-calls";
import SelectResultCategory from "../ResultsPage/SelectResultCategory";
import styles from "./Map.module.scss";
import {
  getMapData,
  getParticipants,
  mapItemFromParticipantData,
  participantIsSelected,
  participantsOfLevelInTable,
} from "./MapAux";
import InstanceMap from "./SVGMap/Map/map";
import Image from "next/image";
import React, { MouseEventHandler } from "react";

interface MapProps {
  competition: Competition;
}

export interface MapItem extends FilterObject {
  school: School;
  level: number;
}

const Map = ({ competition }: MapProps) => {
  const data = getMapData("Regional", competition);
  const participants = getParticipants(data);
  const [schoolFilter, updateFilter, filtered_schools, options] =
    useFilter(participants);
  if (participants.length !== filtered_schools.length) {
    data.forEach((row) => {
      row.forEach((table) => {
        table.participants.forEach((participant) => {
          participant.selected = participantIsSelected(
            participant,
            schoolFilter
          );
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
  const clickMap: MouseEventHandler<SVGSVGElement> = (event) => {
    let participant: SVGAElement | HTMLElement = event.target as SVGAElement;

    while (participant !== null && !participant.dataset.tooltipId) {
      participant = participant.parentElement as HTMLElement;
    }
    if (!participant) return;
    else {
      participant = participant as SVGAElement;
      let id = parseInt(participant.dataset.tooltipId as string);
      let currentId = 0;
      data.forEach((row) => {
        row.forEach((table) => {
          table.participants.forEach((participant) => {
            if (currentId === id) {
              let mapItem = mapItemFromParticipantData(participant);
              updateFilter({ school: mapItem.school });
            }
            currentId++;
          });
        });
      });
    }
  };
  const Controls = () => {
    const { zoomIn, zoomOut, resetTransform } = useControls();
    return (
      <div className="flex absolute right-2 bottom-2 z-10 gap-x-4">
        <div
          className="size-20 flex justify-center items-center border-black border-2 rounded-[9px] cursor-pointer bg-primary-light-blue"
          onClick={() => zoomIn()}
        >
          <Image src="/images/plus.svg" alt="zoom in" width={30} height={30} />
        </div>
        <div
          className="size-20 flex justify-center items-center border-black border-2 rounded-[9px] cursor-pointer bg-primary-light-blue"
          onClick={() => zoomOut()}
        >
          <Image
            src="/images/minus.svg"
            alt="zoom out"
            width={30}
            height={30}
          />
        </div>
        <div
          className="size-20 flex justify-center items-center border-black border-2 rounded-[9px] cursor-pointer bg-primary-light-blue"
          onClick={() => resetTransform()}
        >
          <Image
            src="/images/reset_map.svg"
            alt="reset"
            width={30}
            height={30}
          />
        </div>
      </div>
    );
  };
  return (
    <>
      <div
        style={{ margin: "2rem 0rem 2rem 0rem" }}
        className={styles.gridContainer}
      >
        <TransformWrapper
          initialScale={0.3}
          initialPositionX={0}
          initialPositionY={0}
          minScale={0.2}
          maxScale={2}
          smooth
        >
          <Controls />
          {(schoolFilter.school || schoolFilter.level) && (
            <div className="absolute top-2 left-2 z-10 px-4 py-2 border-black border-2 rounded-[9px] w-fit flex flex-col bg-primary-white font-montserrat text-[16px] divide-y-2 divide-primary-light-blue">
              {schoolFilter.school && (
                <div className="flex justify-between py-2">
                  <p>
                    <span className="font-bold">Colegio:</span>{" "}
                    {schoolFilter.school.toString()}
                  </p>
                  <Image
                    src="/images/x.svg"
                    alt="clean school filter"
                    width={20}
                    height={20}
                    onClick={() => updateFilter({ school: undefined })}
                    className="pl-4 cursor-pointer"
                  />
                </div>
              )}
              {schoolFilter.level && (
                <div className="flex justify-between py-2">
                  <p>
                    <span className="font-bold">Nivel:</span>{" "}
                    {schoolFilter.level}
                  </p>
                  <Image
                    src="/images/x.svg"
                    alt="clean level filter"
                    width={20}
                    height={20}
                    onClick={() => updateFilter({ level: undefined })}
                    className="pl-4 cursor-pointer"
                  />
                </div>
              )}
            </div>
          )}
          <TransformComponent wrapperClass="max-h-[75vh] max-w-full">
            <InstanceMap data={data} onClick={clickMap} />
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
      <div className={styles.values}>
        <table className={styles.values_table}>
          <thead>
            <tr>
              <th style={{ width: "17.5%" }}>Fila</th>
              <th style={{ width: "27.5%" }}>Nivel 1</th>
              <th style={{ width: "27.5%" }}>Nivel 2</th>
              <th style={{ width: "27.5%" }}>Nivel 3</th>
            </tr>
          </thead>
          <tbody>
            {data.map((column, column_index) => {
              if (
                column.some((table) =>
                  [1, 2, 3].some(
                    (level) =>
                      participantsOfLevelInTable(table, schoolFilter, level) !==
                      0
                  )
                )
              ) {
                return (
                  <tr key={column_index}>
                    <td className={[styles.center_align, styles.row].join(" ")}>
                      {column_index + 1}
                    </td>
                    {[1, 2, 3].map((level, row_index) => {
                      let value = column.reduce((acc, table) => {
                        acc =
                          acc +
                          participantsOfLevelInTable(
                            table,
                            schoolFilter,
                            level
                          );
                        return acc;
                      }, 0);
                      return (
                        <td className={styles.center_align} key={row_index}>
                          {value !== 0 ? value : ""}
                        </td>
                      );
                    })}
                  </tr>
                );
              } else {
                return null;
              }
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Map;
