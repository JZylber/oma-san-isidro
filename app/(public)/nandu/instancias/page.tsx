import { Metadata } from "next"
import { getAuthMaxDate, getInstances } from "../../../../server/app-router-db-calls";
import NanduInstancePage from "./instancias";
import { getInstanceDropPoints } from "../../../../server/routers/instances";
import { get } from "http";

export const metadata : Metadata = {
    title: 'Instancias Ñandú',
    description: 'Sedes de instancias Ñandú y puntos de entrega de autorizaciones',
}

const competition = "ÑANDÚ";

export default async function NanduInstances() {
    const year = (new Date()).getFullYear();
    const instances =  await getInstances(competition,year);
    const firstInstance = competition === "ÑANDÚ"?"INTERESCOLAR":"INTERCOLEGIAL";
    const authMaxDate = getAuthMaxDate(competition,year,firstInstance);
    const dropPoints = await getInstanceDropPoints(competition,year,firstInstance);
    return <NanduInstancePage instances={instances}/>
}