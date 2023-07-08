import { useState } from "react";
import { removeRepeatedSchools } from "../ResultsPage/ResultTable";
import { School } from "../ResultsPage/resultsTypes";
import Table from "../Table/Table";
import styles from "./Provincial.module.scss";
import { availableOptions, participantName, schoolName } from "./Venues";
import ProvincialParticipantCard from "./ProvincialCard";
import SelectResultCategory from "../ResultsPage/SelectResultCategory";
import Collapsable from "../Collapsable/Collapsable";
import Warning from "../Warning/Warning";

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
        <p className={styles.text}>Los alumnos que aprobaron el zonal pasan al regional participen o no del provincial.</p>
        <Collapsable title="Inscripción">
            <p className={styles.text}>Los colegios deberán comunicar antes del <span className={styles.bold}>4 de agosto</span> la nómina de personas que viajan, por correo electrónico a: <a href="mailto:elena@oma.org.ar">elena@oma.org.ar</a></p>
            <Warning>
                <p className={styles.text}>Recordamos a los colegios que son ellos los responsables de enviar la inscripción de sus alumnos, informando a los padres sobre el desarrollo de las actividades del Torneo, ya que los alumnos participan representando a la escuela.</p>
                <p className={styles.text}>La Secretaría Regional no puede atender a los padres, ni corresponde que lo haga.</p>
            </Warning>
        </Collapsable>
        <Collapsable title="Arancel y pago">
        </Collapsable>
        <Collapsable title="Programa">
        </Collapsable>
        <Collapsable title="Documentación">
        </Collapsable>
        <Collapsable title="Premiación">
        </Collapsable>
        <Collapsable title="Participantes Clasificados">
        <p className={styles.text}>Los participantes que clasifican a la instancia provincial son aquellos que sumen 5 puntos entre las instancias Zonal e {competition === "OMA"?"Intercolegial":"Interescolar"}.</p>
        <form className={styles.form}>
                <SelectResultCategory category="Participante" value={participantFilters.nombreApellido} setValue={(option?: string) => {setParticipantFilters({...participantFilters,nombreApellido: option})}} options={p_names} input={true}/>
                <SelectResultCategory category="Colegio" value={participantFilters.colegio} setValue={(option?: School) => {setParticipantFilters({...participantFilters,colegio: option})}} options={p_schools} input={true}/>
                <SelectResultCategory category="Nivel" value={participantFilters.nivel} setValue={(option? : number) => {setParticipantFilters({...participantFilters,nivel: option})}} options={p_levels} clear={true}/>
        </form>
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
        </Collapsable>
        <Collapsable title="Reglas">
        </Collapsable>
        </>:
        <p className={styles.text}>Proximamente...</p>
           
    )
}

export default Provincial