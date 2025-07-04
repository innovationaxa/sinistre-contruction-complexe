
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";

export function AppSidebar() {
  const [expandedGroups, setExpandedGroups] = useState({
    activities: true,
    sinistres: false,
    stats: false,
    corbeilles: false,
    courriers: false
  });

  const toggleGroup = (groupKey: keyof typeof expandedGroups) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupKey]: !prev[groupKey]
    }));
  };

  return (
    <Sidebar className="w-64 bg-white border-r border-gray-200">
      <SidebarContent className="p-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              <SidebarMenuItem>
                <SidebarMenuButton 
                  onClick={() => toggleGroup('activities')}
                  className="w-full flex items-center justify-between p-2 text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  <span className="font-medium">Activités</span>
                  {expandedGroups.activities ? 
                    <ChevronDown className="w-4 h-4" /> : 
                    <ChevronRight className="w-4 h-4" />
                  }
                </SidebarMenuButton>
                {expandedGroups.activities && (
                  <div className="ml-4 mt-2 space-y-1">
                    <div className="p-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md cursor-pointer">
                      Déclarations
                    </div>
                    <div className="p-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md cursor-pointer">
                      Expertises
                    </div>
                  </div>
                )}
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton 
                  onClick={() => toggleGroup('sinistres')}
                  className="w-full flex items-center justify-between p-2 text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  <span className="font-medium">Sinistres</span>
                  {expandedGroups.sinistres ? 
                    <ChevronDown className="w-4 h-4" /> : 
                    <ChevronRight className="w-4 h-4" />
                  }
                </SidebarMenuButton>
                {expandedGroups.sinistres && (
                  <div className="ml-4 mt-2 space-y-1">
                    <div className="p-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md cursor-pointer">
                      En cours
                    </div>
                    <div className="p-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md cursor-pointer">
                      Clôturés
                    </div>
                  </div>
                )}
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton 
                  onClick={() => toggleGroup('stats')}
                  className="w-full flex items-center justify-between p-2 text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  <span className="font-medium">Statistiques</span>
                  {expandedGroups.stats ? 
                    <ChevronDown className="w-4 h-4" /> : 
                    <ChevronRight className="w-4 h-4" />
                  }
                </SidebarMenuButton>
                {expandedGroups.stats && (
                  <div className="ml-4 mt-2 space-y-1">
                    <div className="p-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md cursor-pointer">
                      Tableaux de bord
                    </div>
                    <div className="p-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md cursor-pointer">
                      Rapports
                    </div>
                  </div>
                )}
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton 
                  onClick={() => toggleGroup('corbeilles')}
                  className="w-full flex items-center justify-between p-2 text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  <span className="font-medium">Corbeilles</span>
                  {expandedGroups.corbeilles ? 
                    <ChevronDown className="w-4 h-4" /> : 
                    <ChevronRight className="w-4 h-4" />
                  }
                </SidebarMenuButton>
                {expandedGroups.corbeilles && (
                  <div className="ml-4 mt-2 space-y-1">
                    <div className="p-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md cursor-pointer">
                      Ma corbeille
                    </div>
                    <div className="p-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md cursor-pointer">
                      Partagées
                    </div>
                  </div>
                )}
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton 
                  onClick={() => toggleGroup('courriers')}
                  className="w-full flex items-center justify-between p-2 text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  <span className="font-medium">Courriers</span>
                  {expandedGroups.courriers ? 
                    <ChevronDown className="w-4 h-4" /> : 
                    <ChevronRight className="w-4 h-4" />
                  }
                </SidebarMenuButton>
                {expandedGroups.courriers && (
                  <div className="ml-4 mt-2 space-y-1">
                    <div className="p-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md cursor-pointer">
                      Entrants
                    </div>
                    <div className="p-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md cursor-pointer">
                      Sortants
                    </div>
                  </div>
                )}
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
