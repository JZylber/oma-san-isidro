import { useState } from "react";
import { Testdata } from "../../../app/dashboard/resultados/page";
import { EditableResult } from "../../../server/routers/dashboard";
import ModalLoader from "../../Popups/ModalLoader/ModalLoader";
import DashboardResultsTableRow from "./row";

const DashboardResultsTable = ({
  results,
  testData,
}: {
  results: EditableResult[];
  testData: Testdata;
}) => {
  const [loading, setLoading] = useState(true);
  return (
    <div className="border border-black rounded-xl overflow-hidden w-full">
      <table className="w-full border-collapse">
        <thead className="bg-primary-light-blue border-b border-black">
          <tr className="font-unbounded text-2xl">
            <th className="p-2">Nivel</th>
            <th className="p-2">Apellido</th>
            <th className="p-2">Nombre</th>
            <th className="p-2">DNI</th>
            <th className="p-2">Colegio</th>
            {testData.numberOfProblems > 0 ? (
              <>
                {Array.from({ length: testData.numberOfProblems }).map(
                  (_, i) => (
                    <th key={i}>P{i + 1}</th>
                  )
                )}
                <th className="p-2">Total</th>
                <th className="p-2">Aprobado</th>
              </>
            ) : (
              <th className="p-2">Resultado</th>
            )}
            <th></th>
          </tr>
        </thead>
        <tbody className="font-montserrat text-xl divide-y">
          {results.map((result) => (
            <DashboardResultsTableRow
              result={result}
              testData={testData}
              isUpdating={(updating) => {
                setLoading(updating);
              }}
            />
          ))}
        </tbody>
      </table>
      <ModalLoader isOpen={loading} />
    </div>
  );
};

export default DashboardResultsTable;
