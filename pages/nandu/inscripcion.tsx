import { NextPage } from "next";
import Head from "next/head";
import { Inscripcion, InscriptionData } from "../../components/Inscription/Inscription";
import Layout from "../../components/Layout/Layout";
import { getInscriptionData } from "../../lib/aux_db_calls";
import { getDateFromJSON } from "../../lib/aux_functions";

const competition = "ÑANDÚ"

export const getStaticProps = async () => {
    const year = (new Date()).getFullYear();
    const data = await getInscriptionData(competition,year)
    return {
        props: JSON.parse(JSON.stringify(data.results)),
    };
};

interface InscriptionProps {
    fecha_inscripcion_nacional?: string,
    fecha_inscripcion_regional?: string,
    link_inscripcion?: string
  }

const NanduInscription : NextPage<InscriptionProps> = ({fecha_inscripcion_nacional,fecha_inscripcion_regional,link_inscripcion}) => {
    const inscription_data = {
        link_inscripcion: link_inscripcion,
        fecha_inscripcion_nacional: fecha_inscripcion_nacional?getDateFromJSON(fecha_inscripcion_nacional):undefined,
        fecha_inscripcion_regional: fecha_inscripcion_regional?getDateFromJSON(fecha_inscripcion_regional):undefined
    }
    return(
        <>
        <Head>
            <title>Inscripción Ñandú</title>
            <meta   name="description"
                content="Información de como inscribirse para participar de Ñandú"></meta>
        </Head>
        <Layout>
            <Inscripcion type={competition} data={inscription_data}/>
        </Layout>
        </>
        )
}

export default NanduInscription