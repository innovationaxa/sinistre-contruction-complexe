
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

export function Header() {
  return (
    <header className="bg-white border-b border-gray-300 px-4 lg:px-6 py-3 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 text-white rounded flex items-center justify-center text-lg font-bold shadow-sm">
              S
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Solaris</h1>
            <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Construction
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <SidebarTrigger className="border border-gray-400 hover:bg-gray-50 text-gray-700 font-medium lg:hidden" />
          <Button variant="outline" size="sm" className="border border-gray-400 text-gray-800 hover:bg-gray-50 font-semibold text-sm">
            <Upload className="w-4 h-4 mr-2" />
            Importer/Exporter
          </Button>
        </div>
      </div>
    </header>
  );
}
