import DashboardNavBar from "../../components/Dashboard/NavBar/NavBar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex h-screen">
      <DashboardNavBar />
      <article className="grow h-full max-h-screen overflow-y-scroll overflow-x-hidden p-4">
        {children}
      </article>
    </main>
  );
};
export default DashboardLayout;
