
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";

export function AppSidebar() {
  const [expandedGroups, setExpandedGroups] = useState({
    activities: true,
    sinistres: false,
    stats: false,
    corbeilles: false,
    courriers: false,
  });

  const toggleGroup = (groupKey: keyof typeof expandedGroups) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupKey]: !prev[groupKey]
    }));
  };

  return (
    <Sidebar className="w-64 bg-slate-800 text-white border-r-2 border-gray-400">
      <SidebarContent>
        <div className="p-4">
          <div className="bg-green-700 text-white px-4 py-3 rounded text-sm font-semibold border border-green-600">
            Actions
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  onClick={() => toggleGroup('activities')}
                  className="text-blue-200 hover:text-white hover:bg-slate-700 font-medium border-l-4 border-blue-400"
                >
                  {expandedGroups.activities ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  Ma Corbeille (3)
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              {expandedGroups.activities && (
                <div className="ml-6 space-y-1">
                  <SidebarMenuItem>
                    <SidebarMenuButton className="text-sm text-white bg-blue-700 hover:bg-blue-600 font-semibold border-l-2 border-blue-300">
                      • Activités de déclaration (3)
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton className="text-sm text-gray-300 hover:text-white hover:bg-slate-700">
                      • Activités de gestion (0)
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton className="text-sm text-gray-300 hover:text-white hover:bg-slate-700">
                      • Activités d'expertise (0)
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton className="text-sm text-gray-300 hover:text-white hover:bg-slate-700">  
                      • Activités de suivi (0)
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </div>
              )}

              <SidebarMenuItem>
                <SidebarMenuButton 
                  onClick={() => toggleGroup('sinistres')}
                  className="text-gray-300 hover:text-white hover:bg-slate-700 font-medium"
                >
                  {expandedGroups.sinistres ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  Mes Sinistres Construction (8)
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton className="text-gray-300 hover:text-white hover:bg-slate-700 font-medium">
                  Mes Stats
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton 
                  onClick={() => toggleGroup('corbeilles')}
                  className="text-gray-300 hover:text-white hover:bg-slate-700 font-medium"
                >
                  {expandedGroups.corbeilles ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  Corbeilles Construction (15)
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton className="text-gray-300 hover:text-white hover:bg-slate-700 font-medium">
                  Dossiers Construction
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
