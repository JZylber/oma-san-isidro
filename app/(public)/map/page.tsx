"use client";
import InstanceMap from "../../../components/Map/SVGMap/Map/map";
import { TableData } from "../../../components/Map/SVGMap/Row/row";

const json = require(`../../../data/RegionalOMA.json`) as TableData[][];

export default async function Map() {
  return <InstanceMap data={json} />;
}
