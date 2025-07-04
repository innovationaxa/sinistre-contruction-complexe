
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

export function Header() {
  return (
    <header className="bg-white border-b-2 border-blue-600 px-6 py-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-blue-700 text-white rounded flex items-center justify-center text-xl font-bold shadow-sm">
            AXA
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Solaris</h1>
            <span className="text-sm text-gray-700 bg-blue-100 px-2 py-1 rounded border text-blue-800 font-medium">Construction</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="border-2 border-blue-600 text-blue-800 hover:bg-blue-50 font-semibold">
            <Upload className="w-4 h-4 mr-2" />
            Importer/Exporter
          </Button>
        </div>
      </div>
    </header>
  );
}
