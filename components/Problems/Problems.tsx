"use client";
import { trpc } from "../../utils/trpc";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ResultsPage/ErrorMessage";
import ProblemsTable from "./ProblemsTable";
import { ProblemRow } from "./problemsTypes";

const typeClasses = "max-tablet:block max-tablet:font-unbounded max-tablet:font-normal max-tablet:text-[2.1rem] max-tablet:mt-[1.6rem] tablet:hidden";
const titleClasses = "font-unbounded font-semibold max-tablet:text-[3.6rem] max-tablet:mt-[calc(4*100vmin/50)] max-tablet:mb-[calc(2.5*100vmin/50)] tablet:text-[4.8rem] tablet:leading-[2.5]";

const Problems = ({ competition }: { competition: "OMA" | "ÑANDÚ" }) => {
  const problems = trpc.problems.getProblems.useQuery({ competencia: competition });

  const content = () => {
    if (problems.isLoading) {
      return <Loader />;
    }
    if (problems.isError) {
      return <ErrorMessage status={problems.error.data?.httpStatus} />;
    }
    const rows: ProblemRow[] = (problems.data ?? [])
      .slice()
      .sort(
        (a, b) =>
          b.Prueba.fecha.getTime() - a.Prueba.fecha.getTime() || a.nivel - b.nivel
      )
      .map((problem) => ({
        instancia: problem.Prueba.instancia,
        año: problem.Prueba.competencia.ano,
        nivel: problem.nivel,
        link: problem.link,
      }));
    return <ProblemsTable rows={rows} />;
  };

  return (
    <>
      <div className={typeClasses}>{competition === "OMA" ? "Oma" : "Ñandú"}</div>
      <h1 className={titleClasses}>Problemas</h1>
      {content()}
    </>
  );
};

export default Problems;
