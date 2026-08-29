/**
 * Filas que apuntan a una Participacion. Ninguna relación tiene onDelete:
 * Cascade en el schema, así que cualquiera de estos conteos en cero impide el
 * borrado.
 */
export type ParticipationDependencyCounts = {
  rinde: number;
  inhabilitaciones: number;
  ParticipacionSedeInstancia: number;
};

const LABELS: [keyof ParticipationDependencyCounts, string, string][] = [
  ["rinde", "resultado", "resultados"],
  ["inhabilitaciones", "inhabilitación", "inhabilitaciones"],
  ["ParticipacionSedeInstancia", "sede asignada", "sedes asignadas"],
];

/** "3 resultados y 1 sede asignada", o "" si nada bloquea el borrado. */
export const describeParticipationDependencies = (
  counts: ParticipationDependencyCounts
) => {
  const parts = LABELS.filter(([key]) => counts[key] > 0).map(
    ([key, singular, plural]) =>
      `${counts[key]} ${counts[key] === 1 ? singular : plural}`
  );
  if (parts.length === 0) return "";
  if (parts.length === 1) return parts[0];
  return `${parts.slice(0, -1).join(", ")} y ${parts[parts.length - 1]}`;
};

/** Suma los conteos de varias participaciones para describirlos como uno solo. */
export const mergeParticipationDependencies = (
  counts: ParticipationDependencyCounts[]
): ParticipationDependencyCounts =>
  counts.reduce(
    (total, count) => ({
      rinde: total.rinde + count.rinde,
      inhabilitaciones: total.inhabilitaciones + count.inhabilitaciones,
      ParticipacionSedeInstancia:
        total.ParticipacionSedeInstancia + count.ParticipacionSedeInstancia,
    }),
    { rinde: 0, inhabilitaciones: 0, ParticipacionSedeInstancia: 0 }
  );
