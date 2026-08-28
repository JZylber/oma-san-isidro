"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Table from "../Table/Table";
import SelectResultCategory from "../ResultsPage/SelectResultCategory";
import ProblemCard from "./Mobile/ProblemCard";
import {
  ProblemFilters,
  ProblemRow,
  capitalize,
  displayLevel,
  parseProblemFilters,
  problemFiltersToSearch,
  sortInstances,
} from "./problemsTypes";

const headers = ["Instancia", "Año", "Nivel", ""];
const downloadHeaders = ["Instancia", "Año", "Nivel", "Enlace"];

const openPdf = (link: string) => window.open(link, "_blank", "noopener,noreferrer");

const make_element = (row: ProblemRow, index: number) => {
  return (
    <tr
      key={index}
      onClick={() => openPdf(row.link)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openPdf(row.link);
        }
      }}
      role="link"
      tabIndex={0}
      className="cursor-pointer"
    >
      <td>{capitalize(row.instancia)}</td>
      <td>{row.año}</td>
      <td className="text-center">{displayLevel(row.nivel)}</td>
      <td className="text-center">
        <Image src="/images/menuArrow.svg" width={10} height={16} alt="" className="inline-block" />
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
  const years = Array.from(new Set(rows.map((row) => row.año))).sort((a, b) => b - a);
  const instances = Array.from(new Set(rows.map((row) => capitalize(row.instancia))));
  const levels = [1, 2, 3];

  // During a client-side navigation the pathname is already the new route while
  // window.location still points at the previous one, so only trust the URL when
  // the two agree - otherwise the previous page's filters leak into this one.
  const pathname = usePathname();
  const [filters, setFilters] = useState<ProblemFilters>(() =>
    typeof window === "undefined" || window.location.pathname !== pathname
      ? {}
      : parseProblemFilters(window.location.search, { years, instances, levels })
  );
  const { year, instance, level } = filters;

  useEffect(() => {
    const search = problemFiltersToSearch(window.location.search, filters);
    if (search !== window.location.search) {
      window.history.replaceState(
        null,
        "",
        `${window.location.pathname}${search}${window.location.hash}`
      );
    }
  }, [filters]);

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
          setValue={(value) =>
            setFilters((previous) => ({ ...previous, year: value }))
          }
          options={years}
          clear
        />
        <SelectResultCategory
          category="Instancia"
          value={instance}
          setValue={(value) =>
            setFilters((previous) => ({ ...previous, instance: value }))
          }
          options={instances}
          sortOptions={sortInstances}
          clear
        />
        <SelectResultCategory
          category="Nivel"
          value={level}
          setValue={(value) =>
            setFilters((previous) => ({ ...previous, level: value }))
          }
          options={levels}
          clear
        />
      </form>
      <Table
        key={`${year ?? ""}|${instance ?? ""}|${level ?? ""}`}
        values={filtered}
        allValues={rows}
        headers={headers}
        center_columns={[2, 3]}
        elements_per_page={50}
        make_element={make_element}
        process_data={process_data}
        downloadHeaders={downloadHeaders}
        Card={ProblemCard}
      />
    </>
  );
};

export default ProblemsTable;
