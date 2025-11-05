"use client";

import Logo from "@/components/shared/Logo";
import ModeToggle from "@/components/shared/ModeToggle";
import UserBox from "@/components/shared/UserBox";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SidebarTrigger } from "@/components/ui/sidebar";

function AppNavbar() {
  return (
    <header className="w-full h-20 bg-sidebar border-b px-4 mt-2 rounded-lg border sticky top-2 z-50">
      <div className="flex items-center justify-between h-full">
        <Logo url="/admin-dashboard" />

        <div className="flex items-center lg:gap-x-2 gap-x-1">
          <Tooltip>
            <TooltipTrigger asChild className="cursor-pointer">
              <SidebarTrigger />
            </TooltipTrigger>
            <TooltipContent className="dark:text-white">
              <p>Sidebar</p>
            </TooltipContent>
          </Tooltip>
          <ModeToggle />

          <UserBox />
        </div>
      </div>
    </header>
  );
}

export default AppNavbar;
