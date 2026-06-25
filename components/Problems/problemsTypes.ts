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
