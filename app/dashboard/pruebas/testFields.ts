import { INSTANCIA } from "@prisma/client";
import { capitalize, sortInstances } from "components/Problems/problemsTypes";
import { CriterionDescriptor } from "server/routers/results/qualification/types";

export type TestDraft = {
  id_prueba: number;
  fecha: Date;
  instancia: INSTANCIA;
  id_competencia: number;
  cantidad_problemas: number;
  fecha_limite_autorizacion: Date | null;
  resultados_disponibles: boolean;
  hora_ingreso: Date;
  duracion: number;
  criterio_habilitacion: CriterionDescriptor[] | null;
};

const pad = (value: number) => `${value}`.padStart(2, "0");

// fecha y fecha_limite_autorizacion son columnas @db.Date: Prisma las devuelve
// a medianoche UTC, así que se leen y se escriben con getters UTC.
export const displayDate = (date: Date) =>
  `${date.getUTCDate()}/${date.getUTCMonth() + 1}/${date.getUTCFullYear()}`;

export const dateInputValue = (date: Date) => date.toISOString().split("T")[0];

export const parseDateInput = (value: string) =>
  new Date(`${value} GMT-0300`);

// hora_ingreso es un time(6) de Postgres, que Prisma devuelve como un Date
// sobre el 1/1/1970 en UTC. components/Instances/Venues.tsx lo muestra con
// getUTCHours()/getUTCMinutes(), así que acá hay que quedarse en UTC: usar el
// " GMT-0300" de las fechas correría el horario que ven las páginas públicas.
export const timeInputValue = (time: Date) =>
  `${pad(time.getUTCHours())}:${pad(time.getUTCMinutes())}`;

export const parseTimeInput = (value: string) =>
  new Date(`1970-01-01T${value}:00.000Z`);

/** Minutos a "h:mm", el mismo formato que muestra la página de instancias. */
export const displayDuration = (minutes: number) =>
  `${Math.floor(minutes / 60)}:${pad(minutes % 60)}`;

const ALL_INSTANCES = Object.values(INSTANCIA).sort((a, b) =>
  sortInstances(capitalize(a), capitalize(b))
);

/**
 * Interescolar es la primera instancia de Ñandú e Intercolegial la de OMA;
 * ninguna competencia corre la de la otra. Competencia.tipo es texto libre, así
 * que cualquier otro valor recibe la lista completa.
 */
export const instanceOptions = (tipo: string | undefined) => {
  const missing =
    tipo === "OMA"
      ? INSTANCIA.INTERESCOLAR
      : tipo === "ÑANDÚ"
      ? INSTANCIA.INTERCOLEGIAL
      : undefined;
  return missing
    ? ALL_INSTANCES.filter((instancia) => instancia !== missing)
    : ALL_INSTANCES;
};

export const sortedInstances = (instances: INSTANCIA[]) =>
  [...instances].sort((a, b) => sortInstances(capitalize(a), capitalize(b)));

export const competitionLabel = (competencia: {
  tipo: string;
  ano: number;
  numero: number;
}) => `${competencia.tipo} ${competencia.ano} (N° ${competencia.numero})`;

// Mismos defaults que declara el schema para una Prueba nueva.
export const blankTest = (): TestDraft => ({
  id_prueba: -1,
  fecha: new Date(`${dateInputValue(new Date())} GMT-0300`),
  instancia: INSTANCIA.INTERCOLEGIAL,
  id_competencia: -1,
  cantidad_problemas: 3,
  fecha_limite_autorizacion: null,
  resultados_disponibles: false,
  hora_ingreso: parseTimeInput("13:30"),
  duracion: 120,
  criterio_habilitacion: null,
});
