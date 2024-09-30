import DashboardResults from "../../../components/Dashboard/Results/table";
import { getAllTests } from "../../../server/app-router-db-calls";

const DashboardResultsPage = async () => {
  const availableTests = await getAllTests();
  return <DashboardResults tests={availableTests} />;
};

export default DashboardResultsPage;
