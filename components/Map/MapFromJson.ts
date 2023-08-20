import { School } from "../../hooks/types";
import { MapItem } from "./Map";

const MapData = (instance:string,competition:string) : MapItem[][][]=>{
    const jsonData = require(`../../data/${instance}${competition}.json`);
    const data = jsonData.map((row:any)=>{
        return row.map((table:any)=>{
            return table.map((item:any)=>{
                return {school: new School(item.school.name,item.school.venue?item.school.venue:undefined), level: item.level}});
            })
        });
    return data;
}

export default MapData;