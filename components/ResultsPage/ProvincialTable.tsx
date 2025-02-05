import { TestInfo, TestQueryResults } from "./resultsTypes";
import styles from "./ResultTable.module.scss";
import ErrorMessage from "./ErrorMessage";
import { FilterObject, Participant, School } from "../../hooks/types";
import useFilter from "../../hooks/useFilter";
import Table from "../Table/Table";
import SelectResultCategory from "./SelectResultCategory";
import ProvincialResultCard from "./Mobile/ProvincialCard";
import NationalResultCard from "./Mobile/NationalCard";

export interface ProvincialResult extends FilterObject {
  participante: Participant;
  colegio: School;
  nivel: number;
  resultado: string;
  aprobado: boolean;
}

const resultHierarchy = [
  "Campeón",
  "Primer Subcampeón",
  "Segundo Subcampeón",
  "Mención Especial",
  "Mención",
];

const ProvincialResultTable = ({
  results,
  testInfo,
  passed,
}: {
  results: Array<TestQueryResults>;
  testInfo: TestInfo;
  passed?: boolean;
}) => {
  const { competencia, año, instancia } = testInfo;
  const strTestInfo = `${competencia} ${testInfo.instancia.slice(
    0,
    1
  )}${instancia.slice(1).toLocaleLowerCase()} ${año}`;
  const filterableResults: Array<ProvincialResult> = results
    .map((result) => {
      return {
        resultado: result.resultados[0],
        nivel: result.participacion.nivel,
        colegio: new School(
          result.participacion.colegio.nombre,
          result.participacion.colegio.sede
        ),
        participante: new Participant(
          result.participacion.participante.nombre,
          result.participacion.participante.apellido
        ),
        aprobado: result.aprobado,
      };
    })
    .sort((a, b) => {
      if (a.nivel === b.nivel) {
        if (a.resultado === b.resultado) {
          return a.participante.surname.localeCompare(b.participante.surname);
        } else {
          return (
            resultHierarchy.indexOf(a.resultado) -
            resultHierarchy.indexOf(b.resultado)
          );
        }
      } else {
        return a.nivel - b.nivel;
      }
    });
  const make_element = (result: ProvincialResult, index: number) => {
    const participant = result.participante.toString();
    const school = result.colegio.toString();
    const level = result.nivel;
    const price = result.resultado;
    return (
      <tr key={index}>
        <td>{participant}</td>
        <td className={styles.center_align}>{level}</td>
        <td>{school}</td>
        <td>{price}</td>
        {passed ? (
          <td className={styles.center_align}>
            {result.aprobado ? "Sí" : "No"}
          </td>
        ) : null}
      </tr>
    );
  };

  const make_download_element = (result: ProvincialResult) => {
    const name = result.participante.name;
    const surname = result.participante.surname;
    const school = result.colegio.toString();
    const level = result.nivel.toString();
    const price = result.resultado;
    const pass = result.aprobado ? "Sí" : "No";
    if (passed) {
      return [level, name, surname, school, price, pass];
    } else {
      return [level, name, surname, school, price];
    }
  };
  let headers = ["Participante", "Nivel", "Colegio", "Premio"];

  let downloadHeaders = ["Nivel", "Nombre", "Apellido", "Colegio", "Premio"];

  if (passed) {
    headers = headers.concat(["Aprobado"]);
    downloadHeaders = downloadHeaders.concat(["Aprobado"]);
  }
  //FILTERING
  const [resultFilter, updateFilter, filtered_results, options] =
    useFilter(filterableResults);

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <SelectResultCategory
          category="Participante"
          value={resultFilter.participante}
          setValue={(option?: Participant) =>
            updateFilter({ participante: option })
          }
          options={options.participante}
          input
        />
        <SelectResultCategory
          category="Colegio"
          value={resultFilter.colegio}
          setValue={(option?: School) => updateFilter({ colegio: option })}
          options={options.colegio}
          input
        />
        <SelectResultCategory
          category="Nivel"
          value={resultFilter.nivel}
          setValue={(option?: number) => updateFilter({ nivel: option })}
          options={options.nivel}
          clear
        />
        <SelectResultCategory
          category="Premio"
          value={resultFilter.resultado}
          setValue={(option?: string) => updateFilter({ resultado: option })}
          options={options.resultado}
          clear
        />
        {passed ? (
          <SelectResultCategory
            category="Aprobado"
            value={resultFilter.aprobado}
            setValue={(option?: boolean) => updateFilter({ aprobado: option })}
            options={options.aprobado}
            clear
          />
        ) : null}
      </form>
      {filtered_results.length > 0 ? (
        <Table
          values={filtered_results as ProvincialResult[]}
          allValues={filterableResults}
          headers={headers}
          Card={passed ? NationalResultCard : ProvincialResultCard}
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
      <p className={styles.disclaimer}>
        Si hay algún error en el nombre/apellido de algún participante, o algún
        error en el nombre de algún colegio, por favor mandar un mail a:{" "}
        <a href="mailto:omasanisidro.devs@gmail.com">
          omasanisidro.devs@gmail.com
        </a>
      </p>
    </div>
  );
};

export default ProvincialResultTable;
