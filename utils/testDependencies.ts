/**
 * Filas que apuntan a una Prueba. Ninguna relación tiene onDelete: Cascade en
 * el schema, así que cualquiera de estos conteos en cero impide el borrado.
 */
export type TestDependencyCounts = {
  rinden: number;
  problemas: number;
  sedeinstancia: number;
  puntoinstancia: number;
  inhabilitados: number;
};

const LABELS: [keyof TestDependencyCounts, string, string][] = [
  ["rinden", "resultado", "resultados"],
  ["problemas", "problema", "problemas"],
  ["sedeinstancia", "sede", "sedes"],
  ["puntoinstancia", "punto de entrega", "puntos de entrega"],
  ["inhabilitados", "inhabilitado", "inhabilitados"],
];

/** "12 resultados, 3 problemas y 1 sede", o "" si nada bloquea el borrado. */
export const describeTestDependencies = (counts: TestDependencyCounts) => {
  const parts = LABELS.filter(([key]) => counts[key] > 0).map(
    ([key, singular, plural]) =>
      `${counts[key]} ${counts[key] === 1 ? singular : plural}`
  );
  if (parts.length === 0) return "";
  if (parts.length === 1) return parts[0];
  return `${parts.slice(0, -1).join(", ")} y ${parts[parts.length - 1]}`;
};
