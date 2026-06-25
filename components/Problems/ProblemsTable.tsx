"use client";
import { useState } from "react";
import Image from "next/image";
import Table from "../Table/Table";
import SelectResultCategory from "../ResultsPage/SelectResultCategory";
import ProblemCard from "./Mobile/ProblemCard";
import { ProblemRow, capitalize, sortInstances, displayLevel } from "./problemsTypes";

const headers = ["Instancia", "Año", "Nivel", "Enlace"];

const make_element = (row: ProblemRow, index: number) => {
  return (
    <tr key={index}>
      <td>{capitalize(row.instancia)}</td>
      <td>{row.año}</td>
      <td className="text-center">{displayLevel(row.nivel)}</td>
      <td className="text-center">
        <a href={row.link} target="_blank" rel="noreferrer">
          <Image
            src="/images/article.svg"
            width={20}
            height={20}
            alt="Ver problema"
            className="inline-block cursor-pointer"
          />
        </a>
      </td>
    </tr>
  );
};

const process_data = (row: ProblemRow): string[] => [
  capitalize(row.instancia),
  `${row.año}`,
  `${displayLevel(row.nivel)}`,
  row.link,
];

const ProblemsTable = ({ rows }: { rows: ProblemRow[] }) => {
  const [year, setYear] = useState<number | undefined>();
  const [instance, setInstance] = useState<string | undefined>();
  const [level, setLevel] = useState<number | undefined>();

  const years = Array.from(new Set(rows.map((row) => row.año))).sort((a, b) => b - a);
  const instances = Array.from(new Set(rows.map((row) => capitalize(row.instancia))));
  const levels = [1, 2, 3];

  const filtered = rows.filter(
    (row) =>
      (year === undefined || row.año === year) &&
      (instance === undefined || capitalize(row.instancia) === instance) &&
      (level === undefined || row.nivel === 0 || row.nivel === level)
  );

  return (
    <>
      <form className="flex max-tablet:flex-col max-tablet:gap-y-[2.4rem] max-tablet:mb-[2.4rem] tablet:pb-[2rem] tablet:items-end">
        <SelectResultCategory
          category="Año"
          value={year}
          setValue={(value) => setYear(value)}
          options={years}
          clear
        />
        <SelectResultCategory
          category="Instancia"
          value={instance}
          setValue={(value) => setInstance(value)}
          options={instances}
          sortOptions={sortInstances}
          clear
        />
        <SelectResultCategory
          category="Nivel"
          value={level}
          setValue={(value) => setLevel(value)}
          options={levels}
          clear
        />
      </form>
      <Table
        values={filtered}
        allValues={rows}
        headers={headers}
        center_columns={[2, 3]}
        elements_per_page={50}
        make_element={make_element}
        process_data={process_data}
        Card={ProblemCard}
      />
    </>
  );
};

export default ProblemsTable;
