
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { ActivitiesTable } from "@/components/ActivitiesTable";
import { Header } from "@/components/Header";
import { SidebarTrigger } from "@/components/ui/sidebar";

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col w-full bg-gray-50">
        <Header />
        <div className="flex flex-1">
          <AppSidebar />
          <div className="flex-1 flex flex-col">
            <div className="flex items-center gap-4 px-6 py-3 bg-white border-b border-gray-200">
              <SidebarTrigger className="border-2 border-blue-600 hover:bg-blue-50 text-blue-700" />
              <h2 className="text-lg font-semibold text-gray-900">Ma Corbeille - Activités de déclaration</h2>
            </div>
            <main className="flex-1 p-6">
              <ActivitiesTable />
            </main>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
