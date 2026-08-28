import {
  CriterionDescriptor,
  CriterionType,
  QualificationContext,
  QualificationStrategy,
} from "./types";

/** Clasifica quien alcanza el puntaje, sin importar los menos. */
class MinimumPoints implements QualificationStrategy {
  constructor(private readonly threshold: number) {}

  qualifies({ points }: QualificationContext): boolean {
    return points >= this.threshold;
  }
}

/**
 * Clasifica quien supera el puntaje, y quien lo alcanza justo solo si ninguno
 * de los problemas que sumaron puntos tiene menos. Un menos en un problema que
 * no sumó puntos no cuenta.
 */
class MinimumPointsWithoutMinus implements QualificationStrategy {
  constructor(private readonly threshold: number) {}

  qualifies({ points, problems }: QualificationContext): boolean {
    if (points < this.threshold) return false;
    if (points > this.threshold) return true;
    return problems.every(
      (problem) => problem.value <= 0 || problem.minus === 0
    );
  }
}

const strategyBuilders: Record<
  CriterionType,
  (threshold: number) => QualificationStrategy
> = {
  PUNTOS: (threshold) => new MinimumPoints(threshold),
  PUNTOS_SIN_MENOS: (threshold) => new MinimumPointsWithoutMinus(threshold),
};

export const buildStrategy = ({
  tipo,
  puntos,
}: CriterionDescriptor): QualificationStrategy =>
  strategyBuilders[tipo](puntos);
