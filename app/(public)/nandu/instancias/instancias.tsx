'use client'
import Instances from "../../../../components/Instances/InstanceMenu";

const competition = "ÑANDÚ";

interface NanduInstanceProps{
    instances : {instancia: string,fecha: Date}[];
} 

const NanduInstancePage = ({instances} : NanduInstanceProps) => {
    return(<Instances competition={competition} instances={instances}/>)
}

export default NanduInstancePage