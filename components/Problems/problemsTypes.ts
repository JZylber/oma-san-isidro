import { INSTANCIA } from "@prisma/client";

export type ProblemRow = {
  instancia: INSTANCIA;
  año: number;
  nivel: number;
  link: string;
};

export const capitalize = (str: string) => {
  return str.charAt(0).toLocaleUpperCase() + str.slice(1).toLocaleLowerCase();
};

const ordered_instances = [
  "Interescolar",
  "Intercolegial",
  "Zonal",
  "Provincial",
  "Regional",
  "Nacional",
];

export const sortInstances = (ins_a: string, ins_b: string) => {
  return ordered_instances.indexOf(ins_a) - ordered_instances.indexOf(ins_b);
};

export const displayLevel = (nivel: number) => (nivel === 0 ? "Todos" : nivel);

export const normalizeString = (str: string) => {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase();
};

export type ProblemFilters = {
  year?: number;
  instance?: string;
  level?: number;
};

export type ProblemFilterOptions = {
  years: number[];
  instances: string[];
  levels: number[];
};

const YEAR_KEYS = ["ano", "año"];
const FILTER_KEYS = YEAR_KEYS.concat(["instancia", "nivel"]);

const readParam = (params: URLSearchParams, keys: string[]) => {
  for (const key of keys) {
    const value = params.get(key);
    if (value) {
      return value;
    }
  }
  return null;
};

const readNumber = (raw: string | null, allowed: number[]) => {
  if (raw === null) {
    return undefined;
  }
  const value = Number(raw);
  return allowed.includes(value) ? value : undefined;
};

export const parseProblemFilters = (
  search: string,
  { years, instances, levels }: ProblemFilterOptions
): ProblemFilters => {
  const params = new URLSearchParams(search);
  const rawInstance = readParam(params, ["instancia"]);
  return {
    year: readNumber(readParam(params, YEAR_KEYS), years),
    instance: rawInstance
      ? instances.find(
          (option) => normalizeString(option) === normalizeString(rawInstance)
        )
      : undefined,
    level: readNumber(readParam(params, ["nivel"]), levels),
  };
};

export const problemFiltersToSearch = (
  currentSearch: string,
  { year, instance, level }: ProblemFilters
) => {
  const params = new URLSearchParams(currentSearch);
  FILTER_KEYS.forEach((key) => params.delete(key));
  if (year !== undefined) {
    params.set("ano", `${year}`);
  }
  if (instance !== undefined) {
    params.set("instancia", normalizeString(instance));
  }
  if (level !== undefined) {
    params.set("nivel", `${level}`);
  }
  const query = params.toString();
  return query ? `?${query}` : "";
};
