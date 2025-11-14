"use client";

import Logo from "@/components/shared/Logo";
import ModeToggle from "@/components/shared/ModeToggle";
import UserBox from "@/components/shared/UserBox";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";

function UserNavbar() {
  const [unreadCount] = useState(3);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 shadow-sm">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <Logo url="/user-dashboard" />
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/user-dashboard/notifications"
            className="hidden lg:block"
          >
            <Button
              variant="ghost"
              size="icon"
              className="relative size-10 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              <Bell className="size-5" />
              {unreadCount > 0 && (
                <span className="absolute top-2 right-2 size-2.5 rounded-full bg-red-500 border-2 border-white dark:border-neutral-900"></span>
              )}
            </Button>
          </Link>

          <ModeToggle />

          <UserBox profile_url="/user-dashboard" />
        </div>
      </div>
    </header>
  );
}

export default UserNavbar;
