
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Settings, X, Plus } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

interface Tab {
  id: string;
  title: string;
  path: string;
  isActive: boolean;
}

export function TabsManager() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [tabs, setTabs] = useState<Tab[]>([
    {
      id: "home",
      title: "Ma Corbeille - Activités de déclaration",
      path: "/",
      isActive: location.pathname === "/"
    }
  ]);

  const addTab = (title: string, path: string) => {
    const newTab: Tab = {
      id: Date.now().toString(),
      title,
      path,
      isActive: true
    };
    
    setTabs(prevTabs => [
      ...prevTabs.map(tab => ({ ...tab, isActive: false })),
      newTab
    ]);
    navigate(path);
  };

  const switchTab = (tabId: string) => {
    const tab = tabs.find(t => t.id === tabId);
    if (tab) {
      setTabs(prevTabs => 
        prevTabs.map(t => ({ ...t, isActive: t.id === tabId }))
      );
      navigate(tab.path);
    }
  };

  const closeTab = (tabId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const tabToClose = tabs.find(t => t.id === tabId);
    const remainingTabs = tabs.filter(t => t.id !== tabId);
    
    if (remainingTabs.length === 0) {
      // Si c'est le dernier onglet, on revient à l'accueil
      setTabs([{
        id: "home",
        title: "Ma Corbeille - Activités de déclaration",
        path: "/",
        isActive: true
      }]);
      navigate("/");
    } else {
      setTabs(remainingTabs.map((tab, index) => ({
        ...tab,
        isActive: tabToClose?.isActive ? index === 0 : tab.isActive
      })));
      
      if (tabToClose?.isActive && remainingTabs.length > 0) {
        navigate(remainingTabs[0].path);
      }
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center gap-4">
          <img 
            src="/lovable-uploads/9c71f56e-0ea5-431e-8c6d-5a5827250ae4.png" 
            alt="AXA" 
            className="h-6 w-auto"
          />
          <div className="h-4 w-px bg-gray-300"></div>
          <span className="text-sm font-medium text-blue-900">Solaris</span>
        </div>
        
        <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
          <Settings className="w-4 h-4" />
        </Button>
      </div>
      
      <div className="flex items-center bg-gray-50 border-t border-gray-200">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`
              flex items-center gap-2 px-4 py-2 border-r border-gray-200 cursor-pointer
              min-w-0 max-w-xs group hover:bg-gray-100
              ${tab.isActive ? 'bg-white border-t-2 border-t-blue-500' : 'bg-gray-50'}
            `}
            onClick={() => switchTab(tab.id)}
          >
            <span className="text-sm truncate flex-1">
              {tab.title}
            </span>
            {tabs.length > 1 && (
              <Button
                variant="ghost"
                size="sm"
                className="w-4 h-4 p-0 opacity-0 group-hover:opacity-100 hover:bg-gray-200"
                onClick={(e) => closeTab(tab.id, e)}
              >
                <X className="w-3 h-3" />
              </Button>
            )}
          </div>
        ))}
        <Button
          variant="ghost"
          size="sm"
          className="px-2 py-2 text-gray-600 hover:text-gray-900"
          onClick={() => addTab("Nouveau", "/")}
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>
    </header>
  );
}
