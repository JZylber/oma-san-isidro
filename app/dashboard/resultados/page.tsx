"use client";

import { INSTANCIA } from "@prisma/client";
import { trpc } from "../../../utils/trpc";
import DashboardResultsTable from "../../../components/Dashboard/Results/table";

export interface Testdata {
  id: number;
  numberOfProblems: number;
}

const DashboardResultsPage = () => {
  const results = trpc.dashboard.getResults.useQuery({
    año: 2024,
    instancia: "REGIONAL" as INSTANCIA,
    competencia: "ÑANDÚ",
  });
  const testData = { id: 22, numberOfProblems: 3 } as Testdata;
  if (results.isLoading) {
    return <span>Cargando...</span>;
  } else if (results.isError) {
    return <span>{results.error.data?.httpStatus}</span>;
  } else if (results.isSuccess)
    return <DashboardResultsTable results={results.data} testData={testData} />;
};

export default DashboardResultsPage;
