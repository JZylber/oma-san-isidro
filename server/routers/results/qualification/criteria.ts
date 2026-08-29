import { CRITERION_TYPES, CriterionDescriptor, CriterionType } from "./types";

export const DEFAULT_POINTS = 5;
export const LEVELS = 3;

export const defaultCriterion = (): CriterionDescriptor => ({
  tipo: "PUNTOS",
  puntos: DEFAULT_POINTS,
});

const isCriterionType = (value: unknown): value is CriterionType =>
  CRITERION_TYPES.some((tipo) => tipo === value);

/**
 * Un criterio por nivel puede venir como un número (formato viejo, equivalente
 * a PUNTOS) o como un descriptor { tipo, puntos }. Cualquier otra cosa cae en
 * el criterio por defecto.
 */
export const parseCriterion = (raw: unknown): CriterionDescriptor => {
  if (typeof raw === "number" && !isNaN(raw)) {
    return { tipo: "PUNTOS", puntos: raw };
  }
  if (raw && typeof raw === "object" && !Array.isArray(raw)) {
    const { tipo, puntos } = raw as Record<string, unknown>;
    if (isCriterionType(tipo) && typeof puntos === "number" && !isNaN(puntos)) {
      return { tipo, puntos };
    }
  }
  return defaultCriterion();
};

/**
 * Normaliza el criterio guardado a un descriptor por nivel. El arreglo está
 * indexado por nivel - 1; los niveles sin criterio usan el de defecto. Un
 * arreglo más largo que LEVELS se respeta tal cual.
 *
 * Toma `unknown` a propósito: así este módulo no importa nada de Prisma y el
 * editor del dashboard lo puede usar desde el cliente.
 */
export const parseCriteria = (raw: unknown): CriterionDescriptor[] => {
  const criteria = Array.isArray(raw) ? raw : [];
  return Array.from({ length: Math.max(LEVELS, criteria.length) }, (_, index) =>
    parseCriterion(criteria[index])
  );
};
