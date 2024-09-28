"use client";

import { INSTANCIA } from "@prisma/client";
import { trpc } from "../../../utils/trpc";

const DashboardResultsPage = () => {
  const results = trpc.dashboard.getResults.useQuery({
    año: 2024,
    instancia: "REGIONAL" as INSTANCIA,
    competencia: "OMA",
  });
  if (results.isLoading) {
    return <span>Cargando...</span>;
  } else if (results.isError) {
    return <span>{results.error.data?.httpStatus}</span>;
  } else if (results.isSuccess)
    return <div>{results.data.ctx.user.userName}</div>;
};
export default DashboardResultsPage;
