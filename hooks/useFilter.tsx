import { useReducer } from "react";
import {
  Filterable,
  FilterableObject,
  FilterObject,
  ObjectWithFilterables,
} from "./types";
import { string } from "zod";

interface ChangeValueAction<S> {
  type: string;
  value: S;
}

const reducer = <S,>(
  state: Partial<S>,
  action: ChangeValueAction<Partial<S>>
) => {
  const { type, value } = action;
  switch (type) {
    case "update":
      return { ...state, ...value };
    default:
      return { ...state };
  }
};

const isObjectWPayload = <S extends FilterObject>(
  object: FilterableObject<S>
): object is ObjectWithFilterables<S> => {
  return (
    object.hasOwnProperty("payload") && object.hasOwnProperty("filterable")
  );
};

const useFilter = <S extends FilterObject>(values: FilterableObject<S>[]) => {
  const [state, dispatch] = useReducer(reducer<S>, {});
  const filterFunction = (value: S, filter: Partial<S>) => {
    const isFilterCompliant = Object.keys(filter).every((key) => {
      const property = isObjectWPayload(value)
        ? value.filterable[key]
        : value[key];
      if (filter[key] !== undefined) {
        if (typeof property !== "object") {
          if (property !== filter[key]) {
            return false;
          }
        } else {
          const filterable = property as Filterable<any>;
          if (!filterable.isFilteredBy(filter[key])) {
            return false;
          }
        }
      }
      return true;
    });
    return isFilterCompliant;
  };
  const filteredValues = isObjectWPayload(values[0])
    ? (values.filter((value) =>
        filterFunction(value.filterable as S, state)
      ) as ObjectWithFilterables<S>[])
    : (values.filter((value) => filterFunction(value as S, state)) as S[]);
  const update = (newValue: Partial<S>) => {
    dispatch({ type: "update", value: newValue });
  };
  let options: { [key in keyof S]: S[key][] } = Object.fromEntries(
    values.length > 0
      ? Object.keys(
          isObjectWPayload(values[0])
            ? (values[0].filterable as S)
            : (values[0] as S)
        ).map((key) => {
          const stateWithoutKey = { ...state, [key as keyof S]: undefined };
          if (
            (isObjectWPayload(values[0])
              ? typeof values[0].filterable[key as keyof S] !== "object"
              : typeof values[0][key as keyof S]) !== "object"
          ) {
            return [
              key as keyof S,
              Array.from(
                new Set(
                  values
                    .map((value) =>
                      isObjectWPayload(value) ? value.filterable : value
                    )
                    .filter((value) => filterFunction(value, stateWithoutKey))
                    .map((value) => value[key as keyof S])
                )
              ),
            ];
          } else {
            const uniqueValues = (
              isObjectWPayload(values[0])
                ? (values.map((v) => v.filterable) as S[])
                : (values as S[])
            )
              .filter((value) => filterFunction(value, stateWithoutKey))
              .map((value) => value[key as keyof S] as Filterable<any>)
              .filter(
                (value, index, self) =>
                  self.findIndex((v) => v.isFilteredBy(value)) === index
              );
            const genericValues = uniqueValues
              .map((value) => value.generic)
              .filter((value) => value !== undefined)
              .filter(
                (value, index, self) =>
                  self.findIndex((v) => v.isFilteredBy(value)) === index
              );
            return [key as keyof S, uniqueValues.concat(genericValues)];
          }
        })
      : []
  );
  return [state, update, filteredValues, options] as const;
};

export default useFilter;
