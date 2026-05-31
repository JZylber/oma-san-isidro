import { Result, TestInfo, TestQueryResults } from "./resultsTypes";
import ErrorMessage from "./ErrorMessage";
import ResultFilterForm from "./resultFilterForm";
import { Participant, Problem, Problems, School } from "../../hooks/types";
import useFilter from "../../hooks/useFilter";
import Table from "../Table/Table";
import ResultCard from "./Mobile/ResultCard";
import Warning from "../Warning/Warning";
import React from "react";

const containerClasses = "border-t-2 border-black/50 max-tablet:mt-[3.2rem] max-tablet:pt-[4rem] max-tablet:mb-[5.2rem] tablet:mt-[3rem] tablet:pt-[4rem] tablet:mb-[7.2rem]";
const revisionClasses = "!mb-[2rem]";
const textClasses = "font-montserrat font-medium text-[1.6rem]";
const boldClasses = "font-bold";
const centerAlignClasses = "text-center";
const disclaimerClasses = "pt-[2.4rem] font-montserrat font-medium text-[1.6rem]";

const make_element = (result: Result, index: number) => {
  const participant = result.participante.toString();
  const school = result.colegio.toString();
  const level = result.nivel;
  const points = result.resultados.problems;
  const total = result.resultados.total;
  const passed = result.aprobado;
  const present = result.presente;
  const clarification = result.aclaracion;
  const hasPoints = present && !clarification;
  return (
    <tr key={index}>
      <td>{participant}</td>
      <td className={centerAlignClasses}>{level}</td>
      <td>{school}</td>
      {result.cantidad_problemas > 0 &&
        (hasPoints ? (
          <>
            {points.map((point, index) => (
              <td key={index} className={centerAlignClasses}>
                {point.toString()}
              </td>
            ))}
            <td className={centerAlignClasses}>{total}</td>
          </>
        ) : (
          <td
            colSpan={result.cantidad_problemas + 1}
            className={centerAlignClasses}
          >
            {clarification ? clarification : present ? "" : "Ausente"}
          </td>
        ))}
      <td className={centerAlignClasses}>{passed ? "Si" : "No"}</td>
    </tr>
  );
};

const make_download_element = (result: Result) => {
  const name = result.participante.name;
  const surname = result.participante.surname;
  const school = result.colegio.toString();
  const level = result.nivel.toString();
  const points = result.resultados.problems;
  const total = result.resultados.total.toString();
  const passed = result.aprobado;
  const present = result.presente;
  const clarification = result.aclaracion;
  const hasPoints = present && !clarification;
  return [level, name, surname, school].concat(
    hasPoints
      ? points.map((point) => point.toString())
      : Array.from({ length: result.cantidad_problemas }, () => "-"),
    [
      total,
      passed
        ? "Si"
        : !present
        ? "Ausente"
        : clarification
        ? clarification
        : "No",
    ]
  );
};

const ResultTable = ({
  results,
  testInfo,
}: {
  results: Array<TestQueryResults>;
  testInfo: TestInfo;
}) => {
  const { competencia, año, instancia } = testInfo;
  const strTestInfo = `${competencia} ${testInfo.instancia.slice(
    0,
    1
  )}${instancia.slice(1).toLocaleLowerCase()} ${año}`;
  const filterableResults: Array<Result> = results.map((result) => {
    return {
      cantidad_problemas: result.prueba.cantidad_problemas,
      presente: result.presente,
      aclaracion: result.aclaracion ? result.aclaracion : "",
      aprobado: result.aprobado,
      resultados: new Problems(
        result.resultados.slice(0, -1).map((res) => {
          const cleanValue = res.replace(/-/g, "");
          const minusCount = (res.match(/-/g) || []).length;
          const numericValue = cleanValue === "1/2" ? 0.5 : Number(cleanValue);
          return new Problem(numericValue, minusCount);
        }),
        Number(result.resultados.slice(-1))
      ),
      nivel: result.participacion.nivel,
      colegio: new School(
        result.participacion.colegio.nombre,
        result.participacion.colegio.sede
      ),
      participante: new Participant(
        result.participacion.participante.nombre,
        result.participacion.participante.apellido
      ),
    };
  });
  const problem_amount = filterableResults[0].cantidad_problemas;

  let headers = ["Participante", "Nivel", "Colegio"].concat(
    Array.from({ length: problem_amount }, (value, index) => `P${index + 1}`),
    ["Total", "Aprobado"]
  );

  const downloadHeaders = ["Nivel", "Nombre", "Apellido", "Colegio"].concat(
    Array.from({ length: problem_amount }, (value, index) => `P${index + 1}`),
    ["Total", "Aprobado"]
  );
  //FILTERING
  const [resultFilter, updateFilter, filtered_results, options] =
    useFilter(filterableResults);

  return (
    <div className={containerClasses}>
      {instancia === "REGIONAL" &&
        competencia === "ÑANDÚ" &&
        testInfo.año === new Date().getUTCFullYear() && (
          <Warning title="Criterio de Aprobación" className={revisionClasses}>
            <p className={textClasses}>
              Aprueban la instancia regional y clasifican a nacional:
            </p>
            <ul>
              <li className={textClasses}>
                Si son de <strong>Nivel 1</strong>, aquellos participantes que
                obtuvieron <strong>1 y 1/2 o más puntos</strong> (con todos los
                menos)
              </li>
              <li className={textClasses}>
                Si son de <strong>Nivel 2 o 3</strong>, aquellos participantes
                que obtuvieron <strong>2 o más puntos</strong> (con todos los
                menos)
              </li>
            </ul>
          </Warning>
        )}
      {instancia === "REGIONAL" &&
        competencia === "OMA" &&
        testInfo.año === 2024 && (
          <Warning title="Pedidos de Revisión" className={revisionClasses}>
            <p className={textClasses}>
              Para hacer un pedido de revisión completar el siguiente formulario{" "}
              <span className={boldClasses}>antes del 25/10</span>:{" "}
              <a href="https://forms.gle/m4TnmuA2fWEkDyvTA">
                https://forms.gle/m4TnmuA2fWEkDyvTA
              </a>
            </p>
          </Warning>
        )}
      <ResultFilterForm
        filters={resultFilter}
        updateFilter={updateFilter}
        schools={options.colegio}
        names={options.participante}
        levels={options.nivel}
        passed={options.aprobado}
      />
      {filtered_results.length > 0 ? (
        <Table
          values={filtered_results as Result[]}
          allValues={filterableResults}
          headers={headers}
          Card={ResultCard}
          elements_per_page={50}
          download={true}
          downloadHeaders={downloadHeaders}
          process_data={make_download_element}
          make_element={make_element}
          testInfo={strTestInfo}
          center_columns={[1]}
        />
      ) : (
        <ErrorMessage status={400} />
      )}
      <p className={disclaimerClasses}>
        Si hay algún error en el nombre/apellido/nivel de algún participante, o
        algún error en el nombre de algún colegio, por favor mandar un mail a:{" "}
        <a href="mailto:omasanisidro.devs@gmail.com">
          omasanisidro.devs@gmail.com
        </a>
      </p>
    </div>
  );
};

export default ResultTable;
