import { Prisma } from "@prisma/client";
import { buildStrategy } from "./strategies";
import {
  CRITERION_TYPES,
  CriterionDescriptor,
  CriterionType,
  QualificationStrategy,
} from "./types";

export * from "./types";

const DEFAULT_POINTS = 5;
const LEVELS = 3;

const defaultCriterion = (): CriterionDescriptor => ({
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
const parseCriterion = (raw: unknown): CriterionDescriptor => {
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
 * Devuelve un buscador de estrategias por nivel. El criterio guardado es un
 * arreglo indexado por nivel - 1; los niveles sin criterio usan el de defecto.
 */
export const parseQualificationCriteria = (
  raw: Prisma.JsonValue | null | undefined
): ((level: number) => QualificationStrategy) => {
  const criteria = Array.isArray(raw) ? raw : [];
  const strategies = Array.from(
    { length: Math.max(LEVELS, criteria.length) },
    (_, index) => buildStrategy(parseCriterion(criteria[index]))
  );
  const fallback = buildStrategy(defaultCriterion());
  return (level: number) => strategies[level - 1] || fallback;
};
