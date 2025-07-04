
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
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
    <Sidebar className="w-64 bg-slate-700 text-white">
      <SidebarContent>
        <div className="p-4">
          <div className="bg-green-600 text-white px-3 py-2 rounded text-sm font-medium">
            Actions
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  onClick={() => toggleGroup('activities')}
                  className="text-blue-300 hover:text-white hover:bg-slate-600"
                >
                  {expandedGroups.activities ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  Ma Corbeille (429)
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              {expandedGroups.activities && (
                <div className="ml-6 space-y-1">
                  <SidebarMenuItem>
                    <SidebarMenuButton className="text-sm text-gray-300 hover:text-white hover:bg-slate-600">
                      • Activités de gestion (428)
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton className="text-sm text-gray-300 hover:text-white hover:bg-slate-600">
                      • Activités de déclaration...
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton className="text-sm text-gray-300 hover:text-white hover:bg-slate-600">
                      • Activités sur sinistre arr...
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton className="text-sm text-gray-300 hover:text-white hover:bg-slate-600">
                      • Activités AXAPAC (0)
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton className="text-sm text-gray-300 hover:text-white hover:bg-slate-600">
                      • Activités sans référence...
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </div>
              )}

              <SidebarMenuItem>
                <SidebarMenuButton 
                  onClick={() => toggleGroup('sinistres')}
                  className="text-gray-300 hover:text-white hover:bg-slate-600"
                >
                  {expandedGroups.sinistres ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  Mes Sinistres (21)
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton className="text-gray-300 hover:text-white hover:bg-slate-600">
                  Mes Stats
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton 
                  onClick={() => toggleGroup('corbeilles')}
                  className="text-gray-300 hover:text-white hover:bg-slate-600"
                >
                  {expandedGroups.corbeilles ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  Corbeilles (360)
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton className="text-gray-300 hover:text-white hover:bg-slate-600">
                  Courriers
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
