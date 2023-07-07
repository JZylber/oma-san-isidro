import { useState } from "react";
import { removeRepeatedSchools } from "../ResultsPage/ResultTable";
import { School } from "../ResultsPage/resultsTypes";
import Table from "../Table/Table";
import styles from "./Provincial.module.scss";
import { availableOptions, participantName, schoolName } from "./Venues";
import ProvincialParticipantCard from "./ProvincialCard";

interface ProvincialProps {
    competition: string,
    participants: ProvincialParticipant[];
};

export interface ProvincialParticipant {
    nombre: string,
    apellido: string,
    nivel: number,
    colegio: School
}

interface ProvincialParticipantFilters {
    nivel?: number,
    nombreApellido?: string,
    colegio?: School
}

const makeParticipantElement = (participant : ProvincialParticipant,index : number) => {
    return(
        <tr key={index}>
            <td>{participant.nivel}</td>
            <td>{participantName(participant.nombre,participant.apellido)}</td>
            <td>{schoolName(participant.colegio)}</td>
        </tr>)
}

const downloadParticipantData = (participant : ProvincialParticipant):Array<string> => {
    return([participant.nivel.toString(),participant.nombre,participant.apellido,schoolName(participant.colegio)])
}


const Provincial = ({competition, participants}: ProvincialProps) => {
    const [participantFilters,setParticipantFilters] = useState<ProvincialParticipantFilters>({});
    //Participants
    const participantIsFilterCompliant = (participant: ProvincialParticipant, filter: ProvincialParticipantFilters) => {
        const {nivel,nombreApellido,colegio} = filter;
        const isParticipant = ((nombreApellido)? nombreApellido === participantName(participant.nombre,participant.apellido): true);
        const isLevel = (nivel? participant.nivel === nivel : true);
        const isSchool = (colegio? (participant.colegio.nombre === colegio.nombre) && (colegio.sede?participant.colegio.sede === colegio.sede:true) : true);
        return isParticipant && isLevel && isSchool;
    }
    const filteredParticipants = participants.filter((element) => participantIsFilterCompliant(element,participantFilters));
    const p_availableSchools = filteredParticipants.map(participant => participant.colegio);
    let p_schools : Array<School> = removeRepeatedSchools(p_availableSchools);
    const p_genericSchools: Array<School> =removeRepeatedSchools(p_schools.filter((school) => school.sede).map((school) => {return({nombre: school.nombre})}));
    p_schools = p_schools.concat(p_genericSchools);
    const p_levels = Array.from(new Set(availableOptions(participants,"nivel",participantFilters,participantIsFilterCompliant).map(participant => participant.nivel)));
    const p_names = Array.from(new Set(filteredParticipants.map(participant => participantName(participant.nombre,participant.apellido))));
    const participant_headers = ["Nivel","Participante","Colegio"];
    const downloadParticipantHeaders = ["Nivel","Nombre","Apellido","Colegio"]
    return(
        participants.length > 0 ?
        <>
        <p className={styles.text}>La instancia provincial es <span className={styles.bold}>OPCIONAL</span>. Esto quiere decir que tanto participantes que hayan clasificado al provincial y no vayan, como participantes que hayan aprobado la instancia zonal pero no hayan clasificado al provincial pueden seguir participando en OMA en la instancia regional.</p>
        <p className={styles.text}>Los participantes que pueden participar de la provincial son aquellos que sumen 5 puntos entre las instancias Zonal e {competition === "OMA"?"Intercolegial":"Interescolar"}.</p>
        <h3 className={styles.subtitle}>Clasificados a Provincial</h3>
        <Table 
            values={filteredParticipants} 
            allValues={participants} 
            headers={participant_headers} 
            Card={ProvincialParticipantCard} 
            elements_per_page={50} 
            download={true}
            downloadHeaders={downloadParticipantHeaders}
            process_data={downloadParticipantData}
            make_element={makeParticipantElement}
            testInfo={`${competition == "OMA"?"OMA":"Nandú"} Provincial ${(new Date).getFullYear()}`}
        />
        </>:
        <p className={styles.text}>Proximamente...</p>
    )
}

export default Provincial