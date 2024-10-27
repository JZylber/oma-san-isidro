import { unstable_cache } from "next/cache";
import DashboardResults from "../../../components/Dashboard/Results/table";
import { getAllTests } from "../../../server/app-router-db-calls";

const tests = unstable_cache(
  async () => {
    const availableTests = await getAllTests();
    return availableTests;
  },
  ["results"],
  { tags: ["results"] }
);

const DashboardResultsPage = async () => {
  const availableTests = await tests();
  return <DashboardResults tests={availableTests} />;
};

export default DashboardResultsPage;
