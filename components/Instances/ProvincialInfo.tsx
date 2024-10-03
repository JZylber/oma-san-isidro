import { INSTANCIA } from "@prisma/client";
import { trpc } from "../../utils/trpc";
import Loader from "../Loader/Loader";
import { Participant, School } from "../../hooks/types";
import Provincial from "./Provincial";

const ProvincialInfo = ({ competition }: { competition: string }) => {
  const instance = INSTANCIA.PROVINCIAL;
  const venueData = trpc.instance.provincialInstance.useQuery({
    competition: competition,
    instance: instance,
  });
  if (venueData.isLoading) {
    return <Loader />;
  } else if (venueData.isSuccess) {
    const data = {
      competition: competition,
      auth_max_date: venueData.data.auth_max_date,
      participants: venueData.data.participants.map((participant) => {
        return {
          participante: new Participant(
            participant.nombre,
            participant.apellido
          ),
          colegio: new School(
            participant.colegio.nombre,
            participant.colegio.sede ? participant.colegio.sede : undefined
          ),
          nivel: participant.nivel,
        };
      }),
    };
    return data.participants.length > 0 ? (
      <Provincial {...data} />
    ) : (
      <p className="font-montserrat text-5xl py-6">Proximamente...</p>
    );
  } else {
    return <div>Error</div>;
  }
};

export default ProvincialInfo;
