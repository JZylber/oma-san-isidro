import { INSTANCIA } from "@prisma/client";
import { EVENT_TYPES } from "components/Dashboard/eventTypes";
import {
  capitalize,
  normalizeString,
  sortInstances,
} from "components/Problems/problemsTypes";

export type ParamDef = {
  // Exact query key written to the URL. The public pages are not consistent
  // about this - /problemas reads `ano`, /resultados reads `año` - so each
  // route declares the spelling its own page actually looks for.
  name: string;
  label: string;
  // Present -> the value is picked from a dropdown. Absent -> free text.
  options?: string[];
  defaultValue?: string;
  placeholder?: string;
};

export type RouteDef = {
  path: string;
  label: string;
  params?: ParamDef[];
  note?: string;
};

export type ParamRow = {
  name: string;
  value: string;
};

export type ParsedLink =
  | { mode: "interno"; path: string; rows: ParamRow[] }
  | { mode: "externo" };

const instancesExcept = (missing: INSTANCIA) =>
  Object.values(INSTANCIA)
    .filter((instancia) => instancia !== missing)
    .sort((a, b) => sortInstances(capitalize(a), capitalize(b)));

// Interescolar is Ñandú's first instance and Intercolegial is OMA's; neither
// competition ever runs the other one.
const OMA_INSTANCES = instancesExcept(INSTANCIA.INTERESCOLAR);
const NANDU_INSTANCES = instancesExcept(INSTANCIA.INTERCOLEGIAL);

const currentYear = `${new Date().getFullYear()}`;

// Years come from whatever the DB happens to hold, so they stay free text.
const yearParam = (name: string): ParamDef => ({
  name,
  label: "Año",
  defaultValue: currentYear,
  placeholder: currentYear,
});

const instanceParam = (options: string[]): ParamDef => ({
  name: "instancia",
  label: "Instancia",
  options,
});

const levelParam: ParamDef = {
  name: "nivel",
  label: "Nivel",
  options: ["1", "2", "3"],
};

const competitionRoutes = (
  competition: string,
  base: string,
  instances: string[]
): RouteDef[] => [
  { path: base, label: `${competition} · General` },
  { path: `${base}/inscripcion`, label: `${competition} · Inscripción` },
  { path: `${base}/autorizacion`, label: `${competition} · Autorización` },
  {
    path: `${base}/instancias`,
    label: `${competition} · Instancias`,
    // InstanceMenu matches the raw enum value, without normalizing.
    params: [instanceParam(instances)],
  },
  { path: `${base}/reglamento`, label: `${competition} · Reglamento` },
  {
    path: `${base}/resultados`,
    label: `${competition} · Resultados`,
    params: [yearParam("año"), instanceParam(instances)],
    note: "Esta página solo aplica los filtros si se indican año e instancia juntos.",
  },
  {
    path: `${base}/problemas`,
    label: `${competition} · Problemas`,
    // ProblemsTable compares instances accent- and case-insensitively and
    // rewrites the URL to this lowercase form, so emit it directly.
    params: [
      yearParam("ano"),
      instanceParam(instances.map(normalizeString)),
      levelParam,
    ],
  },
];

export const ROUTES: RouteDef[] = [
  { path: "/", label: "Inicio" },
  ...competitionRoutes("OMA", "/oma", OMA_INSTANCES),
  ...competitionRoutes("Ñandú", "/nandu", NANDU_INSTANCES),
  {
    path: "/otros/calendario",
    label: "Otros · Calendario",
    params: [{ name: "categoria", label: "Categoría", options: EVENT_TYPES }],
  },
  { path: "/otros/internacional", label: "Otros · Internacional" },
  { path: "/otros/mateclubes", label: "Otros · Mateclubes" },
  { path: "/otros/geometria", label: "Otros · Geometría" },
  { path: "/otros/canguro", label: "Otros · Canguro" },
  { path: "/otros/libros", label: "Otros · Libros" },
  { path: "/contacto", label: "Contacto" },
];

export const findRoute = (path: string) =>
  ROUTES.find((route) => route.path === path);

export const findParam = (route: RouteDef, name: string) =>
  route.params?.find((param) => param.name === name);

export const defaultParamValue = (param: ParamDef) =>
  param.defaultValue ?? param.options?.[0] ?? "";

// URLSearchParams escapes every non-ASCII character, which turns the accented
// keys and values these pages use into `a%C3%B1o` and `Matem%C3%A1tica`. Those
// work, but the link is also read by a human in the dashboard table, so put the
// letters back wherever doing so cannot change how the query parses.
const readable = (query: string) =>
  query.replace(/(?:%[0-9A-F]{2})+/gi, (escaped) => {
    const decoded = decodeURIComponent(escaped);
    return /[&=#+?%\s]/.test(decoded) ? escaped : decoded;
  });

export const buildLink = (path: string, rows: ParamRow[]) => {
  const search = new URLSearchParams();
  rows.forEach(({ name, value }) => {
    if (value !== "") {
      search.append(name, value);
    }
  });
  const query = search.toString();
  return query ? `${path}?${readable(query)}` : path;
};

export const parseLink = (link: string): ParsedLink => {
  const externo: ParsedLink = { mode: "externo" };
  if (!link.startsWith("/") || link.includes("#")) {
    return externo;
  }
  const separator = link.indexOf("?");
  const path = separator === -1 ? link : link.slice(0, separator);
  const search = separator === -1 ? "" : link.slice(separator + 1);
  const route = findRoute(path);
  if (!route) {
    return externo;
  }
  const rows: ParamRow[] = [];
  const seen = new Set<string>();
  for (const [name, value] of Array.from(
    new URLSearchParams(search).entries()
  )) {
    const param = findParam(route, name);
    if (!param || seen.has(name)) {
      return externo;
    }
    if (param.options && !param.options.includes(value)) {
      return externo;
    }
    seen.add(name);
    rows.push({ name, value });
  }
  // Last guard: anything the picker cannot reproduce character for character -
  // a different escaping, a stray empty value - opens as free text instead, so
  // editing an unrelated field never silently rewrites the link.
  return buildLink(path, rows) === link ? { mode: "interno", path, rows } : externo;
};
