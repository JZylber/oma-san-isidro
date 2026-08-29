/**
 * Filas que apuntan a un Colegio. Ninguna relación tiene onDelete: Cascade en
 * el schema, así que cualquiera de estos conteos en cero impide el borrado.
 */
export type SchoolDependencyCounts = {
  participaciones: number;
  sede_instancia: number;
};

const LABELS: [keyof SchoolDependencyCounts, string, string][] = [
  ["participaciones", "participación", "participaciones"],
  ["sede_instancia", "sede asignada", "sedes asignadas"],
];

/** "12 participaciones y 1 sede asignada", o "" si nada bloquea el borrado. */
export const describeSchoolDependencies = (counts: SchoolDependencyCounts) => {
  const parts = LABELS.filter(([key]) => counts[key] > 0).map(
    ([key, singular, plural]) =>
      `${counts[key]} ${counts[key] === 1 ? singular : plural}`
  );
  if (parts.length === 0) return "";
  if (parts.length === 1) return parts[0];
  return `${parts.slice(0, -1).join(", ")} y ${parts[parts.length - 1]}`;
};
