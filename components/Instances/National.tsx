import Table from "../Table/Table";
import styles from "./Provincial.module.scss";
import ProvincialParticipantCard from "./ProvincialCard";
import SelectResultCategory from "../ResultsPage/SelectResultCategory";
import Collapsable from "../Collapsable/Collapsable";
import Warning from "../Warning/Warning";
import { Button } from "../buttons/Button";
import Image from "next/image";
import useFilter from "../../hooks/useFilter";
import { Filterables, Participant, School } from "../../hooks/types";
import { INSTANCIA } from "@prisma/client";
import { trpc } from "../../utils/trpc";
import Loader from "../Loader/Loader";

interface NationalProps {
    competition: string,
    participants: NationalParticipant[];
    auth_max_date?: Date;
};

export interface NationalParticipant extends Record<string,Filterables> {
    participante: Participant,
    nivel: number,
    colegio: School
}

const makeParticipantElement = (participant : NationalParticipant,index : number) => {
    return(
        <tr key={index}>
            <td>{participant.nivel}</td>
            <td>{participant.participante.toString()}</td>
            <td>{participant.colegio.toString()}</td>
        </tr>)
}

const downloadParticipantData = (participant : NationalParticipant):Array<string> => {
    return([participant.nivel.toString(),participant.participante.name,participant.participante.surname,participant.colegio.toString()])
}

const months = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];

const downloadFile = (filename: string) => {
    const link = document.createElement("a");
    link.href = `/files/${filename}`;
    link.target = `_blank`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };



const NationalInfo = ({competition, participants,auth_max_date}: NationalProps) => {
    //Participants
    const [state,update,filteredValues,options] = useFilter(participants);
    const participant_headers = ["Nivel","Participante","Colegio"];
    const downloadParticipantHeaders = ["Nivel","Nombre","Apellido","Colegio"]
    const isOma = competition === "OMA";
    return(
        (participants.length > 0 && auth_max_date) ?
        <>
        {!isOma && <p className={styles.text}>Los alumnos que aprobaron el zonal pasan al regional participen o no del provincial.</p>}
        <Collapsable title="Inscripción">
            <p className={styles.text}>Los colegios deberán comunicar antes del <span className={styles.bold}>{`${auth_max_date.getUTCDate()} de ${months[auth_max_date.getUTCMonth()]}`}</span> la nómina de personas que viajan, por correo electrónico a: <a href="mailto:elena@oma.org.ar">elena@oma.org.ar</a></p>
            <h4 className={styles.section_title}>Datos que deben enviar para la inscripción:</h4>
            <ul className={`${styles.text} ${styles.list}`}>
                <li>Nombre y apellido de los alumnos que participan.</li>
                <li>Nombre, apellido y número de documento del o los acompañantes, indicando si es docente o familiar.</li>
                <li>Indicar si se hospedan por medio de la olimpíada o por su cuenta.</li>
                <li>En caso de solicitar sólo tarjeta para la premiación, indicar nombre y apellido y número de documento de la persona para la cual se solicita.</li>
            </ul>
            <Warning>
                <p className={styles.text}>Recordamos a los colegios que son ellos los responsables de enviar la inscripción de sus alumnos, informando a los padres sobre el desarrollo de las actividades del Torneo, ya que los alumnos participan representando a la escuela.</p>
                <p className={styles.text}>La Secretaría Regional no puede atender a los padres, ni corresponde que lo haga.</p>
            </Warning>
        </Collapsable>
        <Collapsable title="Información general y programa">
            <p className={styles.text}>El encuentro de la <span className={styles.bold}>Olimpíada Nacional {isOma?"Oma":"Ñandú"}</span> se realizará en la ciudad de La Falda, Córdoba los días {isOma?"27, 28 y 29 de septiembre":"24 al 27 de octubre en hotel FATSA (Otto A. Calace. Güemes 198 - (03548)422123)"}. Cada delegación se trasladará por su cuenta y riesgo, con sus profesores acompañantes según las pautas establecidas <span className={styles.bold}>(máximo 8 alumnos por cada docente)</span>. También, como en años anteriores, nos ocuparemos del alojamiento y concentración de aquellas delegaciones que lo soliciten.</p>
            <p className={styles.text}>El alojamiento de las delegaciones que lo soliciten será en el Hotel FATSA de la mencionada ciudad en habitaciones compartidas con otros participantes del encuentro, hasta completar su capacidad, luego serán derivados a otros hoteles de la ciudad. La reserva del alojamiento se hace contra entrega de las planillas debidamente cumplimentadas.</p>
            <h4 className={styles.section_title}>Programa</h4>
            <ul className={`${styles.text} ${styles.list}`}>
                <li><span className={styles.bold}>Acreditación:</span> {isOma?"Miércoles 27 de septiembre":"Martes 24 de octubre"} de 15:00 a 20:00 horas en el <span className={styles.bold}>Hotel FATSA</span></li>
                <li><span className={styles.bold}>Prueba escrita:</span> {isOma?"Jueves 28 de septiembre a las 9:00 horas, Polideportivo Municipal Villa Gesell":<>Miércoles 25 y Jueves 26 de octubre a las 9:30 horas, en el microestadio del <span className={styles.bold}>Hotel FATSA</span></>}</li>
                <li><span className={styles.bold}>Exposición Oral y Premiación:</span> {isOma?"Viernes 29 de septiembre a las 9:00 horas, Polideportivo Municipal Villa Gesell ":<>Viernes 27 de octubre a de 9:00 a 12:00 horas en el microestadio del <span className={styles.bold}>Hotel FATSA</span></>}</li>
            </ul>
        </Collapsable>
        <Collapsable title="Aranceles">
        <ul className={`${styles.text} ${styles.list}`}>
            <li><span className={styles.bold}>Participantes y/o acompañantes que se alojen en el hotel propuesto por la olimpíada:</span> {isOma?"$85.000":"$97.000"}. Incluye desde la cena del día martes {isOma?27:24} al almuerzo del viernes {isOma?29:27} (incluye una bebida por comida).</li>
            <li><span className={styles.bold}>Participantes que NO se alojen en el hotel propuesto por la olimpíada:</span> {isOma?"$29.000":"$37.000"}. <span className={styles.bold}>Incluye los almuerzos y meriendas de los días de las pruebas escritas (miércoles 25 y jueves 26).</span></li>
            <li><span className={styles.bold}>Acompañantes que NO se alojen en el hotel propuesto por la olimpíada:</span> {isOma?"$23.000":"$30.000"}. <span className={styles.bold}>Incluye los almuerzos y meriendas de los días de las pruebas escritas (miércoles 25 y jueves 26).</span> </li>
            <li><span className={styles.bold}>Tarjeta de premiación:</span> $4.000. Solo es necesaria la tarjeta para aquellos que no están acreditados como acompañantes y que participarán únicamente de la premiación. Deben inscribirse junto con los otros participantes en la planilla.</li>
        </ul>
        <Warning>
            <p className={styles.text}>Los aranceles antes mencionados, pueden ser ajustados debido a la situación económica financiera del país, que puede hacer variar nuestros costos. Quienes quieran asegurarse estos aranceles pueden hacer su depósito o trasferencia en los próximos días, enviando el comprobante a {isOma?<a href="mailto:gloriasampablo@gmail.com">gloriasampablo@gmail.com</a>:<a href="mailto:elena@oma.org.ar">elena@oma.org.ar</a>}. En caso de tener que variar los aranceles lo avisaremos oportunamente.</p>
        </Warning>
        </Collapsable>
        <Collapsable title="Pago">
            <p className={styles.text}>El pago se hace depositando o transfieriendo a la siguiente cuenta de la Fundación Olimpíada Matemática Argentina:</p>
            <ul className={`${styles.text} ${styles.list}`}>
                <li><span className={styles.bold}>BANCO HSBC</span> (Cuenta Corriente) Sucursal Los Arcos (ex Salguero).</li>
                <li><span className={styles.bold}>N° Cuenta: </span>6093228419</li>
                <li><span className={styles.bold}>CBU: </span>1500609900060932284196</li>
                <li><span className={styles.bold}>ALIAS: </span>FOMAHSBCCC</li>
                <li><span className={styles.bold}>CUIT: </span>30-67928383-5</li>
            </ul>
            <p className={styles.text}>Recordamos que para la acreditación deben presentar el <span className={styles.bold}>ORIGINAL</span> de dicho depósito.</p>
            <p className={styles.text}>Si necesitan factura electrónica o factura C, por favor completar la planilla y enviar a {isOma?<a href="mailto:gloriasampablo@gmail.com">gloriasampablo@gmail.com</a>:<a href="mailto:elena@oma.org.ar">elena@oma.org.ar</a>} junto con el comprobante de pago.</p>
            <div className={styles.documentation}>
                <div className={styles.button}>
                    <Button content="Planilla Facturación" onClick={() => downloadFile(`/provincial/${isOma?"oma":"nandu"}/PedidoFactura.xlsx`)}>
                        <div className={styles.arrow}>
                            <Image src="/images/newsArrow.svg" width={30} height={40} alt="Descargar"/>
                        </div>
                    </Button>
                </div>
            </div>
            <Warning>
            <p className={styles.text}>En el hotel contratado, luego de confirmar el 18 de octubre las plazas reservadas, deberán abonarse aunque no se ocupen.</p>
            </Warning>
        </Collapsable>
        <Collapsable title="Documentación">
            <p className={styles.text}>La documentación exigida incluye:</p>
            <ul className={`${styles.text} ${styles.list}`}>
                <li>AUTORIZACIÓN de cada alumno (se utilizará la autorización que se descarga debajo)</li>
                <li>DOCUMENTO original de cada alumno.</li>
                <li>COMPROMISO de cada acompañante DOCENTE, PADRE, TUTOR (se utilizará el compromiso que se descarga debajo)</li>
            </ul>
            <p className={styles.text}>La documentación debe ser entregada en la acreditación.</p>
            <div className={styles.documentation}>
                <div className={styles.button}>
                    <Button content="Autorización" onClick={() => downloadFile(`/provincial/${isOma?"oma":"nandu"}/Autorización.docx`)}>
                        <div className={styles.arrow}>
                            <Image src="/images/newsArrow.svg" width={30} height={40} alt="Descargar"/>
                        </div>
                    </Button>
                </div>
                <div className={styles.button}>
                    <Button content="Compromiso" onClick={() => downloadFile(`/provincial/${isOma?"oma":"nandu"}/Compromiso.docx`)}>
                        <div className={styles.arrow}>
                            <Image src="/images/newsArrow.svg" width={30} height={40} alt="Descargar"/>
                        </div>
                    </Button>
                </div>
            </div>
        </Collapsable>
        <Collapsable title="Premiación">
            <p className={styles.text}>Para evitar inconvenientes y malos entendidos, podrán participar en el acto de premiación solo las personas debidamente acreditadas portando credencial o “tarjeta de invitación individual”. Se aclara que, indefectiblemente, todas aquellas personas que deseen adquirir las tarjetas de invitación individual para el Acto de premiación deben estar inscriptas con nombre, apellido y documento en la planilla.</p> 
            <p className={styles.text}> Costo de la tarjeta $4000.- CUPOS LIMITADOS (menores de 3 años no pagan)  </p>
        </Collapsable>
        <Collapsable title="Participantes Clasificados">
        <p className={styles.text}>Los participantes que clasifican a la instancia nacional son aquellos que hayan aprobado la instancia regional.</p>
        <form className={styles.form}>
            <SelectResultCategory category="Participante" value={state.participante} setValue={(option? : Participant) =>update({participante:option})} options={options["participante"]} input={true}/>
            <SelectResultCategory category="Colegio" value={state.colegio} setValue={(option? : School) =>update({colegio:option})} options={options["colegio"]} input={true}/>
            <SelectResultCategory category="Nivel" value={state.nivel} setValue={(option? : number) =>update({nivel:option})} options={options["nivel"]} clear={true}/>
        </form>
        <Table 
            values={filteredValues} 
            allValues={participants} 
            headers={participant_headers} 
            Card={ProvincialParticipantCard} 
            elements_per_page={20} 
            download={true}
            downloadHeaders={downloadParticipantHeaders}
            process_data={downloadParticipantData}
            make_element={makeParticipantElement}
            testInfo={`${competition == "OMA"?"OMA":"Ñandú"} Provincial ${(new Date).getFullYear()}`}
        />
        </Collapsable>
        <Collapsable title="Reglamento">
            <ul className={`${styles.text} ${styles.list}`}>
                <li>Toda otra persona (padre, tutor, etc.) que desee integrar la delegación debe comprometerse a cumplir todas las normas establecidas para la delegación.</li>
                <li>Solo podrá asistir a las actividades programadas dentro de los espacios establecidos (esto incluye el ingresar, permanecer y circular por el mismo) quien se acredite debidamente el día {isOma?"27 de septiembre":"24 de octubre"}.</li>
                <li>Se recuerda a los responsables de las delegaciones, se alojen o no en el hotel propuesto por la olimpíada, que durante todo el tiempo estarán a cargo de los alumnos y deberán participar de las actividades programadas con sus alumnos</li>
                <li>Bajo ningún concepto los participantes podrán circular o permanecer fuera de su lugar de alojamiento después de las 00:00 hs</li>
                <li>Todos deberán abstenerse de: transportar, ingerir o consumir alcohol, bebidas energizantes u otros estimulantes, fumar en los lugares cerrados, como habitaciones, el comedor, o donde se desarrollen las actividades de la competencia</li>
            </ul>
            <p className={styles.text}>Ante cualquier irregularidad o muestra de inconducta las personas involucradas serán sancionadas debiendo regresar de inmediato a su lugar de origen.</p>
        </Collapsable>
        </>
        :
        <p className={styles.text}>Proximamente...</p>
           
    )
}

const National = ({competition}:{competition: string}) => {
    const instance = INSTANCIA.NACIONAL;
    const venueData = trpc.instance.nationalInstance.useQuery({competition: competition,instance: instance});
    if(venueData.isLoading){
        return <Loader/>
    } else if(venueData.isSuccess){
        const data = {
            competition: competition,
            auth_max_date: venueData.data.auth_max_date,
            participants: venueData.data.participants.map((participant) => {
                return {
                    participante: new Participant(participant.nombre,participant.apellido),
                    colegio: new School(participant.colegio.nombre,participant.colegio.sede?participant.colegio.sede:undefined),
                    nivel: participant.nivel,
                }

            }),
        }
        return <NationalInfo 
            {...data}/>
    }
    else{
        return <div>Error</div>
    }
};

export default National