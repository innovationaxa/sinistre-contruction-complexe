
import { ActivitiesTable } from "@/components/ActivitiesTable";
import { Header } from "@/components/Header";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col w-full bg-gray-50">
      <Header />
      <div className="flex-1 flex flex-col">
        <div className="flex items-center gap-4 px-6 py-3 bg-white border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Ma Corbeille - Activités de déclaration</h2>
        </div>
        <main className="flex-1 p-6">
          <ActivitiesTable />
        </main>
      </div>
    </div>
  );
};

export default Index;
