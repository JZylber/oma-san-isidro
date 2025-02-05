import { unknown } from "zod";

export interface ParticipantNotFound {
  level: string;
  name: string;
  lastName: string;
  dni: number;
}

const displayParticipant = (participant: ParticipantNotFound) => {
  const level = participant.level;
  const name = participant.name;
  const lastName = participant.lastName;
  const dni = participant.dni;
  return (
    <>
      <td className="py-2 px-1 text-center">{level}</td>
      <td className="py-2 px-1">{name}</td>
      <td className="py-2 px-1">{lastName}</td>
      <td className="py-2 px-1 text-right">{dni}</td>
    </>
  );
};

const ParticipantsNotFoundTable = ({
  missingResults,
  participantsNotFound,
}: {
  missingResults: ParticipantNotFound[];
  participantsNotFound: ParticipantNotFound[];
}) => {
  return (
    <div className="flex">
      {missingResults.length > 0 && (
        <div className="flex flex-col gap-y-4 basis-0 grow">
          <h3 className="font-unbounded text-3xl mt-8">
            PARTICIPANTES SIN RESULTADOS
          </h3>
          <p className="font-montserrat text-2xl">
            Los siguientes participantes no tienen resultados
          </p>
          <div className="overflow-x-scroll">
            <table className="font-montserrat border-collapse">
              <thead className="border-b-2 border-primary-black text-2xl font-bold">
                <tr>
                  <th className="px-4 py-2">N</th>
                  <th className="px-4 py-2">Nombre</th>
                  <th className="px-4 py-2">Apellido</th>
                  <th className="px-4 py-2">DNI</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {missingResults.map((result, i) => {
                  return (
                    <tr key={i} className="text-xl">
                      {displayParticipant(result)}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {participantsNotFound.length > 0 && (
        <div className="flex flex-col gap-y-4 basis-0 grow">
          <h3 className="font-unbounded text-3xl mt-8">
            PARTICIPANTES DESCONOCIDOS
          </h3>
          <p className="font-montserrat text-2xl">
            Los siguientes participantes no se encontraron dentro de los
            participantes habilitados para esta instancia
          </p>
          <div className="overflow-x-scroll">
            <table className="font-montserrat border-collapse">
              <thead className="border-b-2 border-primary-black text-2xl font-bold">
                <tr>
                  <th className="px-4 py-2">N</th>
                  <th className="px-4 py-2">Nombre</th>
                  <th className="px-4 py-2">Apellido</th>
                  <th className="px-4 py-2">DNI</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {participantsNotFound.map((result, i) => {
                  return (
                    <tr key={i} className="text-xl">
                      {displayParticipant(result)}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ParticipantsNotFoundTable;
