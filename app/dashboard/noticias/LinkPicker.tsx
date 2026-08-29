"use client";

import ActionButton from "components/buttons/ActionButton/ActionButton";
import Select from "components/common/form/Select";
import Image from "next/image";
import { useState } from "react";
import {
  ParamRow,
  RouteDef,
  ROUTES,
  buildLink,
  defaultParamValue,
  findParam,
  findRoute,
  parseLink,
} from "./routeMap";

const labelClasses = "font-montserrat text-2xl font-semibold";
const inputClasses =
  "bg-primary-white border-2 border-primary-black rounded-md p-2 font-montserrat text-2xl";
// Free-text params sit among dropdowns, so they copy Select's box instead of the
// modal's plainer input recipe.
const paramInputClasses =
  "grow basis-0 min-w-0 bg-primary-white border-2 border-primary-black rounded-xl px-6 py-4 font-unbounded text-2xl";
const hintClasses = "font-montserrat text-xl opacity-60";

type Mode = "interno" | "externo";

/**
 * One labelled field plus the slot for its remove button. The slot is reserved
 * even when there is nothing to remove, so the route dropdown and the parameter
 * rows end up exactly the same width.
 */
const FieldRow = ({
  label,
  onRemove,
  children,
}: {
  label?: string;
  onRemove?: () => void;
  children: React.ReactNode;
}) => (
  <div className="flex flex-col gap-y-2">
    {label && <label className="font-montserrat text-2xl">{label}</label>}
    <div className="flex items-center gap-x-4">
      {children}
      <div className="w-12 h-12 shrink-0">
        {onRemove && (
          <div
            className="bg-primary-light-blue flex justify-center items-center w-full h-full border border-black rounded-lg cursor-pointer"
            onClick={onRemove}
          >
            <Image
              src="/images/x.svg"
              alt={`quitar ${label}`}
              width={20}
              height={20}
            />
          </div>
        )}
      </div>
    </div>
  </div>
);

/**
 * Editor for a news item's destination. Internal links are assembled from the
 * hardcoded route map instead of being typed, so the operator cannot misspell a
 * path or a query key; external URLs keep the old free-text field. Whichever
 * mode is active, the result is handed back as the single string the `Noticias`
 * row stores.
 *
 * Initial state is read from `value` once, so mount it with a `key` that changes
 * whenever the news being edited changes.
 */
const LinkPicker = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (link: string) => void;
}) => {
  const [initial] = useState(() => parseLink(value));
  // A brand new item has no link yet: start on Interno with nothing picked, so
  // the route dropdown is the first thing the operator sees and the link stays
  // empty (and the modal's Guardar disabled) until they choose one.
  const [mode, setMode] = useState<Mode>(
    value === "" ? "interno" : initial.mode
  );
  const [path, setPath] = useState(
    initial.mode === "interno" ? initial.path : ""
  );
  const [rows, setRows] = useState<ParamRow[]>(
    initial.mode === "interno" ? initial.rows : []
  );
  // Kept so that toggling to Interno and back does not lose a typed URL.
  const [externalLink, setExternalLink] = useState(
    initial.mode === "externo" ? value : ""
  );

  const route = findRoute(path);
  const available = (route?.params ?? []).filter(
    (param) => !rows.some((row) => row.name === param.name)
  );

  const applyInternal = (newPath: string, newRows: ParamRow[]) => {
    setPath(newPath);
    setRows(newRows);
    onChange(buildLink(newPath, newRows));
  };

  const switchMode = (newMode: Mode) => {
    setMode(newMode);
    if (newMode === "externo") {
      onChange(externalLink);
    } else {
      // Switching to Interno before a route is picked leaves the link empty
      // rather than keeping the external URL the form no longer shows.
      onChange(route ? buildLink(path, rows) : "");
    }
  };

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex items-center justify-between">
        <label className={labelClasses}>Link</label>
        <div className="flex gap-x-4">
          <ActionButton
            onClick={() => switchMode("interno")}
            important={mode === "interno"}
            className="!w-32 !h-12 !text-xl"
          >
            Interno
          </ActionButton>
          <ActionButton
            onClick={() => switchMode("externo")}
            important={mode === "externo"}
            className="!w-32 !h-12 !text-xl"
          >
            Externo
          </ActionButton>
        </div>
      </div>

      {mode === "externo" ? (
        <input
          type="text"
          value={externalLink}
          placeholder="https://..."
          onChange={(e) => {
            setExternalLink(e.target.value);
            onChange(e.target.value);
          }}
          className={inputClasses}
        />
      ) : (
        <>
          <FieldRow label="Ruta">
            <Select
              options={ROUTES.map((option) => option.label)}
              value={route ? route.label : ""}
              onChange={(label) => {
                const selected = ROUTES.find(
                  (option) => option.label === label
                ) as RouteDef;
                // Params belong to the route they were picked for.
                applyInternal(selected.path, []);
              }}
            />
          </FieldRow>

          {route?.params && (
            <div className="flex flex-col gap-y-4">
              {rows.map((row, index) => {
                const param = findParam(route, row.name);
                if (!param) {
                  return null;
                }
                const setValue = (newValue: string) =>
                  applyInternal(
                    path,
                    rows.map((current, i) =>
                      i === index ? { ...current, value: newValue } : current
                    )
                  );
                return (
                  <FieldRow
                    key={param.name}
                    label={param.label}
                    onRemove={() =>
                      applyInternal(
                        path,
                        rows.filter((_, i) => i !== index)
                      )
                    }
                  >
                    {param.options ? (
                      <Select
                        options={param.options}
                        value={row.value}
                        onChange={setValue}
                      />
                    ) : (
                      <input
                        type="text"
                        value={row.value}
                        placeholder={param.placeholder}
                        onChange={(e) => setValue(e.target.value)}
                        className={paramInputClasses}
                      />
                    )}
                  </FieldRow>
                );
              })}
              <FieldRow>
                <Select
                  options={available.map((param) => param.label)}
                  value={
                    available.length > 0
                      ? "Agregar parámetro"
                      : "Sin parámetros disponibles"
                  }
                  onChange={(label) => {
                    const param = available.find(
                      (option) => option.label === label
                    );
                    if (param) {
                      applyInternal(path, [
                        ...rows,
                        { name: param.name, value: defaultParamValue(param) },
                      ]);
                    }
                  }}
                />
              </FieldRow>
            </div>
          )}

          {route?.note && <p className={hintClasses}>{route.note}</p>}
          {route && (
            <p className={`${hintClasses} break-all`}>{buildLink(path, rows)}</p>
          )}
        </>
      )}
    </div>
  );
};

export default LinkPicker;
