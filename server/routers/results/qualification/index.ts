import { Prisma } from "@prisma/client";
import { defaultCriterion, parseCriteria } from "./criteria";
import { buildStrategy } from "./strategies";
import { QualificationStrategy } from "./types";

export * from "./criteria";
export * from "./types";

/**
 * Devuelve un buscador de estrategias por nivel. El criterio guardado es un
 * arreglo indexado por nivel - 1; los niveles sin criterio usan el de defecto.
 */
export const parseQualificationCriteria = (
  raw: Prisma.JsonValue | null | undefined
): ((level: number) => QualificationStrategy) => {
  const strategies = parseCriteria(raw).map(buildStrategy);
  const fallback = buildStrategy(defaultCriterion());
  return (level: number) => strategies[level - 1] || fallback;
};
