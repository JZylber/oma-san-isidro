import { LEVELS } from "server/routers/results/qualification/criteria";
import { normalize } from "utils/text";

// El colegio lo define el panel de colegios; acá sólo se lo elige.
export type { School } from "../colegios/schoolFields";
export { schoolLabel } from "../colegios/schoolFields";

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

/**
 * En este panel el año está fijo, así que la competencia se identifica sólo por
 * su tipo: no se reutiliza el competitionLabel de pruebas, que agrega año y
 * número. Competencia.tipo es texto libre, por eso la etiqueta sale del dato.
 */
export const competitionLabel = (competencia: { tipo: string }) =>
  competencia.tipo;

export const levelOptions = () =>
  Array.from({ length: LEVELS }, (_, index) => `${index + 1}`);

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
