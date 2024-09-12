import MapTable, { ParticipantData } from "../Table/table";

const roundTableDimensions = { x: 200, y: 200 };
const squareTableSize = { x: 300, y: 200 };
const individualTableSize = { x: 120, y: 120 };

export interface TableData {
  type: "individual" | "square" | "round";
  participants: ParticipantData[];
}

interface RowProps {
  rowNumber: number;
  startingId: number;
  tables: TableData[];
}

const labelHeight = 100;

export const rowWidth = (tables: TableData[]) => {
  return tables.reduce((acc, table) => {
    if (table.type === "round") {
      return Math.max(roundTableDimensions.x + 50, acc);
    }
    if (table.type === "square") {
      return Math.max(squareTableSize.x + 50, acc);
    }
    if (table.type === "individual") {
      return Math.max(individualTableSize.x + 50, acc);
    }
    return acc;
  }, 0);
};

export const rowHeight = (tables: TableData[]) => {
  return tables.reduce((acc, table) => {
    if (table.type === "round") {
      return roundTableDimensions.y + acc;
    }
    if (table.type === "square") {
      return squareTableSize.y + acc;
    }
    if (table.type === "individual") {
      return individualTableSize.y + acc;
    }
    return acc;
  }, labelHeight);
};

export const rowParticipants = (tables: TableData[]) => {
  return tables.reduce((acc, table) => {
    return acc + table.participants.length;
  }, 0);
};

export const hasSelectedParticipant = (tables: TableData[]) => {
  return tables.some((table) => {
    return table.participants.some((participant) => participant.selected);
  });
};

const Row = ({ startingId, tables, rowNumber }: RowProps) => {
  const isSelected = hasSelectedParticipant(tables);
  const width = rowWidth(tables);
  const height = rowHeight(tables);
  let participantsDisplayed = 0;
  let currentHeight = 0;
  let xPositions = {
    round: width / 2 - roundTableDimensions.x / 2,
    square: width / 2 - squareTableSize.x / 2,
    individual: width / 2 - individualTableSize.x / 2,
  };
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      overflow="visible"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id="pattern"
          width="8"
          height="10"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45 50 50)"
        >
          <line stroke="#D9F5FC" strokeWidth="7px" y2="10" />
        </pattern>
      </defs>
      {isSelected && (
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="url(#pattern)"
          stroke="#D9F5FC"
          strokeWidth="1px"
        />
      )}
      {tables.map((table, index) => {
        participantsDisplayed += table.participants.length;
        let elementHeight = table.type === "round" ? roundTableDimensions.y : 0;
        elementHeight =
          table.type === "square" ? squareTableSize.y : elementHeight;
        elementHeight =
          table.type === "individual" ? individualTableSize.y : elementHeight;
        currentHeight += elementHeight;
        return (
          <svg
            key={index}
            x={xPositions[table.type]}
            y={currentHeight - elementHeight}
            overflow="visible"
            xmlns="http://www.w3.org/2000/svg"
          >
            <MapTable
              type={table.type}
              participants={table.participants}
              startingId={
                startingId + participantsDisplayed - table.participants.length
              }
            />
          </svg>
        );
      })}
      <line
        x1="0"
        y1={height}
        x2="0"
        y2="0"
        stroke="gray"
        strokeWidth={1}
        strokeDasharray="30,30"
      />
      <line
        x1={width}
        y1={height}
        x2={width}
        y2="0"
        stroke="gray"
        strokeWidth={1}
        strokeDasharray="30,30"
      />
      <rect
        x="0"
        y={height - labelHeight + 25}
        width="100%"
        height={labelHeight - 25}
        fill={isSelected ? "#D9F5FC" : "#FEFDF3"}
        stroke="#000000"
        strokeWidth={1}
      />
      <foreignObject
        x="0"
        y={height - labelHeight + 25}
        width="100%"
        height={labelHeight - 25}
      >
        <div className="flex justify-center items-center h-full font-montserrat font-bold text-[48px]">
          <span>{rowNumber}</span>
        </div>
      </foreignObject>
    </svg>
  );
};

export default Row;
