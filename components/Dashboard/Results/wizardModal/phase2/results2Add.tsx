import { EditableResult } from "server/routers/dashboard";
import { Result2Add } from "../wizardModal";

const displayResult = ({
  result,
  data,
}: {
  result: Result2Add;
  data: EditableResult[];
}) => {
  const participant = data.find(
    (d) => d.id_participacion === result.id_participacion
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
      {result.puntaje.map((p, i) => {
        return (
          <td key={i} className="py-2 px-2">
            <div className="flex items-center gap-px justify-center">
              <span>{p}</span>
            </div>
          </td>
        );
      })}
      <td className="py-2 px-1 text-center">
        {result.aprobado ? "Aprobado" : "Desaprobado"}
      </td>
      <td className="py-2 px-1 text-center">
        {result.presente ? "Presente" : "Ausente"}
      </td>
      <td className="py-2 px-1">{result.aclaracion}</td>
    </>
  );
};

const Results2AddTable = ({
  results,
  currentResults,
}: {
  results: Result2Add[];
  currentResults: EditableResult[];
}) => {
  const cantidadDeProblemas = 3;
  return (
    <>
      <h3 className="font-unbounded text-3xl mt-8">RESULTADOS A AGREGAR</h3>
      <p className="font-montserrat text-2xl">
        Los siguientes resultados van a ser agregados
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
            {results.map((result, i) => {
              return (
                <tr key={i} className="text-xl">
                  {displayResult({ result, data: currentResults })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Results2AddTable;
