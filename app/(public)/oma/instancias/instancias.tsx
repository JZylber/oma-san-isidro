'use client'
import Layout from "../../../components/Layout/Layout"
import Instances from "../../../components/Instances/InstanceMenu";

const competition = "OMA";

interface OMAInstanceProps{
    instances : {instancia: string,fecha: Date}[];
} 

const OMAInstancePage = ({instances} : OMAInstanceProps) => {
    return(
        <Layout>
            <Instances competition={competition} instances={instances}/>
        </Layout>
        )
}

export default OMAInstancePage