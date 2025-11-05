"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { adminLinks, instructorNavLinks, profileNavLinks } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface AppSidebarProps {
  role: "admin" | "teacher" | "user";
}

function AppSidebar({ role }: AppSidebarProps) {
  const pathname = usePathname();

  const links =
    role === "admin"
      ? adminLinks
      : role === "teacher"
      ? instructorNavLinks
      : profileNavLinks;

  return (
    <Sidebar variant="floating" collapsible="icon">
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Sahifalar</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {links.map((link) => (
                <SidebarMenuItem key={link.route}>
                  <SidebarMenuButton asChild isActive={pathname === link.route}>
                    <Link href={link.route}>
                      <link.icon />
                      <span>{link.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

export default AppSidebar;
