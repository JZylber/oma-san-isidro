'use client'
import Layout from "../../../components/Layout/Layout"
import Instances from "../../../components/Instances/InstanceMenu";

const competition = "ÑANDÚ";

interface NanduInstanceProps{
    instances : {instancia: string,fecha: Date}[];
} 

const NanduInst = ({instances} : NanduInstanceProps) => {
    return(
        <Layout>
            <Instances competition={competition} instances={instances}/>
        </Layout>
        )
}

export default NanduInst