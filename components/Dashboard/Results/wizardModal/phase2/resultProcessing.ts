import { EditableResult } from "server/routers/dashboard";
import { NewResults, Result2Add, Result2Modify } from "../wizardModal";

const processResults = (
  newResults: NewResults[],
  currentResults: EditableResult[]
) => {
  const results2Modify: [Result2Modify, Result2Modify, boolean][] = [];
  const results2Add: Result2Add[] = [];
  newResults.forEach((result) => {
    const currentResult = currentResults.find((r) => {
      return r.participante.dni === result.dni;
    });
    if (!currentResult) {
      results2Add.push({
        dni: result.dni,
        puntaje: result.problems,
        aprobado: result.approved,
        presente: result.present,
        aclaracion: result.clarification ? result.clarification : null,
      });
      return;
    }
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
  return { results2Modify, results2Add };
};

export default processResults;
