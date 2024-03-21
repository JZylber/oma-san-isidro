'use client'
import { Inscripcion} from "../../../../components/Inscription/Inscription";
import { DropPoint } from "../../../../components/Instances/Venues";

const competition = "OMA"

interface InscriptionProps {
    fecha_inscripcion_nacional?: Date | null,
    fecha_inscripcion_regional?: Date | null,
    link_inscripcion?: string | null,
    authMaxDate?: Date | null,
    dropPoints?: DropPoint[] | null
  }

const OMAInscriptionPage = ({fecha_inscripcion_nacional,fecha_inscripcion_regional,link_inscripcion,authMaxDate,dropPoints}:InscriptionProps) => {
    const inscription_data = {
        link_inscripcion: link_inscripcion?link_inscripcion:undefined,
        fecha_inscripcion_nacional: fecha_inscripcion_nacional?fecha_inscripcion_nacional:undefined,
        fecha_inscripcion_regional: fecha_inscripcion_regional?fecha_inscripcion_regional:undefined
    }
    const authDate = authMaxDate?authMaxDate:undefined;
    const inscriptionDropPoints = dropPoints?dropPoints:undefined;
    return(<Inscripcion type={competition} data={inscription_data} authMaxDate={authDate} dropPoints={inscriptionDropPoints}/>)
}

export default OMAInscriptionPage