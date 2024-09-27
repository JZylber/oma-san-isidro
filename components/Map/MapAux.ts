import { School } from "../../hooks/types";
import { Competition } from "../../server/app-router-db-calls";
import { MapItem } from "./Map";
import { TableData } from "./SVGMap/Row/row";
import { ParticipantData } from "./SVGMap/Table/table";

export const getMapData = (instance:string,competition:Competition) : TableData[][]=>{
    const jsonData = require(`../../data/${instance}${competition}.json`);
    return jsonData;
}

export const mapItemFromParticipantData = (data:ParticipantData) : MapItem =>{
    return {school: new School(data.school.name,data.school.venue?data.school.venue:undefined), level: data.level?data.level:0}
}

export const getParticipants = (data:TableData[][]) : MapItem[]=>{
    const participants = data.reduce((acc:MapItem[],row)=>{
        row.forEach((table)=>{
            table.participants.forEach((participant)=>{
                acc.push(mapItemFromParticipantData(participant))
        })});
        return acc
    },[]);
    return participants;
}

export const participantIsSelected = (participant:ParticipantData,filter:Partial<MapItem>) : boolean =>{
    let dataSchool = mapItemFromParticipantData(participant);
    let correctLevel = filter.level
    ? filter.level === dataSchool.level
    : true;
    let correctSchool = filter.school
    ? dataSchool.school.isFilteredBy(filter.school)
    : true;
    return correctSchool && correctLevel;
}

export const participantsOfLevelInTable = (data:TableData,filter:Partial<MapItem>,level:number) : number=>{
    let compliantParticipants = data.participants.filter((participant) => {
    return participantIsSelected(participant, filter) && participant.level === level;
    })
    return compliantParticipants.length;
}