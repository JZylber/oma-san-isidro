import Participant from "../Participant/participant";

export interface ParticipantData {
  school: { name: string; acronym: string; venue?: string };
  level?: number;
  selected?: boolean;
}

interface MapTableProps {
  type: "individual" | "square" | "round" | "pair";
  participants: ParticipantData[];
  startingId: number;
}

const MapTable = ({ type, participants, startingId }: MapTableProps) => {
  const backgroundColor = "#FEFDF3";
  const color = "#000000";
  const size = 200;
  const participantSize = 300;
  if (type == "round") {
    const coordinates =
      participants.length === 3
        ? [
            [500 - participantSize / 2, 800 - participantSize / 2],
            [796.410161514 - participantSize / 2, 300 - participantSize / 2],
            [203.589838486 - participantSize / 2, 300 - participantSize / 2],
          ]
        : [
            [
              217.157287525 - participantSize / 2,
              217.157287525 - participantSize / 2,
            ],
            [
              710.128795527 - participantSize / 2,
              217.157287525 - participantSize / 2,
            ],
            [
              217.157287525 - participantSize / 2,
              710.128795527 - participantSize / 2,
            ],
            [
              710.128795527 - participantSize / 2,
              710.128795527 - participantSize / 2,
            ],
          ];
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 1000 1000"
        overflow="visible"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="500"
          cy="500"
          r="300"
          stroke={color}
          strokeWidth="20"
          fill={backgroundColor}
        />
        {participants.map((participant, index) => {
          return (
            <foreignObject
              key={index}
              x={coordinates[index][0]}
              y={coordinates[index][1]}
              width={participantSize}
              height={participantSize}
              overflow="visible"
            >
              <Participant
                id={(startingId + index).toString()}
                school={participant.school}
                level={participant.level}
                size={participantSize}
                selected={participant.selected}
              />
            </foreignObject>
          );
        })}
      </svg>
    );
  } else if (type === "square") {
    const coordinates = [
      [1100 - participantSize / 2, 250 - participantSize / 2],
      [400 - participantSize / 2, 250 - participantSize / 2],
      [1100 - participantSize / 2, 750 - participantSize / 2],
      [400 - participantSize / 2, 750 - participantSize / 2],
    ];
    return (
      <svg
        width={size * 1.5}
        height={size}
        viewBox="0 0 1500 1000"
        overflow="visible"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="100"
          y="250"
          width="1300"
          height="500"
          rx="33.5"
          fill={backgroundColor}
          stroke={color}
          strokeWidth="20"
        />
        {participants.map((participant, index) => {
          return (
            <foreignObject
              key={index}
              x={coordinates[index][0]}
              y={coordinates[index][1]}
              width={participantSize}
              height={participantSize}
              overflow="visible"
            >
              <Participant
                id={(startingId + index).toString()}
                school={participant.school}
                level={participant.level}
                size={participantSize}
                selected={participant.selected}
              />
            </foreignObject>
          );
        })}
        {[...Array(4 - participants.length).keys()].map((index) => {
          return (
            <foreignObject
              key={participants.length + index}
              x={coordinates[participants.length + index][0]}
              y={coordinates[participants.length + index][1]}
              width={participantSize}
              height={participantSize}
              overflow="visible"
            >
              <Participant
                id={(startingId + participants.length + index).toString()}
                size={participantSize}
              />
            </foreignObject>
          );
        })}
      </svg>
    );
  } else if (type === "individual") {
    if (participants.length === 1) {
      return (
        <svg
          width={size * 0.6}
          height={size * 0.6}
          viewBox="0 0 600 600"
          overflow="visible"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="50"
            y="300"
            width="500"
            height="250"
            rx="33.5"
            fill={backgroundColor}
            stroke={color}
            strokeWidth="20"
          />
          <foreignObject
            x={300 - participantSize / 2}
            y={300 - participantSize / 2}
            width={participantSize}
            height={participantSize}
          >
            <Participant
              id={startingId.toString()}
              school={participants[0].school}
              level={participants[0].level}
              size={participantSize}
              selected={participants[0].selected}
            />
          </foreignObject>
        </svg>
      );
    }
  } else if (type === "pair") {
    const coordinates = [
      [250 - participantSize / 2, 300 - participantSize / 2],
      [750 - participantSize / 2, 300 - participantSize / 2],
    ];
    return (
      <svg
        width={size}
        height={size * 0.6}
        viewBox="0 0 1000 600"
        overflow="visible"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="50"
          y="300"
          width="900"
          height="250"
          rx="33.5"
          fill={backgroundColor}
          stroke={color}
          strokeWidth="20"
        />
        {participants.map((participant, index) => {
          return (
            <foreignObject
              key={index}
              x={coordinates[index][0]}
              y={coordinates[index][1]}
              width={participantSize}
              height={participantSize}
            >
              <Participant
                id={(startingId + index).toString()}
                school={participant.school}
                level={participant.level}
                size={participantSize}
                selected={participant.selected}
              />
            </foreignObject>
          );
        })}
      </svg>
    );
  }
  return null;
};

export default MapTable;
