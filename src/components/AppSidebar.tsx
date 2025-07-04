
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { ChevronDown, ChevronRight, FileText, AlertTriangle } from "lucide-react";
import { useState } from "react";

export function AppSidebar() {
  const [expandedGroups, setExpandedGroups] = useState({
    activities: true,
    sinistres: false,
  });

  const toggleGroup = (groupKey: keyof typeof expandedGroups) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupKey]: !prev[groupKey]
    }));
  };

  return (
    <Sidebar className="border-r border-gray-200 bg-white">
      <SidebarContent className="p-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => toggleGroup('activities')}
                  className="flex items-center justify-between w-full p-3 text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5" />
                    <span className="font-medium">Activités</span>
                  </div>
                  {expandedGroups.activities ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </SidebarMenuButton>
                {expandedGroups.activities && (
                  <div className="ml-8 mt-2 space-y-1">
                    <div className="text-sm text-gray-600 p-2 hover:bg-gray-50 rounded cursor-pointer">
                      Déclarations en cours
                    </div>
                    <div className="text-sm text-gray-600 p-2 hover:bg-gray-50 rounded cursor-pointer">
                      Activités terminées
                    </div>
                  </div>
                )}
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => toggleGroup('sinistres')}
                  className="flex items-center justify-between w-full p-3 text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="w-5 h-5" />
                    <span className="font-medium">Sinistres</span>
                  </div>
                  {expandedGroups.sinistres ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </SidebarMenuButton>
                {expandedGroups.sinistres && (
                  <div className="ml-8 mt-2 space-y-1">
                    <div className="text-sm text-gray-600 p-2 hover:bg-gray-50 rounded cursor-pointer">
                      Nouveaux sinistres
                    </div>
                    <div className="text-sm text-gray-600 p-2 hover:bg-gray-50 rounded cursor-pointer">
                      En cours de traitement
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
