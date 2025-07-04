
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

export function Header() {
  return (
    <header className="bg-white border-b-2 border-gray-400 px-6 py-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="border-2 border-gray-400 hover:bg-gray-100" />
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-700 text-white rounded flex items-center justify-center text-lg font-bold shadow-sm">
              S
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Solaris</h1>
            <span className="text-sm text-gray-700 bg-gray-100 px-2 py-1 rounded border">Construction</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="border-2 border-gray-400 text-gray-800 hover:bg-gray-100 font-medium">
            <Upload className="w-4 h-4 mr-2" />
            Importer/Exporter
          </Button>
        </div>
      </div>
    </header>
  );
}
