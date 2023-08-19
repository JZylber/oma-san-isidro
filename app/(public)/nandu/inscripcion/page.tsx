import { Metadata } from "next"
import { getInscriptionData } from "../../../../server/app-router-db-calls";
import NanduInscriptionPage from "./inscripcion";

export const metadata : Metadata = {
    title: 'Inscripción Ñandú',
    description: 'Información de como inscribirse para participar de Ñandú',
}

const competition = "ÑANDÚ"

export default async function NanduInscription() {
    const year = (new Date()).getFullYear();
    const data = await getInscriptionData(competition,year)
    return <NanduInscriptionPage {...data}/>

}