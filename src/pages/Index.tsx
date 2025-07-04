
import { ActivitiesTable } from "@/components/ActivitiesTable";
import { TabsManager } from "@/components/TabsManager";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col w-full bg-gray-50">
      <TabsManager />
      <main className="flex-1 p-6">
        <ActivitiesTable />
      </main>
    </div>
  );
};

export default Index;
