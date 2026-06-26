"use client";

import Loader from "components/Loader/Loader";
import { trpc } from "utils/trpc";

const TestEditPage = () => {
  const tests = trpc.dashboard.getTests.useQuery();
  if (tests.isLoading || tests.isRefetching) return <Loader />;
  console.log(tests.data);
  return (
    <div>
      <h1>Pruebas</h1>
    </div>
  );
};

export default TestEditPage;
