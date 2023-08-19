import { Metadata } from "next"
import { getInscriptionData } from "../../../../server/app-router-db-calls";
import OMAInscriptionPage from "./inscripcion";

export const metadata : Metadata = {
    title: 'Inscripción OMA',
    description: 'Información de como inscribirse para participar de OMA',
}

const competition = "OMA"

export default async function OMAInscription() {
    const year = (new Date()).getFullYear();
    const data = await getInscriptionData(competition,year)
    return <OMAInscriptionPage {...data}/>

}