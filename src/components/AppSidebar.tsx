
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { ChevronDown, ChevronRight, Home, FileText, AlertTriangle, BarChart3, Trash2, Mail, List } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export function AppSidebar() {
  const [expandedGroups, setExpandedGroups] = useState({
    activities: true,
    sinistres: true,
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
    <Sidebar className="w-64 bg-white border-r">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center gap-2 p-2 text-blue-900 font-semibold">
            <button onClick={() => toggleGroup('activities')} className="flex items-center gap-2">
              {expandedGroups.activities ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              <Home className="h-4 w-4" />
              Activités
            </button>
          </SidebarGroupLabel>
          {expandedGroups.activities && (
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link to="/" className="flex items-center gap-2 p-2 hover:bg-blue-50">
                      <FileText className="h-4 w-4" />
                      Ma Corbeille
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          )}
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center gap-2 p-2 text-blue-900 font-semibold">
            <button onClick={() => toggleGroup('sinistres')} className="flex items-center gap-2">
              {expandedGroups.sinistres ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              <AlertTriangle className="h-4 w-4" />
              Sinistres
            </button>
          </SidebarGroupLabel>
          {expandedGroups.sinistres && (
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link to="/sinistres" className="flex items-center gap-2 p-2 hover:bg-blue-50">
                      <List className="h-4 w-4" />
                      Mes Sinistres
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link to="/sinistre/declaration" className="flex items-center gap-2 p-2 hover:bg-blue-50">
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
