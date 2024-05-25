import { Metadata } from "next"
import {getInstances } from "../../../../server/app-router-db-calls";
import NanduInstancePage from "./instancias";

export const metadata : Metadata = {
    title: 'Instancias Ñandú',
    description: 'Sedes de instancias Ñandú y puntos de entrega de autorizaciones',
}

const competition = "ÑANDÚ";

export default async function NanduInstances() {
    const year = (new Date()).getFullYear();
    const instances =  await getInstances(competition,year);
    return <NanduInstancePage instances={instances}/>
}