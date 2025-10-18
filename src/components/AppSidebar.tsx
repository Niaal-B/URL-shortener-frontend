import { Building2, Users, Upload, Link as LinkIcon } from "lucide-react";
import { NavLink } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

const navigationItems = [
  { 
    title: "My Organizations", 
    url: "/", 
    icon: Building2,
    description: "Organizations you manage"
  },
  { 
    title: "Member Organizations", 
    url: "/member-organizations", 
    icon: Users,
    description: "Organizations you're part of"
  },
  { 
    title: "Bulk Upload", 
    url: "/bulk-upload", 
    icon: Upload,
    description: "Upload multiple URLs",
    adminOnly: true
  },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  
  // TODO: Get user's admin status from auth context
  const isAdminInAnyOrg = true;

  const getNavClass = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" 
      : "hover:bg-sidebar-accent/50 text-sidebar-foreground";

  return (
    <Sidebar className={collapsed ? "w-16" : "w-64"} collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/20">
            <LinkIcon className="h-5 w-5 text-primary-foreground" />
          </div>
          {!collapsed && (
            <div>
              <h2 className="font-bold text-lg text-sidebar-foreground">ShortURL</h2>
              <p className="text-xs text-sidebar-foreground/70">Link Management</p>
            </div>
          )}
        </div>
        <SidebarTrigger className="ml-auto" />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/70">
            {!collapsed && "Navigation"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => {
                // Hide bulk upload if user is not admin in any org
                if (item.adminOnly && !isAdminInAnyOrg) return null;

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink to={item.url} end className={getNavClass}>
                        <item.icon className="h-5 w-5" />
                        {!collapsed && <span>{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
