
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { ActivitiesTable } from "@/components/ActivitiesTable";
import { Header } from "@/components/Header";

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 p-6">
            <ActivitiesTable />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
