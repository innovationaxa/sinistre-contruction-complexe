
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Upload, Download } from "lucide-react";

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 text-white rounded flex items-center justify-center text-sm font-bold">
              S
            </div>
            <h1 className="text-xl font-semibold text-gray-800">Solaris</h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Upload className="w-4 h-4 mr-2" />
            Importer/Exporter
          </Button>
        </div>
      </div>
    </header>
  );
}
