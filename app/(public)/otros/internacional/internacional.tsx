"use client";
import dataOMA from "../../../../data/internacionalOMA.json";
import dataNandu from "../../../../data/internacionalNandu.json";

const orderByLevelAndSurname = (
  a: Array<string | boolean | number | null>,
  b: Array<string | boolean | number | null>,
) => {
  let a0 = a[0] as number;
  let b0 = b[0] as number;
  let a1 = a[1] as string;
  let b1 = b[1] as string;
  if (a0 !== b0) return a0 - b0;
  else return a1.localeCompare(b1);
};

const categoryTitleClasses = "font-unbounded font-medium max-tablet:text-[1.82rem] max-tablet:w-full tablet:self-center tablet:text-desktop-actionable";
const tournamentClasses = "flex items-start max-tablet:flex-col tablet:justify-between [&:not(:last-child)]:mb-[1.6rem]";
const tournamentNameClasses = "font-unbounded font-medium max-tablet:text-[1.4rem] max-tablet:w-full max-tablet:mb-[16px] tablet:min-w-[30%] tablet:w-[30%] tablet:text-desktop-reading tablet:after:content-[':']";
const tournamentRequirementsClasses = "font-montserrat font-normal max-tablet:text-[1.4rem] tablet:max-w-[67.5%] tablet:w-[67.5%] tablet:text-desktop-reading";
const tableContainerClasses = "border-2 border-primary-black rounded-[9px] block overflow-hidden mt-[1.6rem]";
const tableClasses = "border-collapse w-full [&_th:not(:last-child)]:border-r [&_th:not(:last-child)]:border-[#D3D3D3] [&_td:not(:last-child)]:border-r [&_td:not(:last-child)]:border-[#D3D3D3]";
const tableHeaderClasses = "font-unbounded font-medium max-tablet:text-[1.1rem] tablet:text-[2rem] [&_th]:py-[.4rem] [&_th]:px-[.8rem] [&_th]:bg-primary-light-blue [&_th]:border-b [&_th]:border-[#D3D3D3] [&_tr]:border-b [&_tr]:border-[#D3D3D3]";
const tableBodyClasses = "font-montserrat font-normal max-tablet:text-[1.1rem] tablet:text-[2rem] [&_td]:py-[.2rem] [&_td]:px-[.8rem] [&_td]:bg-primary-white [&_tr:not(:last-child)_td]:border-b [&_tr:not(:last-child)_td]:border-[#D3D3D3]";

const InternationalPage = () => {
  let sortedDataOma = dataOMA;
  sortedDataOma.sort(orderByLevelAndSurname);
  let sortedDataNandu = dataNandu;
  sortedDataNandu.sort(orderByLevelAndSurname);
  const renderOMAparticipant = (
    omaParticipant: Array<string | boolean | number | null>,
    idx: number,
  ) => {
    const [level, surname, name, t1, t2, t3, t4, may_level] = omaParticipant;
    return (
      <tr key={idx}>
        <td className="text-right">{level}</td>
        <td className="sticky left-0 z-[1]">{surname}</td>
        <td>{name}</td>
        <td>{t1 ? "Si" : ""}</td>
        <td>{t2 ? "Si" : ""}</td>
        <td>{t3 ? "Si" : ""}</td>
        <td>{t4 ? "Si" : ""}</td>
        <td>{may_level && may_level}</td>
      </tr>
    );
  };
  const renderNanduparticipant = (
    omaParticipant: Array<string | boolean | number>,
    idx: number,
  ) => {
    const [level, surname, name, may_level] = omaParticipant;
    return (
      <tr key={idx}>
        <td className="text-right">{level}</td>
        <td>{surname}</td>
        <td>{name}</td>
        <td className="text-right">{may_level}</td>
      </tr>
    );
  };

  return (
    <>
      <h1 className="font-unbounded font-semibold max-tablet:text-[3.6rem] max-tablet:[margin-top:8vmin] max-tablet:[margin-bottom:5vmin] tablet:text-[4.8rem] tablet:leading-[2.5]">Internacional</h1>
      <p className="mt-[2rem] font-montserrat font-light max-tablet:text-[1.4rem] tablet:max-desktop:text-tablet-reading desktop:text-[1.7rem]">
        {" "}
        Alumnos que pueden participar en las selecciones para olimpíadas
        internacionales 2026
      </p>
      <div className="border-2 border-primary-black rounded-[9px] box-border text-left mt-[1.6rem] mb-[1.6rem] py-[2.4rem] px-[1.6rem] tablet:max-desktop:mx-[10%] desktop:mx-[12.5%]">
        <h3 className="font-unbounded font-medium max-tablet:text-[1.82rem] max-tablet:w-full tablet:self-center tablet:text-desktop-actionable">Pretorneo de las Ciudades</h3>
        <p className="font-montserrat font-light max-tablet:text-[1.4rem] tablet:max-desktop:text-tablet-reading desktop:text-[1.7rem]">
          Participan los alumnos de OMA que en el 2025 llegaron por lo menos al
          Regional y los alumnos de 3° Nivel de Ñandú invitados por la OMA
        </p>
      </div>
      <div className="mb-[2.4rem] [&_ul]:list-none [&_ul]:mt-[2.4rem] [&_ul]:mb-[2.4rem]">
        <h2 className={categoryTitleClasses}>
          Alumnos que participaron en OMA en 2025
        </h2>
        <ul>
          <li className={tournamentClasses}>
            <h3 className={tournamentNameClasses}>Selección Cono Sur</h3>
            <p className={tournamentRequirementsClasses}>
              Haber llegado a la instancia Nacional de OMA y haber nacido
              después del 01/01/2010.{" "}
              {/*En el caso de nivel 1, se tiene que haber{" "}
              <strong>APROBADO</strong> la instancia Nacional*/}
              .
            </p>
          </li>
          <li className={tournamentClasses}>
            <h3 className={tournamentNameClasses}>Olimpíada de Mayo</h3>
            <p className={tournamentRequirementsClasses}>
              Haber aprobado la instancia Regional de OMA y haber nacido después
              del 01/01/2011. Nivel 1 nacidos a partir del 1/1/2013 y nivel 2
              nacidos entre 1/1/2011 y 31/12/2012.
            </p>
          </li>
          <li className={tournamentClasses}>
            <h3 className={tournamentNameClasses}>Selección IMO</h3>
            <p className={tournamentRequirementsClasses}>
              Haber aprobado la instancia Nacional de OMA, haber nacido después
              del 01/07/2006 y ser alumno regular de enseñanza media en el 2026.
            </p>
          </li>
          <li className={tournamentClasses}>
            <h3 className={tournamentNameClasses}>Selección Iberoamericana</h3>
            <p className={tournamentRequirementsClasses}>
              Haber aprobado la instancia Nacional de OMA, haber nacido después
              del 01/01/2008 y no haber participado en dos Olimpíadas
              Iberoamericanas anteriores.
            </p>
          </li>
          <li className={tournamentClasses}>
            <h3 className={tournamentNameClasses}>
              Olimpíada Iraní de Geometría
            </h3>
            <p className={tournamentRequirementsClasses}>
              Alumnos de OMA y Ñandú seleccionados por el Comité Olímpico.
            </p>
          </li>
          <li className={tournamentClasses}>
            <h3 className={tournamentNameClasses}>
              Olimpíada Iraní de Combinatoria
            </h3>
            <p className={tournamentRequirementsClasses}>
              Alumnos de OMA y Ñandú seleccionados por el Comité Olímpico.
            </p>
          </li>
          <li className={tournamentClasses}>
            <h3 className={tournamentNameClasses}>
              Olimpíada Panamericana Femenil de Matemática
            </h3>
            <p className={tournamentRequirementsClasses}>
              Alumnas que llegaron al Certamen Nacional de la OMA de 2025
              nacidas a partir del 01/01/2010.
            </p>
          </li>
          <li className={tournamentClasses}>
            <h3 className={tournamentNameClasses}>OlimPri</h3>
            <p className={tournamentRequirementsClasses}>
              Campeones y subcampeones de 1° y 2° Nivel de Ñandú 2026.
            </p>
          </li>
          <li className={tournamentClasses}>
            <h3 className={tournamentNameClasses}>
              Olimpíada Riopalatense de Matemática
            </h3>
            <p className={tournamentRequirementsClasses}>
              Participan campeones y subcampeones de Oma y 3er nivel de Ñandú de
              2026.
            </p>
          </li>
        </ul>
        <div className={tableContainerClasses}>
          <table className={tableClasses}>
            <thead className={tableHeaderClasses}>
              <tr>
                <th className="min-w-[7%]">Nivel (2025)</th>
                <th className="min-w-[20%] sticky left-0 z-[1]">
                  Apellido
                </th>
                <th className="min-w-[20%]">Nombre</th>
                <th className="min-w-[13.25%]">Aprobado</th>
                <th className="min-w-[13.25%]">Cono Sur</th>
                <th className="min-w-[13.25%]">IMO</th>
                <th className="min-w-[13.25%]">Ibero</th>
                <th className="min-w-[7%]">Nivel Mayo</th>
              </tr>
            </thead>
            <tbody className={tableBodyClasses}>
              {sortedDataOma.map(renderOMAparticipant)}
            </tbody>
          </table>
        </div>
      </div>
      <div className="mb-[2.4rem] [&_ul]:list-none [&_ul]:mt-[2.4rem] [&_ul]:mb-[2.4rem]">
        <h2 className={categoryTitleClasses}>
          Alumnos que participaron en Ñandú en 2025
        </h2>
        <p className="mt-[2rem] font-montserrat font-light max-tablet:text-[1.4rem] tablet:max-desktop:text-tablet-reading desktop:text-[1.7rem]">
          Pueden Participar en la Olimpíada de Mayo aquellos alumnos que
          aprobaron el Regional y nacieron después del 01/01/2011
        </p>
        <div className={`${tableContainerClasses} tablet:max-desktop:mx-[10%] desktop:mx-[12.5%]`}>
          <table className={tableClasses}>
            <thead className={tableHeaderClasses}>
              <tr>
                <th>Nivel</th>
                <th>Apellido</th>
                <th>Nombre</th>
                <th>Nivel Mayo</th>
              </tr>
            </thead>
            <tbody className={tableBodyClasses}>
              {sortedDataNandu.map(renderNanduparticipant)}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default InternationalPage;
