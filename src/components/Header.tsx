
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, Settings, User, Bell } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const currentTab = location.pathname === "/" ? "corbeille" : 
                    location.pathname === "/sinistres" ? "sinistres" : "corbeille";

  const handleTabChange = (value: string) => {
    if (value === "corbeille") {
      navigate("/");
    } else if (value === "sinistres") {
      navigate("/sinistres");
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-3 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img src="/lovable-uploads/9c71f56e-0ea5-431e-8c6d-5a5827250ae4.png" alt="AXA" className="h-8 w-auto" />
          <div className="h-6 w-px bg-gray-300"></div>
          <div>
            <h1 className="text-xl font-semibold text-blue-900">Solaris</h1>
            <span className="text-xs text-gray-600">Construction</span>
          </div>
        </div>
        
        <div className="flex items-center">
          <Tabs value={currentTab} onValueChange={handleTabChange} className="mr-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="corbeille">Corbeille</TabsTrigger>
              <TabsTrigger value="sinistres">Sinistres</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
            <Bell className="w-4 h-4" />
            <span className="ml-1 text-xs bg-blue-600 text-white px-1.5 py-0.5 rounded-full">0</span>
          </Button>
          
          <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
