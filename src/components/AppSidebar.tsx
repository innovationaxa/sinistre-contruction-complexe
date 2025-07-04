
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
    <Sidebar className="border-r border-gray-200 bg-white">
      <SidebarContent className="p-0">
        <div className="p-4 border-b border-gray-200">
          <div className="bg-green-600 text-white px-3 py-2 rounded text-sm font-medium text-center">
            Actions
          </div>
        </div>

        <SidebarGroup className="p-2">
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              <SidebarMenuItem>
                <SidebarMenuButton 
                  onClick={() => toggleGroup('activities')}
                  className="w-full justify-start text-left px-3 py-2 text-sm font-medium text-blue-700 bg-blue-50 border-l-4 border-blue-500 hover:bg-blue-100"
                >
                  <div className="flex items-center gap-2 w-full">
                    {expandedGroups.activities ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    <span>Ma Corbeille (3)</span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              {expandedGroups.activities && (
                <div className="ml-4 space-y-1 border-l border-gray-200 pl-4">
                  <SidebarMenuItem>
                    <SidebarMenuButton className="w-full justify-start text-left px-3 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded">
                      • Activités de déclaration (3)
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton className="w-full justify-start text-left px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded">
                      • Activités de gestion (0)
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton className="w-full justify-start text-left px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded">
                      • Activités d'expertise (0)
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton className="w-full justify-start text-left px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded">  
                      • Activités de suivi (0)
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </div>
              )}

              <SidebarMenuItem>
                <SidebarMenuButton 
                  onClick={() => toggleGroup('sinistres')}
                  className="w-full justify-start text-left px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded"
                >
                  <div className="flex items-center gap-2 w-full">
                    {expandedGroups.sinistres ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    <span>Mes Sinistres Construction (8)</span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton className="w-full justify-start text-left px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded">
                  Mes Stats
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton 
                  onClick={() => toggleGroup('corbeilles')}
                  className="w-full justify-start text-left px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded"
                >
                  <div className="flex items-center gap-2 w-full">
                    {expandedGroups.corbeilles ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    <span>Corbeilles Construction (15)</span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton className="w-full justify-start text-left px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded">
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
