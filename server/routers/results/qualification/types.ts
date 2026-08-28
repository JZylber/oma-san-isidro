import { ProblemScore } from "../../../../utils/scores";

export interface QualificationContext {
  /** Nivel del participante (1, 2 o 3). */
  level: number;
  /** Suma de los totales de todas las instancias que cuentan. */
  points: number;
  /** Todos los problemas de todas las instancias que cuentan. */
  problems: ProblemScore[];
}

export interface QualificationStrategy {
  qualifies(context: QualificationContext): boolean;
}

export const CRITERION_TYPES = ["PUNTOS", "PUNTOS_SIN_MENOS"] as const;

export type CriterionType = (typeof CRITERION_TYPES)[number];

export interface CriterionDescriptor {
  tipo: CriterionType;
  puntos: number;
}
