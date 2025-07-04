
import { Button } from "@/components/ui/button";
import { Upload, Settings, User, Bell } from "lucide-react";

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-3 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img 
            src="/lovable-uploads/9c71f56e-0ea5-431e-8c6d-5a5827250ae4.png" 
            alt="AXA" 
            className="h-8 w-auto"
          />
          <div className="h-6 w-px bg-gray-300"></div>
          <div>
            <h1 className="text-xl font-semibold text-blue-900">Solaris</h1>
            <span className="text-xs text-gray-600">Construction</span>
          </div>
        </div>
        
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Bureau</a>
          <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Sinistre</a>
          <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Recherche Activités</a>
          <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Recherche Sinistres</a>
          <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Recherche Contacts</a>
          <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Pilotage Équipe</a>
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
            <Bell className="w-4 h-4" />
            <span className="ml-1 text-xs bg-blue-600 text-white px-1.5 py-0.5 rounded-full">0</span>
          </Button>
          <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
            <Upload className="w-4 h-4 mr-1" />
            <span className="hidden sm:inline text-sm">Importer/Exporter</span>
          </Button>
          <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
            <Settings className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
            <User className="w-4 h-4" />
            <span className="hidden sm:inline text-sm ml-1">Accéder</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
