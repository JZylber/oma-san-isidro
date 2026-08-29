import { LEVELS } from "server/routers/results/qualification/criteria";

export type ParticipantDraft = {
  id_participante: number;
  dni: number;
  nombre: string;
  apellido: string;
  email: string | null;
  ano: number;
  participacion: {
    id_participacion: number;
    id_competencia: number;
    id_colegio: number;
    nivel: number;
  };
};

export type Competition = {
  id_competencia: number;
  numero: number;
  ano: number;
  tipo: string;
};

export type School = {
  id_colegio: number;
  nombre: string;
  sede: string | null;
};

/**
 * En este panel el año está fijo, así que la competencia se identifica sólo por
 * su tipo: no se reutiliza el competitionLabel de pruebas, que agrega año y
 * número. Competencia.tipo es texto libre, por eso la etiqueta sale del dato.
 */
export const competitionLabel = (competencia: { tipo: string }) =>
  competencia.tipo;

/** Mismo formato "Colegio - Sede" con el que se muestran los colegios. */
export const schoolLabel = (colegio: { nombre: string; sede: string | null }) =>
  colegio.sede ? `${colegio.nombre} - ${colegio.sede}` : colegio.nombre;

export const levelOptions = () =>
  Array.from({ length: LEVELS }, (_, index) => `${index + 1}`);

const normalize = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

/** Busca el texto en apellido, nombre y DNI, sin distinguir acentos ni mayúsculas. */
export const matchesSearch = (
  participante: { nombre: string; apellido: string; dni: number },
  term: string
) => {
  const needle = normalize(term.trim());
  if (!needle) return true;
  return normalize(
    `${participante.apellido} ${participante.nombre} ${participante.dni}`
  ).includes(needle);
};

export const blankParticipant = (
  ano: number,
  id_competencia: number
): ParticipantDraft => ({
  id_participante: -1,
  dni: 0,
  nombre: "",
  apellido: "",
  email: null,
  ano,
  participacion: {
    id_participacion: -1,
    id_competencia,
    id_colegio: -1,
    nivel: 1,
  },
});
