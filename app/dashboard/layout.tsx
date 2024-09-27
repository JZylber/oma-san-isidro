import DashboardNavBar from "../../components/Dashboard/NavBar/NavBar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex h-screen">
      <DashboardNavBar />
      <article className="grow">{children}</article>
    </main>
  );
};
export default DashboardLayout;
