import Participant from "../Participant/participant"


interface MapTableProps {
    type: "square" | "round",
    number: number,
}

const MapTable = ({type,number}:MapTableProps) => {
    const backgroundColor = "#FEFDF3";
    const color = "#000000"
    const size = 200;
    const participantSize = 300;
    if(type == "round"){
    return (
        <svg width={size} height={size} viewBox="0 0 1000 1000" overflow="visible">
            <circle cx="500" cy="500" r="400" stroke={color} strokeWidth="20" fill={backgroundColor} />
            <foreignObject x={500 - participantSize/2 } y={900 -participantSize/2} width={participantSize} height={participantSize} overflow="visible">
            <Participant id="3" school={{name:"Jorge Luis Borges",acronym:"JLB"}} level={3} size={participantSize} />
            </foreignObject>
            <foreignObject x={846.410161514 - participantSize/2 } y={300 -participantSize/2} width={participantSize} height={participantSize} overflow="visible">
            <Participant id="2" school={{name:"Saint Nicholas School",acronym:"CSN"}} level={3} size={participantSize} />
            </foreignObject>
            <foreignObject x={153.589838486 - participantSize/2 } y={300 -participantSize/2} width={participantSize} height={participantSize} overflow="visible">
            <Participant id="1" school={{name:"Florida Day School",acronym:"FDS"}} level={1} size={participantSize}/>
            </foreignObject>
        </svg>
    )}
    return null;
}

export default MapTable;