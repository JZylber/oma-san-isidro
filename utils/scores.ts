export interface ProblemScore {
  value: number;
  minus: number;
}

/**
 * Interpreta el puntaje de un problema tal como se carga en la base: un número
 * acompañado de cero o más "menos". El menos puede ir antes o después del
 * número ("1-", "1--", "-1", "1 -") y el medio punto se escribe "1/2".
 */
export const parseProblemScore = (raw: unknown): ProblemScore => {
  const score = raw === null || raw === undefined ? "" : String(raw);
  const minus = (score.match(/-/g) || []).length;
  const cleanValue = score.replace(/-/g, "");
  const numericValue = cleanValue === "1/2" ? 0.5 : Number(cleanValue);
  return {
    value: isNaN(numericValue) ? 0 : numericValue,
    minus,
  };
};
