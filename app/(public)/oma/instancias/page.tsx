import { Metadata } from "next"
import { getInstances } from "../../../../lib/app-router-db-calls";
import OMAInstancePage from "./instancias";

export const metadata : Metadata = {
    title: 'Instancias OMA',
    description: 'Sedes de instancias OMA y puntos de entrega de autorizaciones',
}

const competition = "OMA";

export default async function OMAInstances() {
    const year = (new Date()).getFullYear();
    const instances =  await getInstances(competition,year);
    return <OMAInstancePage instances={instances}/>
}