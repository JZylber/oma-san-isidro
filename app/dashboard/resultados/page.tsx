"use client";

import { INSTANCIA } from "@prisma/client";
import { trpc } from "../../../utils/trpc";
import DashboardResultsTable from "../../../components/Dashboard/Results/table";
import Loader from "../../../components/Loader/Loader";

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
  return (
    <div className="min-h-full flex flex-col">
      {results.isLoading && (
        <div className="grow flex items-center justify-center">
          <Loader />
        </div>
      )}
      {results.isError && (
        <div className="grow flex items-center justify-center">
          <span>{results.error.data?.httpStatus}</span>
        </div>
      )}
      {results.isSuccess && (
        <DashboardResultsTable results={results.data} testData={testData} />
      )}
    </div>
  );
};
export default DashboardResultsPage;
