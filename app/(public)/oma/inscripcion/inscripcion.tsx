'use client'
import { Inscripcion} from "../../../../components/Inscription/Inscription";

const competition = "OMA"

interface InscriptionProps {
    fecha_inscripcion_nacional?: Date | null,
    fecha_inscripcion_regional?: Date | null,
    link_inscripcion?: string | null
  }

const OMAInscriptionPage = ({fecha_inscripcion_nacional,fecha_inscripcion_regional,link_inscripcion}:InscriptionProps) => {
    const inscription_data = {
        link_inscripcion: link_inscripcion?link_inscripcion:undefined,
        fecha_inscripcion_nacional: fecha_inscripcion_nacional?fecha_inscripcion_nacional:undefined,
        fecha_inscripcion_regional: fecha_inscripcion_regional?fecha_inscripcion_regional:undefined
    }
    return(<Inscripcion type={competition} data={inscription_data}/>)
}

export default OMAInscriptionPage