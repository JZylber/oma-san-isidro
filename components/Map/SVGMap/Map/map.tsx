import Row, {
  rowHeight,
  rowParticipants,
  rowWidth,
  TableData,
} from "../Row/row";
import { Tooltip } from "react-tooltip";

const InstanceMap = ({ data }: { data: TableData[][] }) => {
  let mapHeight = data.reduce((acc, row) => {
    return Math.max(rowHeight(row), acc);
  }, 0);
  let mapWidth = data.reduce((acc, row) => {
    return rowWidth(row) + acc;
  }, 0);
  let participantsDisplayed = 0;
  let currentWidth = 0;
  let participantId = 0;
  return (
    <>
      <svg
        width={mapWidth}
        height={mapHeight}
        viewBox={`0 0 ${mapWidth} ${mapHeight}`}
        overflow="visible"
        xmlns="http://www.w3.org/2000/svg"
        data-tooltip-id="-10"
      >
        {data.map((row, index) => {
          const rowW = rowWidth(row);
          const rowH = rowHeight(row);
          const x = currentWidth;
          const y = mapHeight - rowH;
          const id = participantsDisplayed;
          currentWidth += rowW;
          participantsDisplayed += rowParticipants(row);
          return (
            <g key={index} transform={`translate(${x},${y})`}>
              <Row startingId={id} tables={row} rowNumber={index + 1} />
            </g>
          );
        })}
      </svg>
      {data.map((row) => {
        return row.map((table) => {
          return table.participants.map((participant) => {
            let id = participantId;
            participantId++;
            return (
              <Tooltip key={id} id={`${id}`} place="right">
                <div className="flex font-montserrat divide-x-2 text-[24px]">
                  <span className="pr-6">{participant.level}</span>
                  <span className="pl-6">{`${participant.school.name}${
                    participant.school.venue
                      ? `- ${participant.school.venue}`
                      : ""
                  }`}</span>
                </div>
              </Tooltip>
            );
          });
        });
      })}
    </>
  );
};

export default InstanceMap;
