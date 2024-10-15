import { useEffect, useReducer } from "react";
import { NewResults, Result2Add, Result2Modify } from "../wizardModal";
import { EditableResult } from "server/routers/dashboard";
import Image from "next/image";
import Switch from "components/common/form/Switch";

interface Results2UpdateProps {
  newResults: NewResults[];
  currentResults: EditableResult[];
}

const bool2Icon = (bool: boolean, width: number = 12, height: number = 12) => {
  return (
    <Image
      src={`/icons/${bool ? "check" : "close"}.svg`}
      width={width}
      height={height}
      alt="check"
    />
  );
};

const displayResult = ({
  result: [currentResult, newResult, overwrite],
  data,
  overwriteResult,
}: {
  result: [Result2Modify, Result2Modify, boolean];
  data: EditableResult[];
  overwriteResult: (id_participacion: number, value: boolean) => void;
}) => {
  const participant = data.find(
    (d) => d.id_participacion === currentResult.id_participacion
  ) as EditableResult;
  const level = participant.nivel;
  const name = participant.participante.nombre;
  const lastName = participant.participante.apellido;
  const dni = participant.participante.dni;
  return (
    <>
      <td className="py-2 px-1 text-center">{level}</td>
      <td className="py-2 px-1">{name}</td>
      <td className="py-2 px-1">{lastName}</td>
      <td className="py-2 px-1 text-right">{dni}</td>
      {currentResult.puntaje.map((p, i) => {
        return (
          <td key={i} className="py-2 px-2">
            <div
              className={`flex items-center gap-px ${
                newResult.puntaje[i] !== p
                  ? "justify-between"
                  : "justify-center"
              }`}
            >
              <span
                className={`shrink-0 ${
                  !overwrite && newResult.puntaje[i] !== p ? "font-bold" : ""
                }`}
              >
                {p}
              </span>
              {newResult.puntaje[i] !== p ? (
                <>
                  <Image
                    src="/images/newsArrow.svg"
                    width={12}
                    height={12}
                    alt="arrow"
                    className="shrink-0"
                  />
                  <span className={`shrink-0 ${overwrite ? "font-bold" : ""}`}>
                    {newResult.puntaje[i]}
                  </span>
                </>
              ) : (
                ""
              )}{" "}
            </div>
          </td>
        );
      })}
      <td className="py-2 px-2">
        <div
          className={`flex items-center gap-px ${
            newResult.aprobado !== currentResult.aprobado
              ? "justify-between"
              : "justify-center"
          }`}
        >
          {bool2Icon(
            currentResult.aprobado,
            newResult.aprobado !== currentResult.aprobado && !overwrite
              ? 24
              : 12,
            newResult.aprobado !== currentResult.aprobado && !overwrite
              ? 24
              : 12
          )}
          {newResult.aprobado !== currentResult.aprobado ? (
            <>
              <Image
                src="/images/newsArrow.svg"
                width={12}
                height={12}
                alt="arrow"
              />
              {bool2Icon(
                newResult.aprobado,
                overwrite ? 24 : 12,
                overwrite ? 24 : 12
              )}
            </>
          ) : (
            ""
          )}
        </div>
      </td>
      <td className="py-2 px-2">
        <div
          className={`flex items-center gap-px ${
            newResult.presente !== currentResult.presente
              ? "justify-between"
              : "justify-center"
          }`}
        >
          {bool2Icon(
            currentResult.presente,
            newResult.presente !== currentResult.presente && !overwrite
              ? 24
              : 12,
            newResult.presente !== currentResult.presente && !overwrite
              ? 24
              : 12
          )}
          {newResult.presente !== currentResult.presente ? (
            <>
              <Image
                src="/images/newsArrow.svg"
                width={12}
                height={12}
                alt="arrow"
              />
              {bool2Icon(
                newResult.presente,
                overwrite ? 24 : 12,
                overwrite ? 24 : 12
              )}
            </>
          ) : (
            ""
          )}
        </div>
      </td>
      <td className="py-2 px-2">
        <div
          className={`flex items-center gap-px ${
            newResult.aclaracion !== currentResult.aclaracion
              ? "justify-between"
              : "justify-center"
          }`}
        >
          <span
            className={`${
              !overwrite && newResult.aclaracion !== currentResult.aclaracion
                ? "font-bold"
                : ""
            }`}
          >
            {currentResult.aclaracion ? currentResult.aclaracion : "-"}
          </span>
          {newResult.aclaracion !== currentResult.aclaracion ? (
            <>
              <Image
                src="/images/newsArrow.svg"
                width={12}
                height={12}
                alt="arrow"
              />
              <span className={`${overwrite ? "font-bold" : ""}`}>
                {newResult.aclaracion ? newResult.aclaracion : "-"}
              </span>
            </>
          ) : (
            ""
          )}
        </div>
      </td>
      <td className="py-2 px-1">
        <div className="flex items-center justify-center">
          <Switch
            defaultChecked={overwrite}
            onChange={(e) => {
              overwriteResult(currentResult.id_participacion, e.target.checked);
            }}
          />
        </div>
      </td>
    </>
  );
};

interface OverwriteResultAction {
  type: "OVERWRITE_RESULT";
  payload: {
    id_participacion: number;
    value: boolean;
  };
}

interface SetResults2ModifyAction {
  type: "SET_RESULTS2_MODIFY";
  payload: [Result2Modify, Result2Modify, boolean][];
}

const result2ModifyReducer = (
  state: [Result2Modify, Result2Modify, boolean][],
  action: OverwriteResultAction | SetResults2ModifyAction
) => {
  switch (action.type) {
    case "OVERWRITE_RESULT":
      return state.map((result) => {
        if (result[0].id_participacion === action.payload.id_participacion) {
          return [result[0], result[1], action.payload.value] as [
            Result2Modify,
            Result2Modify,
            boolean
          ];
        }
        return result;
      });
    case "SET_RESULTS2_MODIFY":
      return action.payload;
    default:
      return state;
  }
};

const Results2Update = ({
  newResults,
  currentResults,
}: Results2UpdateProps) => {
  const cantidadDeProblemas = 3;
  const [results2Modify, dispatch] = useReducer(
    result2ModifyReducer,
    [] as [Result2Modify, Result2Modify, boolean][]
  );
  useEffect(() => {
    const results2Modify: [Result2Modify, Result2Modify, boolean][] = [];
    newResults.forEach((result) => {
      const currentResult = currentResults.find((r) => {
        return r.participante.dni === result.dni;
      });
      if (!currentResult) return;
      const oldResult = currentResult.resultados;
      if (oldResult) {
        const oldResultJSON = JSON.stringify(oldResult);
        const newResult = {
          puntaje: [...result.problems, result.total].map((r) =>
            r !== undefined ? r.toString() : ""
          ),
          aprobado: result.approved,
          presente: result.present,
          aclaracion: result.clarification ? result.clarification : null,
        };
        const newResultJSON = JSON.stringify(newResult);
        if (oldResultJSON === newResultJSON) return;
        results2Modify.push([
          {
            id_participacion: currentResult.id_participacion,
            puntaje: oldResult.puntaje,
            aprobado: oldResult.aprobado,
            presente: oldResult.presente,
            aclaracion: oldResult.aclaracion,
          },
          { ...newResult, id_participacion: currentResult.id_participacion },
          true,
        ]);
      }
    });
    dispatch({ type: "SET_RESULTS2_MODIFY", payload: results2Modify });
  }, [newResults, currentResults, dispatch]);
  return (
    <>
      <h3 className="font-unbounded text-3xl mt-8">RESULTADOS A MODIFICAR</h3>
      <p className="font-montserrat text-2xl">
        Los siguientes resultados van a ser modificados. Si no querés
        sobreescribirlos, desmarcá la casilla correspondiente.
      </p>
      <div className="overflow-x-scroll">
        <table className="font-montserrat border-collapse">
          <thead className="border-b-2 border-primary-black text-2xl font-bold">
            <tr>
              <th className="px-4 py-2">N</th>
              <th className="px-4 py-2">Nombre</th>
              <th className="px-4 py-2">Apellido</th>
              <th className="px-4 py-2">DNI</th>
              {Array.from({ length: cantidadDeProblemas }, (_, i) => {
                return (
                  <th key={i} className="px-4 py-2">
                    P{i + 1}
                  </th>
                );
              })}
              <th className="px-4 py-2">Total</th>
              <th className="px-4 py-2">Aprobado</th>
              <th className="px-4 py-2">Presente</th>
              <th className="px-4 py-2">Aclaración</th>
              <th className="px-4 py-2">Sobreescribir</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {results2Modify.map((result, i) => {
              return (
                <tr key={i} className="text-xl">
                  {displayResult({
                    result,
                    data: currentResults,
                    overwriteResult: (id_participacion, value) => {
                      dispatch({
                        type: "OVERWRITE_RESULT",
                        payload: { id_participacion, value },
                      });
                    },
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Results2Update;
