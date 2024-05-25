import { Metadata } from "next"
import { getAuthMaxDate, getInscriptionData } from "../../../../server/app-router-db-calls";
import NanduInscriptionPage from "./inscripcion";
import { getInstanceDropPoints } from "../../../../server/routers/instances";
import { DropPoint } from "../../../../components/Instances/Venues";

export const metadata : Metadata = {
    title: 'Inscripción Ñandú',
    description: 'Información de como inscribirse para participar de Ñandú',
}

const competition = "ÑANDÚ";
const firstInstance = "INTERESCOLAR";

export default async function NanduInscription() {
    const year = (new Date()).getFullYear();
    const data = await getInscriptionData(competition,year);
    const authMaxDate = (await getAuthMaxDate(competition,year,firstInstance))?.fecha_limite_autorizacion;
    const dropPoints = await getInstanceDropPoints(competition,year,firstInstance) as DropPoint[];
    const props = {...data,authMaxDate,dropPoints};
    return <NanduInscriptionPage {...props}/>
}