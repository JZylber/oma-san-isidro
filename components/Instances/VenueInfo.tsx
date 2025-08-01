import { INSTANCIA } from "@prisma/client";
import { trpc } from "../../utils/trpc";
import Loader from "../Loader/Loader";
import Venues from "./Venues";
import { Participant, School } from "../../hooks/types";
import { Competition } from "../../server/app-router-db-calls";

const VenueInfo = ({
  competition,
  instance,
}: {
  competition: Competition;
  instance: INSTANCIA;
}) => {
  const venueData = trpc.instance.regionalInstance.useQuery({
    competition: competition,
    instance: instance,
  });
  if (venueData.isLoading) {
    return <Loader />;
  } else if (venueData.isSuccess) {
    const data = {
      ...venueData.data,
      venues: venueData.data.venues.map((venue) => {
        return {
          ...venue,
          colegio: new School(
            venue.colegio.nombre,
            venue.colegio.sede ? venue.colegio.sede : undefined
          ),
        };
      }),
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
          sede: participant.sede ? participant.sede : "",
          nivel: participant.nivel,
        };
      }),
      competition: competition,
      instance: instance,
    };
    return data.participants.length > 0 && data.venues.length > 0 ? (
      <Venues {...data} />
    ) : (
      <p className="font-montserrat text-5xl py-6">Proximamente...</p>
    );
  } else {
    return <div>Error</div>;
  }
};

export default VenueInfo;
