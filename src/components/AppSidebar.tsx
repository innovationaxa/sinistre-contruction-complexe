
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { ChevronDown, ChevronRight, Home, FileText, AlertTriangle, BarChart3, Trash2, Mail } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

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
    <Sidebar className="w-64 border-r bg-white">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-sm font-medium text-gray-500 uppercase tracking-wide">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/" className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-md">
                    <Home className="h-4 w-4" />
                    Tableau de bord
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel 
            className="flex items-center justify-between cursor-pointer hover:bg-gray-50 px-2 py-1 rounded"
            onClick={() => toggleGroup('activities')}
          >
            <span className="text-sm font-medium text-gray-700">Activités</span>
            {expandedGroups.activities ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </SidebarGroupLabel>
          {expandedGroups.activities && (
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link to="/" className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-md ml-4">
                      <FileText className="h-4 w-4" />
                      Déclarations
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          )}
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel 
            className="flex items-center justify-between cursor-pointer hover:bg-gray-50 px-2 py-1 rounded"
            onClick={() => toggleGroup('sinistres')}
          >
            <span className="text-sm font-medium text-gray-700">Sinistres</span>
            {expandedGroups.sinistres ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </SidebarGroupLabel>
          {expandedGroups.sinistres && (
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link to="/sinistre/declaration" className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-md ml-4">
                      <FileText className="h-4 w-4" />
                      Nouvelle déclaration
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          )}
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
