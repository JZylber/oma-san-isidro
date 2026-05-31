import { unstable_cache } from "next/cache";
import DashboardResults from "../../../components/Dashboard/Results/table";
import { getAllTests } from "../../../server/app-router-db-calls";

const isDev = process.env.NODE_ENV === "development";

const fetchTests = async () => {
  const availableTests = await getAllTests();
  return availableTests;
};

const tests = isDev
  ? fetchTests
  : unstable_cache(fetchTests, ["results"], { tags: ["results"] });

const DashboardResultsPage = async () => {
  const availableTests = await tests();
  return <DashboardResults tests={availableTests} />;
};

export default DashboardResultsPage;
