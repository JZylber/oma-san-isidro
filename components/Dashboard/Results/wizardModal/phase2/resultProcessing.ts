import { EditableResult } from "server/routers/dashboard";
import { NewResults, Result2Add, Result2Modify } from "../wizardModal";
import { ParticipantNotFound } from "./participantsNotFound";

const processResults = (
  newResults: NewResults[],
  currentResults: EditableResult[]
) => {
  const results2Modify: [Result2Modify, Result2Modify, boolean][] = [];
  const results2Add: Result2Add[] = [];
  const unknownParticipants: Array<ParticipantNotFound> = [];
  const missingResults: Array<ParticipantNotFound> = [];
  newResults.forEach((result) => {
    const currentResult = currentResults.find((r) => {
      return r.participante.dni === result.dni;
    });
    if (!currentResult) {
      unknownParticipants.push({
        level: result.level ? result.level : "Sin especificar",
        name: result.name ? result.name : "Sin especificar",
        lastName: result.lastName ? result.lastName : "Sin especificar",
        dni: result.dni,
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
    if (!oldResult) {
      results2Add.push({
        dni: result.dni,
        puntaje: [...result.problems, result.total].map((r) =>
          r !== undefined ? r.toString() : ""
        ),
        aprobado: result.approved,
        presente: result.present,
        aclaracion: result.clarification ? result.clarification : null,
      });
    }
  });
  currentResults.forEach((result) => {
    console.log("result:", result);
    const newResult = newResults.find((r) => r.dni === result.participante.dni);
    if (!(newResult || result.resultados)) {
      missingResults.push({
        level: result.nivel.toString(),
        name: result.participante.nombre,
        lastName: result.participante.apellido,
        dni: result.participante.dni,
      });
    }
  });
  return { results2Modify, results2Add, unknownParticipants, missingResults };
};

export default processResults;
