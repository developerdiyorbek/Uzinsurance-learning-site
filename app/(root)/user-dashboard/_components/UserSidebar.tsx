"use client";

import { Menu, X, ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { profileNavLinks } from "@/constants";

function UserSidebar() {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMobileOpen) {
        setIsMobileOpen(false);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isMobileOpen]);

  const isActive = (route: string) => {
    if (route === "/user-dashboard") {
      return pathname === route;
    }
    return pathname?.startsWith(route);
  };

  return (
    <>
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-20 right-4 z-50 p-2.5 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-lg cursor-pointer"
        aria-label="Toggle menu"
      >
        {isMobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
      </button>

      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/40 z-40 cursor-pointer"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <aside
        className={cn(
          "fixed left-0 top-16 w-72 bg-white dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800 h-[calc(100vh-4rem)] transition-transform duration-300 z-40",
          "lg:translate-x-0",
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex flex-col h-full overflow-y-auto p-3">
          <nav className="space-y-1">
            {profileNavLinks.map((link) => {
              const active = isActive(link.route);
              return (
                <Link
                  key={link.route}
                  href={link.route}
                  onClick={() => setIsMobileOpen(false)}
                  className={cn(
                    "relative flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group",
                    "hover:translate-x-1",
                    active
                      ? "bg-gradient-to-r from-primary/10 to-primary/5 text-primary border-l-4 border-primary shadow-sm"
                      : "text-neutral-600 dark:text-white hover:bg-neutral-50 dark:hover:bg-neutral-800/50 hover:text-neutral-900 dark:hover:text-white"
                  )}
                >
                  {active && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-r-full"></div>
                  )}

                  <div
                    className={cn(
                      "flex items-center justify-center size-9 rounded-lg transition-all duration-200",
                      active
                        ? "bg-primary/15 text-primary"
                        : "bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-white group-hover:bg-primary/10 group-hover:text-primary"
                    )}
                  >
                    <link.icon className="size-4.5" />
                  </div>

                  <span
                    className={cn(
                      "font-medium text-sm flex-1",
                      active ? "text-primary" : ""
                    )}
                  >
                    {link.label}
                  </span>

                  {active && <ChevronRight className="size-4 text-primary" />}
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
}

export default UserSidebar;
