import DashboardResults from "../../../components/Dashboard/Results/table";
import { TestInfo } from "../../../components/ResultsPage/resultsTypes";
import { getAllTests } from "../../../server/app-router-db-calls";

const reducer = (state: Partial<TestInfo>, action: Partial<TestInfo>) => {
  return { ...state, ...action };
};

const competencia = "ÑANDÚ";

const DashboardResultsPage = async () => {
  const availableTests = await getAllTests("ÑANDÚ");
  return <DashboardResults tests={availableTests} competencia={competencia} />;
};

export default DashboardResultsPage;
