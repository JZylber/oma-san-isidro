"use client";

import { INSTANCIA } from "@prisma/client";
import { trpc } from "../../../utils/trpc";
import DashboardResultsTable from "../../../components/Dashboard/Results/table";

const DashboardResultsPage = () => {
  const results = trpc.dashboard.getResults.useQuery({
    año: 2024,
    instancia: "REGIONAL" as INSTANCIA,
    competencia: "ÑANDÚ",
  });
  const numberOfProblems = 3;
  if (results.isLoading) {
    return <span>Cargando...</span>;
  } else if (results.isError) {
    return <span>{results.error.data?.httpStatus}</span>;
  } else if (results.isSuccess)
    return (
      <DashboardResultsTable
        results={results.data}
        numberOfProblems={numberOfProblems}
      />
    );
};

export default DashboardResultsPage;
