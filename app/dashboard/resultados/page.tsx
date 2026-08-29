import { unstable_cache } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import DashboardResults from "../../../components/Dashboard/Results/table";
import { getAllTests } from "../../../server/app-router-db-calls";
import { verifyAuthTokens } from "../../../utils/verifyAuth";

const isDev = process.env.NODE_ENV === "development";

const fetchTests = async () => {
  const availableTests = await getAllTests();
  return availableTests;
};

const tests = isDev
  ? fetchTests
  : unstable_cache(fetchTests, ["results"], { tags: ["results"] });

// Esta es la única página del dashboard que es server component y consulta la
// base: el resto son wrappers de componentes cliente que pasan por trpc, donde
// protectedProcedure valida la sesión por su cuenta. Acá el único control era
// middleware.ts, y saltear el middleware es una familia de CVEs que en Next ya
// se repitió (CVE-2025-29927 la última vez). Chequear la sesión también desde
// la página deja de depender de una sola capa.
//
// Va fuera de unstable_cache a propósito: lo cacheado son las pruebas, que son
// iguales para todos, y meter la verificación adentro guardaría el resultado de
// la primera sesión que entre.
const requireSession = async () => {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;
  if (!refreshToken) {
    redirect("/login");
  }
  const accessToken = cookieStore.get("accessToken")?.value;
  const { authorized } = await verifyAuthTokens(accessToken, refreshToken);
  if (!authorized) {
    redirect("/login");
  }
};

const DashboardResultsPage = async () => {
  await requireSession();
  const availableTests = await tests();
  return <DashboardResults tests={availableTests} />;
};

export default DashboardResultsPage;
