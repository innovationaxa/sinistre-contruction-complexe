
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { ActivitiesTable } from "@/components/ActivitiesTable";
import { Header } from "@/components/Header";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col w-full bg-gray-50">
      <Header />
      <SidebarProvider>
        <div className="flex flex-1">
          <AppSidebar />
          <main className="flex-1 p-4 lg:p-6">
            <ActivitiesTable />
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Index;
