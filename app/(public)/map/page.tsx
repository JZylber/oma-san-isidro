import MapTable from "../../../components/Map/SVGMap/Table/table";

export default async function Map() {
  return (
    <>
      <MapTable
        type={"round"}
        participants={[
          { school: { name: "Andersen", acronym: "AND" }, level: 1 },
          { school: { name: "Baker", acronym: "BAK" }, level: 2 },
          { school: { name: "Charlie", acronym: "CHA" }, level: 3 },
        ]}
        selected={[true, false, false]}
        startingId={0}
      />
      <MapTable
        type={"square"}
        participants={[
          { school: { name: "Andersen", acronym: "AND" }, level: 1 },
          { school: { name: "Baker", acronym: "BAK" }, level: 2 },
          {
            school: { name: "Asunción de la Virgen", acronym: "ASU" },
            level: 3,
          },
        ]}
        selected={[true, false, false]}
        startingId={3}
      />
      <MapTable
        type={"individual"}
        participants={[
          { school: { name: "Andersen", acronym: "AND" }, level: 1 },
        ]}
        selected={[true]}
        startingId={6}
      />
    </>
  );
}
