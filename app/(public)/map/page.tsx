import InstanceMap from "../../../components/Map/SVGMap/Map/map";
import Row, { TableData } from "../../../components/Map/SVGMap/Row/row";

const data = [
  {
    participants: [
      {
        school: {
          name: "Cardenal Pironio",
          acronym: "CAP",
        },
        level: 3,
      },
      {
        school: {
          name: "Lincoln",
          acronym: "LIN",
        },
        level: 2,
      },
      {
        school: {
          name: "Jes\u00fas en el Huerto de los Olivos",
          acronym: "HUER",
        },
        level: 1,
      },
    ],
    type: "round",
  },
  {
    participants: [
      {
        school: {
          name: "Santa Teresa",
          acronym: "STT",
        },
        level: 3,
      },
      {
        school: {
          name: "Jes\u00fas en el Huerto de los Olivos",
          acronym: "HUE",
        },
        level: 2,
      },
      {
        school: {
          name: "San Juan el Precursor",
          acronym: "PRE",
        },
        level: 1,
      },
    ],
    type: "round",
  },
  {
    participants: [
      {
        school: {
          name: "Sworn",
          acronym: "SWO",
        },
        level: 3,
      },
      {
        school: {
          name: "Florida Day School",
          acronym: "FDS",
        },
        level: 2,
      },
      {
        school: {
          name: "Newman",
          acronym: "NEW",
        },
        level: 1,
      },
    ],
    type: "square",
  },
  {
    participants: [
      {
        school: {
          name: "Dardo Rocha",
          acronym: "DRO",
          venue: "CABA",
        },
        level: 3,
      },
    ],
    type: "individual",
  },
] as TableData[];

const map = [data, data.slice(0, 2)];
export default async function Map() {
  return <InstanceMap data={map} />;
}
