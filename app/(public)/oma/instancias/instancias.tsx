'use client'
import Instances from "../../../../components/Instances/InstanceMenu";

const competition = "OMA";

interface OMAInstanceProps{
    instances : {instancia: string,fecha: Date}[];
} 

const OMAInstancePage = ({instances} : OMAInstanceProps) => {
    return(<Instances competition={competition} instances={instances}/>)
}

export default OMAInstancePage