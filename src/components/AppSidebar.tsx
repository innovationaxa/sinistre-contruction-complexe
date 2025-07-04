
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
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => toggleGroup('activities')}>
                  {expandedGroups.activities ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  Activités
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => toggleGroup('sinistres')}>
                  {expandedGroups.sinistres ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  Sinistres
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
