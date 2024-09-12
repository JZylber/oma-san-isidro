import Row, {
  rowHeight,
  rowParticipants,
  rowWidth,
  TableData,
} from "../Row/row";

const InstanceMap = ({ data }: { data: TableData[][] }) => {
  let mapHeight = data.reduce((acc, row) => {
    return Math.max(rowHeight(row), acc);
  }, 0);
  let mapWidth = data.reduce((acc, row) => {
    return rowWidth(row) + acc;
  }, 0);
  let participantsDisplayed = 0;
  let currentWidth = mapWidth;
  return (
    <svg
      width={mapWidth}
      height={mapHeight}
      viewBox={`0 0 ${mapWidth} ${mapHeight}`}
      overflow="visible"
    >
      {data.reverse().map((row, index) => {
        const rowW = rowWidth(row);
        const rowH = rowHeight(row);
        currentWidth -= rowW;
        const y = mapHeight - rowH;
        const id = participantsDisplayed;
        participantsDisplayed += rowParticipants(row);
        return (
          <g key={index} transform={`translate(${currentWidth},${y})`}>
            <Row startingId={id} tables={row} />
          </g>
        );
      })}
    </svg>
  );
};

export default InstanceMap;
