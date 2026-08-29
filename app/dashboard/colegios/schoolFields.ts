import { normalize } from "utils/text";

export type SchoolDraft = {
  id_colegio: number;
  nombre: string;
  sede: string | null;
  localidad: string | null;
  acr_nimo: string;
};

export type School = {
  id_colegio: number;
  nombre: string;
  sede: string | null;
};

/** Mismo formato "Colegio - Sede" con el que se muestran los colegios. */
export const schoolLabel = (colegio: { nombre: string; sede: string | null }) =>
  colegio.sede ? `${colegio.nombre} - ${colegio.sede}` : colegio.nombre;

/**
 * Busca el texto en nombre, sede, localidad y acrónimo, sin distinguir acentos
 * ni mayúsculas.
 */
export const matchesSchoolSearch = (
  colegio: {
    nombre: string;
    sede: string | null;
    localidad: string | null;
    acr_nimo: string;
  },
  term: string
) => {
  const needle = normalize(term.trim());
  if (!needle) return true;
  return normalize(
    [colegio.nombre, colegio.sede, colegio.localidad, colegio.acr_nimo]
      .filter((value) => value)
      .join(" ")
  ).includes(needle);
};

export const blankSchool = (): SchoolDraft => ({
  // -1 significa "colegio nuevo": el where del upsert no matchea y Prisma crea.
  id_colegio: -1,
  nombre: "",
  sede: null,
  localidad: null,
  acr_nimo: "",
});
