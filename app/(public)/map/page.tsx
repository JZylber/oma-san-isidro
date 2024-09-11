import Participant from "../../../components/Map/SVGMap/Participant/participant";

export default async function Map() {
    return <Participant school={{name:"Florida Day School",acronym:"FDS"}} level={1} size={30}/>;
}