import { useContext } from "react";
import { TestContext } from "contexts/TestContext";

const useTestData = () => {
  return useContext(TestContext);
};

export default useTestData;
